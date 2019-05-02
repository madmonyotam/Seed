const MongoConstruct = require('./constructor.js');
const { isEmpty } = require('lodash'); 

this.MongoHandler = {};

module.exports={


    exportMongoInstance(){
      return this.MongoHandler;
    },

    activate( app, MongoParams , logger){
      let MongoHandler = new MongoConstruct(MongoParams);
      this.MongoHandler = MongoHandler;

      app.post('/connect', (req, res, next) => {
          const success = (o) => {
            res.status(200).send({ success: true, data: o, msg: 'connected to mongo' });
          }
          const error = (errorStack) => {
            res.status(400).send({ success: false, msg: errorStack.msg || errorStack.MongoError })
          }

          if (!req.body.dbName) error({ msg: 'Missing dbName Param'  })
          else this.MongoHandler.connect(req.body.dbName, success, error)
      });

      app.post('/disconnect', (req, res, next) => {
          const success = (o) => {
            res.status(200).send({ success: true, data: o, msg: 'disconnected from mongo' })
          }
          const error = (errorStack) => {
            res.status(400).send({ success: false, msg: errorStack.msg || errorStack.MongoError })
          }

          this.MongoHandler.disconnect(success, error)
      });

      app.post('/is.connected', (req, res, next) => {
          const success = (o) => {
            res.status(200).send({ success: o, msg: `mongo is ${ o ? 'connected' : 'disconnected' } ` , data: o })
          }
          const error = (errorStack) => {
            // logger.log('error', errorStack)
            res.status(400).send({ success: false, msg: errorStack.msg || errorStack.MongoError })
          }

          this.MongoHandler.isConnected(success, error)
      });

      app.post('/create.collection', (req, res, next) => {

          const success = (o) => {
            res.status(200).send({ success: true, data: o })
          }
          const error = (errorStack) => {
            res.status(400).send({ success: false,  msg: errorStack.msg || errorStack.MongoError })
          }

          this.MongoHandler.createCollection(req.body.collectionName, success, error)
      });

      app.post('/get.collections', (req, res, next) => {

          const success = (o) => {
            let ResData = (!o || isEmpty(o)) ? false : o;
            res.status(200).send({ success: (o && !isEmpty(o)) , data: ResData, msg:'' })
          }

          const successRead = (o) => {
            let collctions={};
            o.forEach((collction) => {
              let name = collction.collection.s.name;
              collctions[name] = collction.docs[0];
              delete collctions[name]._id;
            });

            res.status(200).send({ success: true , data: collctions, msg:'' })
          }

          const error = (errorStack) => {
            logger.log('error', errorStack.msg)
            res.status(400).send({ success: false,  msg: errorStack.msg || errorStack.MongoError })
          }

          if (req.body && req.body.collectionName) {
            this.MongoHandler.selectCollection(req.body.collectionName, null, success, error)
          } else {
            this.MongoHandler.readCollections(successRead , error)
          }
      });

      app.post('/add.to.collection', (req, res, next) => {
        const success = (o) => {
          res.status(200).send({ success: true, data: o, msg: 'items added successfully' })
        }

        const error = (errorStack) => {
          if (errorStack && errorStack.code === 11000) { // MongoError - duplicate _index_id
            res.status(409).send({ success: false, duplicated: true,  msg:  'duplicate key error' })
          } else {
            res.status(400).send({ success: false,  msg: errorStack.msg || errorStack.MongoError, data: errorStack.data })
          }
        }

        if (req.body && req.body.data) {
          this.MongoHandler.create(req.body.collectionName, req.body.data, success, error)
        } else error({ msg: 'Missing Data', data: req.body })
      })

      app.post('/find.in.collection', (req, res) => {
        const success = (o) => {
          res.status(200).send({ success: true, data: o, msg: 'items found' })
        }

        const error = (errorStack) => {
          res.status(400).send({ success: false,  msg: errorStack.msg || errorStack.MongoError })
        } 

        if (req.body && req.body.collectionName && req.body.item) {
          
          this.MongoHandler.read(req.body.collectionName, req.body.item, success, error)

        } else error({ msg: 'Missing Collection Name || Item Params' })
      })


      app.post('/update.document', (req, res) => {
        const success = (o) => {
          res.status(200).send({ success: true, data: o, msg: 'items updated' })
        }

        const error = (errorStack) => {
          res.status(400).send({ success: false,  msg: errorStack.msg || errorStack.MongoError })
        } 

        if (req.body && req.body.collectionName && req.body.item && req.body.newItem) {
          
          this.MongoHandler.update(req.body.collectionName, req.body.item, req.body.newItem, success, error)

        } else error({ msg: 'Missing Collection Name || Item Params || New Item' })
      })


      app.post('/replace.document', (req, res) => {
        const success = (o) => {
          res.status(200).send({ success: true, data: o, msg: 'items replaced' })
        }

        const error = (errorStack) => {
          res.status(400).send({ success: false,  msg: errorStack.msg || errorStack.MongoError })
        } 

        if (req.body && req.body.collectionName && req.body.item && req.body.newItem) {
          
          this.MongoHandler.replace(req.body.collectionName, req.body.item, req.body.newItem, success, error)

        } else error({ msg: 'Missing Collection Name || Item Params || New Item' })
      })
    }
}

/*


const testItems = [
  {
    "_id":1,
    "firstName":"d1ebugger",
    "lastName": "m1ode"
  },
  {
    "_id":2,
    "firstName":"d1e",
    "lastName": "b11ugger"
  },
  {
    "_id":3,
    "firstName":"f1irst",
    "lastName": "l1ast"
  },
];

const updateItem = {
  "firstName":"6666",
  "lastName": "bbb"
};

const FindParams = {
  firstName: 'first'
}

const MongoParams = {
  ip: '127.0.0.1', //
  port: '27017',
  dbName: 'cti',
  dbCollection: 'users',
  auth: {
    username: '',
    password: ''
  }
}

// var MongoHandler = new MongoConstruct(MongoParams);

// MongoHandler.connect((db)=>{
// //   // // MongoHandler.create(collectionName, testItems, callback) -- Insert items / docs to collection. if collectionName does not exists, create and insert.
// //   // // MongoHandler.readCollection(collectionName, callback[docs]) -- Read/Get all docs from collection
// //   // // MongoHandler.read(collectionName, FindParams, callback[docs]) // Read/Get specific item[s] by item's key and value
// //   // // MongoHandler.update(collectionName, FindParams, updateItem, callback[doc])  // Update specific item
// //   // // MongoHandler.delete(collectionName, FindParams, callback[deletedDoc])  // Delete specific item
//   MongoHandler.create(testItems);
//   setTimeout(()=>{
//     MongoHandler.disconnect(process.exit)
//   }, 3000)
// });
// function connect(){
//   MongoHandler.connect((db)=>{
//     // MongoHandler.create(testItems, ()=>{
//       MongoHandler.disconnect()
//     // });
//   });
// }
//
// connect();

*/
