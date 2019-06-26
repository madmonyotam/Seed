var actions = require('./actions.js');
var path = require('path');
var MongoConstruct = require('../../mongo/mongo.js'); 
var modules = require('../../modules'); 
var FilesHelper = modules.Helpers.FilesHelper;
const isEmpty = require('lodash').isEmpty;


module.exports = {
    
    SetMongoClient(client, done){
    // MongoClient = client;
      this.mongoInstance = client.instance;
      this.settingsDb = client.db;
      this.connection = client.connection;
      if (done) done();
    },

    SetPath(configPath, done){
      this.path = configPath;
      if (done) done(this.path);
    },

    SetServerFile(configName, done){
      var pathForConfig = path.resolve(process.rootFolder, `server/config/serverConfig.json`);

      delete require.cache[pathForConfig]

      var required = require(pathForConfig); 
      var replace = {
        ...required,
        "projects": { 
          ...required.projects, 
          "default": configName 
        }
      }

      FilesHelper.mergeFile(pathForConfig, replace, done)
    },
    
    activate( app, configPath, mongoParams ){

        this.SetPath(configPath);

        app.post('/saveFile', (req, res) => {
          actions.saveFile(req, res, this.path);
        });
          
        app.post('/saveSettings', (req, res) => {
          actions.save(req, res, this.path);
        });
        
        app.post('/loadFile', (req, res) => {
          actions.loadFile(req, res, this.path);
        });
        
        app.post('/loadSettings', (req, res) => { 
          let path = req.body.path || this.path;
          if(!req.body.path) path = this.path;
          actions.load(res, path, this);
        });

        app.post('/loadServerConfig', (req, res) => {
          var pathForConfig = path.resolve(process.rootFolder, `server/config/serverConfig.json`);

          delete require.cache[pathForConfig];

          var required = require(pathForConfig); 

          if (required && !isEmpty(required) ){

            res.status(200).send({ 
              success: true, 
              data: required,
              msg: 'Server Config Loaded',
              successPath: this.path
            })
          } else res.status(400).send({ success: false, data: null })
        });

        app.post('/selectServerConfig', (req, res) => {

          if (!isEmpty(req.body) ) {

            if (req.body.configName) { 
              this.SetServerFile(req.body.configName, (o)=>{ 
                if (req.body.configPath) {
                  this.SetPath(req.body.configPath, (configPath) => {
                    if (configPath === this.path) {
                        res.status(200).send({ 
                          success: true, 
                          successPath: this.path,
                          data: o,
                          msg: 'Server Config Changed'
                        })
                    } else res.status(400).send({ success: false, data: o })
                  })
                }
              })
            }            
          }  
        });

        app.post('/mongo.save.settings.collection', (req, res) => {
          let collectionClient;

          const error = (errorStack) => {
            res.status(400).send({ success: false, msg: errorStack.msg || errorStack.MongoError || errorStack })
          }
          const success = (mdb, data) => {
            res.status(200).send({ 
              success: true, 
              data: data,
              msg: req.body.collectionName + ' - saved successfully to MongoDB'
            })
          }

          if (req.body && req.body.dbName && req.body.item && req.body.collectionName) { 
            
            const overwrite = () => {
              collectionClient.findOneAndReplace(
                  { '_id': req.body.item['_id'] },
                  req.body.item,
                  { upsert: true, returnNewDocument: true },
                  (err, rep) => { 
                    let doc = undefined;
                    if (rep && rep.value) {
                      doc = rep.value;
                      success(rep, doc)
                    } else if (err) {
                      console.error('err : ', err);
                      error(err)
                    }
                  }
              )
            }

            const afterConnection = () => {

              collectionClient = this.settingsDb.collection(req.body.collectionName);

              collectionClient.findOne( { '_id': req.body.item['_id'] }, {})
                              .then( foundDoc => {
                                if (!foundDoc) { // empty collection
                                  console.log('> empty collection ', req.body.collectionName);
                                  collectionClient.insertOne( req.body.item, (err, response) => {
                                    if (err) {
                                      console.error('err : ', err);
                                      error(err)
                                    } else success(response)
                                  }) 
                                } else { // duplicated collection
                                  console.log('> Overwriting '+req.body.collectionName);
                                  overwrite()
                                }
                              }); 

            } 
            if (!this.mongoInstance) {
              return error({ msg: 'Login or reload app' })
            }
            this.mongoInstance.automateConnection(this.connection)
                .then( (client) => {
                  if (client && client.isConnected) afterConnection()
                  else if (client) this.SetMongoClient(client, afterConnection)
                })
                .catch((connectionErr)=>{
                  console.debug('Mongo Connection Error :: ', connectionErr);
                })

          } else conError({ msg: 'Missing Mongo Params (dbName, collectionName, item)'  })
        });


        

        app.post('/load.defaults', (req, res) => {

          const conSuccess = (data) => { 
              res.status(200).send({ 
                data: data, 
                success: true, 
                msg: `received default settings from mongo/${req.body.dbName}` 
              })
          }

          const conError = (errorStack) => {
            res.status(400).send({ success: false, msg: errorStack.msg || errorStack.MongoError || errorStack })
          }

          const sortCollections = async (cursor, colName) => {
            let collection = {};
            await cursor.forEach( (item) => {
              collection[colName] = item;
              delete collection[colName]['_id'];
              delete collection[colName]['key'];
            });
            return collection;
          }

          const mappingCollections = async (settingsDB, collections) => {
            let colCursor, promises = [], collection;

            collections.map((col, i)=>{
              collection = settingsDB.collection(col.name);
              colCursor = collection.find(); 
              promises.push( 
                sortCollections(colCursor, col.name)
              ) 
            });
            
            await Promise
                      .all(promises)
                      .then(conSuccess)
                      .catch((err) => { console.error('promise error : ', err); })
          }

          

          if (!req.body.dbName) conError({ msg: 'Missing dbName Param'  })
          else {
            
            var MongoHandler = new MongoConstruct({
              ip: mongoParams.ip,
              port: mongoParams.port,
              dbName: req.body.dbName
            });

            MongoHandler.connect()
                        .then( MongoClient => {
                          this.SetMongoClient(MongoClient)
                          let settingsDB = MongoClient.db;
                          settingsDB.listCollections().toArray( (err, collections) => {
                            if (err) conError(err) 
                            else if (!collections || !collections.length) {
                              res.status(200).send({ 
                                success: true, 
                                data: [], 
                                msg: 'no collections found on - db/'+req.body.dbName 
                              });
                            }
                            else mappingCollections(settingsDB, collections)
                          });

                        })
                        .catch( err => { 
                          console.error('err : ', err);
                          conError({ msg : 'MongoConnection Error '  }) 
                        });

          }
      }); 

    }
} 