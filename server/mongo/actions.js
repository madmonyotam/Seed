const express = require('express');
const path = require('path');
const log = require('node-pretty-log');

const MongoConstruct = require('./constructor.js');
const { isEmpty } = require('lodash');
module.exports={

    activate( app, MongoParams ){
      // log('info', MongoParams)
      let MongoHandler = new MongoConstruct(MongoParams);

      app.post('/connect', (req, res) => {
          const success = (o) => {
            res.status(200).send({ success: true, data: o, msg: 'connected to mongo' })
          }
          const error = (errorStack) => {
            res.status(400).send({ success: false, msg: errorStack.msg || errorStack.MongoError })
          }
          MongoHandler.connect(success, error)
      });

      app.post('/disconnect', (req, res) => {
          const success = (o) => {
            res.status(200).send({ success: true, data: o, msg: 'disconnected from mongo' })
          }
          const error = (errorStack) => {
            res.status(400).send({ success: false, msg: errorStack.msg || errorStack.MongoError })
          }

          MongoHandler.disconnect(success, error)
      });

      app.post('/is.connected', (req, res) => {
          const success = (o) => {
            res.status(200).send({ success: true, msg: `mongo is ${ o ? 'connected' : 'disconnected' } ` , data: o })
          }
          const error = (errorStack) => {
            log('error', errorStack)
            res.status(400).send({ success: false, msg: errorStack.msg || errorStack.MongoError })
          }

          MongoHandler.isConnected(success, error)
      });

      app.post('/create.collection', (req, res) => {

          const success = (o) => {
            res.status(200).send({ success: true, data: o })
          }
          const error = (errorStack) => {
            res.status(400).send({ success: false,  msg: errorStack.msg || errorStack.MongoError })
          }

          MongoHandler.createCollection(req.body.collectionName, success, error)
      });

      app.post('/get.collections', (req, res) => {

          const success = (o) => {
            let ResData = (!o || isEmpty(o)) ? false : o;
            // log('err', ResData)
            res.status(200).send({ success: (o && !isEmpty(o)) , data: ResData, msg:'' })
          }

          const error = (errorStack) => {
            log('err', errorStack.msg)
            res.status(400).send({ success: false,  msg: errorStack.msg || errorStack.MongoError })
          }

          if (req.body && req.body.collectionName) {
            // console.log('req.body.collectionName => ', req.body.collectionName)
            MongoHandler.selectCollection(req.body.collectionName, success, error)
          } else {
            MongoHandler.readCollections(success, error)
          }
      });

      app.post('/add.to.collection', (req, res) => {
        const success = (o) => {
          res.status(200).send({ success: true, data: o, msg: 'items added successfully' })
        }

        const error = (errorStack) => {
          res.status(400).send({ success: false,  msg: errorStack.msg || errorStack.MongoError })
        }

        if (req.body && req.body.data) {
          // MongoHandler.selectCollection(req.body.collectionName, success, error)
          MongoHandler.create(req.body.data, success, error)
        } else error({ msg: 'Missing Data' })
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
