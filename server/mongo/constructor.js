const assert = require('assert');
const mongodb = require('mongodb');
const isEmpty = require('lodash').isEmpty;

var defaultSettings = {
  ip: "localhost", //
  port: "27017",
  dbName: "Test",
  auth: {
    username: '',
    password: ''
  }
};

var MongoClient = mongodb.MongoClient;

var MongoHandler = class MongoHandler {

    constructor(args = defaultSettings){
      this.logger = process.logger;
      // let { auth } = args;
      this.ip = args.ip;
      this.port = args.port;
      this.dbName = args.dbName;

      this.auth = this.getAuthString(args.auth);
      this.url = `mongodb://${this.auth}${this.ip}:${this.port}`;
      
      this.db = null;
      this.mongoConnection = null;
      this.client = null;
    }

    getAuthString(auth){
      if (!auth || !auth.username || !auth.password || isEmpty(auth.password)) return '';
      else return `${auth.username}:${auth.password}@`;
    }

    connect(dbName, success, error){
      this.logger.log('info', 'Connecting to MongoDB');
      if(!this.url) {
        this.logger.log('error', 'MongoDB Connection Error - URL is missing');
        return error();
      } else {
        this.mongoConnection = new MongoClient(this.url, { useNewUrlParser: true, connectTimeoutMS: 5000 });
        this.mongoConnection.connect((err, client) => {
          if (err) {
            this.logger.log('error', 'MongoDB Connection Error', err.MongoNetworkError);
            if (error) error(err);
            // this.disconnect();
            this.mongoConnection.close();
          } else {
            if (client && !isEmpty(client)) {
              this.client = client;
              
              this.db = this.selectDB(dbName);
              this.logger.log('success', 'MongoDB Connected');
              
              if (success) success(true, { db: this.db, connection: this.mongoConnection })
            }
            else if (error) error(err)
          }
        });
      }
    }

    disconnect(success, fail) {
      if (this.mongoConnection) {
        this.mongoConnection.close();
        this.logger.log('info', 'MongoDB Disconnected');
        if (success) success(false)
      } else if (fail) {
        this.handleResponse({ success: false, msg: 'MongoDB is Disabled' }, null, success, fail);
      }
    }

    isConnected(success, fail) {
      if (this.mongoConnection) {
        let isConnected = this.mongoConnection.isConnected();
        if (success && isConnected) success(isConnected)
        else if (fail) this.handleResponse({ success: false, msg: 'MongoDB Disconnected' }, null, success, fail, 'warn')
        else return isConnected
      } else if (fail) this.handleResponse({ success: false, msg: 'MongoDB is Disabled - Connect to enable' }, null, success, fail, 'warn');

    }

    selectDB(dbName){
      if (!this.dbName && dbName) {
        this.dbName = dbName; 
      }
      return this.client.db(this.dbName) ; 
    }

    createCollection(collName, success, fail){
      if (!collName) {
        this.handleResponse({ success: false, msg: 'Missing Collection Name' }, null, success, fail)
      }
      else if (this.db) {
        this.db.createCollection( collName, null, (err, res) => {
          this.collectionName = collName;
          this.handleResponse(err, res, success, fail,  `Create Collection - ${ this.collectionName }`)
        })
      } 
      else this.handleResponse({ success: false, msg: 'Missing DB' }, null, success, fail, `Missing DB`)
    }

    selectCollection(collName, CollectionIndex, success, fail) {
      if (!collName) {
        this.handleResponse({ success: false, msg: 'Missing Collection Name' }, null, success, fail)
      }
      else if (this.db) {
        this.collectionName = collName;
        let collection = this.db.collection(collName);
        let Message = `Selected Collection - ${ this.collectionName }`;

        if (CollectionIndex && !isEmpty(CollectionIndex)) {
          collection.createIndex( CollectionIndex )
          Message = `Modified Indexes in ${ this.collectionName }`;
        }

        collection.find()
                  .toArray( (err, docs) => {
                    // this.logger.log('warning','DOCS', docs)
                    this.handleResponse(err, {docs, collection}, success, fail, Message)
                  });
      }
      else this.handleResponse({ success: false, msg: 'Missing DB' }, null, success, fail, `Missing DB`)
    }

    selectCollectionClient(collectionClient, CollectionIndex, success, fail) {
      if (!collectionClient) {
        this.handleResponse({ success: false, msg: 'Missing Collection Client' }, null, success, fail)
      }
      else { 
        let collection = collectionClient;
        let Message = null;
        // console.log('collectionClient -> ',collectionClient);
        // let Message = `Selected Collection - ${ this.collectionName }`;

        if (CollectionIndex && !isEmpty(CollectionIndex)) {
          collection.createIndex( CollectionIndex )
          // Message = `Modified Indexes in ${ this.collectionName }`;
        }

        collection.find()
                  .toArray( (err, docs) => {
                    // this.logger.log('warning','DOCS', docs)
                    this.handleResponse(err, {docs, collection}, success, fail, Message)
                  });
      }
      // else this.handleResponse({ success: false, msg: 'Missing DB' }, null, success, fail, `Missing DB`)
    }

    readCollections(success, fail){
      let context = this;

      if (this.db) {
        this.db.listCollections()
                .toArray( (err, collections) => {
                  let colPromiseArray = [];
 
                  collections.map((col)=>{

                    var p = new Promise(function(resolve, reject) {
                      context.selectCollection(col.name, null, resolve, reject)
                    })

                    colPromiseArray.push(p);
                  });
                  

                  Promise.all(colPromiseArray).then((sortedCollections)=> {
                    this.handleResponse(null, sortedCollections , success, fail, `Get Collections`)
                  }).catch((e)=>{
                    this.handleResponse({ success: false, msg: 'unable to get collections from mongo' }, null, success, fail, `get collctions failed`)
                  });

                });
      } else this.handleResponse({ success: false, msg: 'Missing DB' }, null, success, fail, `Missing DB`)
    }

    readCollectionsDbClient(dbClient, success, fail){
      let context = this;

      if (dbClient) {
        dbClient.listCollections()
                .toArray( (err, collections) => {
                  let colPromiseArray = [];
 
                  collections.map((col)=>{

                    var p = new Promise(function(resolve, reject) {
                      context.selectCollection(col.name, null, resolve, reject)
                    })

                    colPromiseArray.push(p);
                  });
                  

                  Promise.all(colPromiseArray).then((sortedCollections)=> {
                    this.handleResponse(null, sortedCollections , success, fail, `Get Collections`)
                  }).catch((e)=>{
                    this.handleResponse({ success: false, msg: 'unable to get collections from mongo' }, null, success, fail, `get collctions failed`)
                  });

                });
      } else this.handleResponse({ success: false, msg: 'Missing DB Client' }, null, success, fail, `Missing DB`)
    }

    create(collName, item, success, fail) {
      var isArray = Array.isArray(item);

      if (this.db) {
        if (isArray) {
          var items = item;
          this.db.collection(collName)
              .insertMany(items, (err, res) => {
                this.handleResponse(err, res, success, fail, `Inserted Documents To - ${ collName }`)
              })

        } else {
          this.db.collection(collName)
              .insertOne( item, (err, res) => {
                this.handleResponse(err, res, success, fail, `Inserted Single Document ${ item['_id'] } To - ${ collName }`)
              })
        }
      } else  this.handleResponse({ success: false, msg: 'Missing DB' }, null, success, fail, `Missing DB`)
      //this.logger.log('error', 'MongoDB Connection', 'Missing DB');

    }

    createDbClient(collectionClient, item, success, fail) {
      var isArray = Array.isArray(item);
      console.log('collectionClient -> ',collectionClient);

      if (collectionClient) {
        if (isArray) {
          var items = item;
          collectionClient
              .insertMany(items, (err, res) => {
                this.handleResponse(err, res, success, fail, `Inserted Documents To - ${ collName }`)
              })

        } else {
          collectionClient
              .insertOne( item, (err, res) => {
                this.handleResponse(err, res, success, fail, `Inserted Single Document ${ item['_id'] } To - ${ collName }`)
              })
        }
      } else  this.handleResponse({ success: false, msg: 'Missing DB' }, null, success, fail, `Missing DB`)
      //this.logger.log('error', 'MongoDB Connection', 'Missing DB');

    }

    read(collName, FindParams, FindOptions, success, fail){
      if (this.db) {
        this.collectionName = collName;
        let COUNT;
        let collection = this.db.collection(collName);
        
        // collection.createIndex( { 'alert.name': 'text' } )

        collection.countDocuments({}, (err, count) => { COUNT = count; });
        
        collection.find( FindParams, FindOptions )
                  .toArray( (err, docs) => {
                    this.handleResponse(err, { docs: docs, 'total-results': COUNT }, success, fail, `Read Collection - ${ this.collectionName }`)
                  });
      } else this.handleResponse({ success: false, msg: 'Missing DB' }, null, success, fail, `Missing DB`)
    } 

    paginate(collName, FindParams, FindOptions, success, fail){
      if (this.db) {
        this.collectionName = collName;
        let COUNT;
        let collection = this.db.collection(collName);

        collection.countDocuments({}, (err, count) => { COUNT = count; }); 
        // console.log('FindOptions -> ',FindOptions);
        // console.log('FindParams -> ',FindParams);
        collection.find( FindParams, FindOptions )
                  .toArray( (err, docs) => {
                    this.handleResponse(err, { docs: docs, 'total-results': COUNT }, success, fail, `Paginate Collection - ${ this.collectionName }`)
                  });
      } else this.handleResponse({ success: false, msg: 'Missing DB' }, null, success, fail, `Missing DB`)
    }

    update(collName, ItemID, NewFields, success, fail){

      if (this.db) {
        this.db.collection(collName)
            .findOneAndUpdate(

              { '_id': ItemID },

              { $set: NewFields },

              { returnNewDocument: true }, // update options

              (err, res) => { 
                let doc = undefined;
                if (res && res.value) doc = res.value;
                this.handleResponse(err, doc, success, fail, `Updated One Document - ${ ItemID }`)

              }
            )
      } else this.handleResponse({ success: false, msg: 'Missing DB' }, null, success, fail)
    }

    push(collName, FindItemObject, NewItem, success, fail){
      // console.log('NewItem -> ',NewItem);
      if (this.db) {
        this.db.collection(collName)
            .insertOne( NewItem, (err, res) => { this.handleResponse(err, res, success, fail, 'Pushed One Document')  } )
      } else this.handleResponse({ success: false, msg: 'Missing DB' }, null, success, fail)
    }

    replace(collName, FindItemObject, NewItem, success, fail){

      if (this.db) {
        this.db.collection(collName)
            .findOneAndReplace(

              FindItemObject,

              NewItem,

              { upsert: true, returnNewDocument: true }, // replace options

              (err, res) => { 
                
                let doc = undefined;
                if (res && res.value) doc = res.value;

                this.handleResponse(err, doc, success, fail, `Replaced One Document - ${ FindItemObject['_id'] }`)  
              }
            )
      } else this.handleResponse({ success: false, msg: 'Missing DB' }, null, success, fail)
    }

    delete(collName, FindItemObject, success, fail){
      if (this.db) {
        this.db.collection(collName)
            .findOneAndDelete(

              FindItemObject,

              { returnOriginal: true },

              (err, res) => { this.handleResponse(err, res.value, success, fail, `Deleted Document - ${ FindItemObject['_id'] }`) }
            )
      } else this.handleResponse({ success: false, msg: 'Missing DB' }, null, success, fail)
    }

    handleResponse(err, res, success, fail, info, logType){

      if (err) {
        var msg = err && (err.errmsg || err.msg || err );
        this.logger.log( logType || 'error', msg);
        if (fail) fail(err)
      }
      else if (success && res) {
        this.logger.log('success', info || undefined);
        success(res) 
      } else if (success) success()
    }

}

module.exports = MongoHandler;
