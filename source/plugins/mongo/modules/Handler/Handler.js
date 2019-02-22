// import { pull, map } from 'lodash';

module.exports = {
    name: "Handler",
    dependencies: ['CTI.Mixin'],

    get(Mixin) {
        return {
          mixins: [ Mixin ],
          
          error(err){
            //console.error('MongoError -> ', err.data ? err.data.msg : err.msg);

          },

          setCache({ key, data, code }){
            let fileData;
            if (code) {
              try {
                fileData = JSON.parse(data);
              } catch (err) {
                console.error(err);
                fileData = undefined;
              }
            } else fileData = data;

            if (fileData) core.plugins.Mongo.set(['cache', key ], fileData)            
          },

          getTree(key){
            if (key) return core.plugins.Mongo.get(['cache', key]);
            else return core.plugins.Mongo.get('cache');
          },
          
          handle(isConnected, user){
            if (!isConnected) {
              this.connect()
                  .then((success)=>{ 
                    if (success) {
                      this.getCollections(user.tenantId)
                          
                          .then( res => { 
                            console.debug('res => ', res);
                          })
                          // .catch(err => {
                          //   console.debug('err => ', err);
                          //   if (err) {
                          //     this.add([{test: 'a', b:'test'}])
                          //     // this.createCollection(user.tenantId);
                          //   }
                          // })
                    }  
                  }).catch(this.error)

            } else { 
              this.getCollections()
                  .then( res => { 
                    console.debug('res => ', res);
                    if (!res) {
                      let defaultsettings = this.getTree();
                      let defaultData = [];
                      for (var key in defaultsettings) {
                        defaultData.push({
                          "_uid": key,
                          [key] : {
                            'default' : defaultsettings[key]
                          }
                        })
                      }
                      this.add(defaultData)
                    }
                  })
                  .catch(this.error)
            }
           
          } ,

          isConnected() { 
            let promise = new Promise ((resolve, reject) => {
              core.plugins.Mongo.run('Mongodb.is.connected')
                  .then( res => {
                    resolve(true)
                  })
                  .catch( err => {
                    // this.error(err)
                    reject(err.data)
                  })
            })
            return promise 
          },

          connect( ){
            let promise = new Promise ((resolve, reject) => {

              core.plugins.Mongo.run('Mongodb.connect')
                  .then(( { connected, msg } )=>{
                    resolve(connected);
                  })
                  .catch( err => { 
                    this.error(err);
                    //reject(false)
                  });
            });
            return promise;
          },

          disconnect( ){
            let promise = new Promise ((resolve, reject) => {

              core.plugins.Mongo.run('Mongodb.disconnect')
                  .then(( { connected, msg } )=>{
                    resolve(connected);
                  })
                  .catch( err => { 
                    this.error(err);
                    //reject(false)
                  });
            });
            return promise;
          },

          findInCollection(collectionName, item) {
             let promise = new Promise( (resolve, reject) => {
              
              core.plugins.Mongo.run('Mongodb.find.in.collection', { collectionName,  item })
                  .then(( res )=>{
                    if (!res.success || !res.data) resolve(null)
                    else resolve(res.data)
                  })
                  .catch( err =>{
                     this.error(err)
                     reject(err)
                  });
            });
            return promise;
          },

          getCollections(collectionName, dataKey){
            
            const setCollections = (data) => {
              let collections = data.map( coll => {
                if (coll.type && coll.type === 'collection') {
                  return {
                    name: coll.name,
                    type: coll.type,
                    info: coll.info
                  }
                }
              });
              return collections;
            };

            const drawSettings = (data) => {
              let res;
              for (let key in data) {
                // if (data[x]) 
                if (key === dataKey) {
                  res = data[key];
                  break;
                }
              }
              return res;
            }

            let promise = new Promise( (resolve, reject) => {
              
              core.plugins.Mongo.run('Mongodb.get.collections', { name: collectionName })
                  .then(( res )=>{
                    if (!res.success || !res.data) resolve(null)
                    else {
                      let response;
                      if (!collectionName) {
                        response = setCollections(res.data);
                      } else {
                        response = drawSettings(res.data[0])
                      }

                      resolve(response)

                    }  
                  })
                  .catch( err =>{
                     this.error(err)
                     reject(err)
                  });
            });
            return promise;
          }, 

          createCollection(collectionName, response){
            // console.log('[createCollection] collectionName -> ',collectionName);
            core.plugins.Mongo.run('Mongodb.create.collection', { name: collectionName })
                .then(( res )=>{
                  // response(res)
                  console.debug('[res] ', res)
                })
                .catch((error)=>{
                  this.error(error)
                  // response(error)
                });
          },
          
          add(data) {
            let promise = new Promise( (resolve, reject) => {
              core.plugins.Mongo.run('Mongodb.add.to.collection', data)
                  .then(( res )=>{
                        // response(res)
                        console.debug('[res] ', res);
                        resolve(res)
                      })
                      .catch(( error ) => {
                        this.error(error)
                        // response(error)
                        reject(error)
                      });
            });
            return promise;
          }

        };
    }
}
