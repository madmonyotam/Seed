const assert = require('assert');
const mongodb = require('mongodb');
const log = require('node-pretty-log');
const isEmpty = require('lodash').isEmpty;


const defaultSettings = {
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

    constructor(args){
      if (!args) args = defaultSettings;
      let { auth } = args;
      this.ip = args.ip;
      this.port = args.port;
      this.dbName = args.dbName;

      this.auth = this.getAuthString(auth);
      this.url = `mongodb://${this.auth}${this.ip}:${this.port}`;
      // this.url = `mongodb://${this.auth}${this.ip}:${this.port}/${this.dbName}`;
      this.collectionName = args.dbCollection || '';
      this.db = null;
      this.mongoClient = null;
      this.client = null;
    }

    getAuthString(auth){
      if (!auth.username || !auth.password || isEmpty(auth.password)) return '';
      else return `${auth.username}:${auth.password}@`;
    }

    connect(success, error){
      log('info', 'Connecting to MongoDB');
      if(!this.url) {
        log('error', 'MongoDB Connect', 'Mongo url is missing.');
        return error();
      } else {
        this.mongoClient = new MongoClient(this.url);
        this.mongoClient.connect((err, client) => {
          if (err) {
            log('error', 'MongoDB Connection', err);
            if (error) error(err);
            this.disconnect();
          } else {
            log('success', 'MongoDB Connected');
            if (client && !isEmpty(client)) {
              this.client = client;
              this.selectDB(client);
              if (success) success(true)
            }
            else if (error) error(err)
          }
        });
      }
    }

    disconnect(success, fail) {
      if (this.mongoClient) {
        this.mongoClient.close();
        log('warn', 'MongoDB Disonnected');
        if (success) success(false)
      } else if (fail)  this.handleResponse({ success: false, msg: 'missing mongo client' }, null, success, fail);
    }

    isConnected(success, fail) {
      if (this.mongoClient) {
        let isConnected = this.mongoClient.isConnected();
        if (success) success(isConnected)
      } else if (fail) this.handleResponse({ success: false, msg: 'missing mongo client' }, null, success, fail);

    }

    selectDB(dbName){
      if (!this.dbName && dbName) this.dbName = dbName;
      // log('info', 'Select DB - ', this.dbName);
      this.db = this.client.db(this.dbName) ;
      // var adminDb = this.db.admin();

      // adminDb.listDatabases(function(err, dbs) {
         // assert.equal(null, err);
         // assert.ok(dbs.databases.length > 0);
         // db.close();
         // callback(null, dbs);
         // console.debug('[dbs.databases] ', dbs.databases)
     // });
    }

    createCollection(collName, success, fail){
      if (!collName) {
        this.handleResponse({ success: false, msg: 'missing collection name' }, null, success, fail)
      }
      else if (this.db) {
        this.db.createCollection( collName, null, (err, res) => {
          this.collectionName = collName;
          this.handleResponse(err, res, success, fail)
        })
      } else this.handleResponse({ success: false, msg: 'missing db' }, null, success, fail, `Missing DB`)
    }

    selectCollection(collName, success, fail) {
      if (!collName) {
        this.handleResponse({ success: false, msg: 'missing collection name' }, null, success, fail)
      }
      else if (this.db) {
        this.collectionName = collName;
        let collection = this.db.collection(collName);
        collection.find()
                  .toArray( (err, docs) => {
                    // log('warning','DOCS', docs)
                    this.handleResponse(err, docs, success, fail, `Read Collection - ${ this.collectionName }`)
                  });
      }
      else this.handleResponse({ success: false, msg: 'missing db' }, null, success, fail, `Missing DB`)
    }

    readCollections(success, fail){
      if (this.db) {
        this.db.listCollections()
                .toArray( (err, collections) => {
                  this.handleResponse(err, collections, success, fail, `Get Collections`)
                });
      } else this.handleResponse({ success: false, msg: 'missing db' }, null, success, fail, `Missing DB`)
    }


    create(items, success) {
      var isArray = Array.isArray(items);
      if (this.db) {
        if (isArray) {
          this.db.collection(this.collectionName)
              .insertMany(items, (err, res) => {
                this.handleResponse(err, res, success, 'Insert Many')
              })

        } else {
          this.db.collection(this.collectionName)
              .insertOne(items, (err, res) => {
                this.handleResponse(err, res, success, 'Insert One')
              })
        }
      } else log('error', 'MongoDB Connection', 'Missing DB');

    }

    read(FindParams, success){
      if (this.db) {
        let collection = this.db.collection(this.collectionName);
        collection.find( FindParams )
                  .toArray( (err, docs) => {
                    this.handleResponse(err, docs, success, 'Read error')
                  });
      }
    }

    update(FindItemObject, NewItem, success){

      if (this.db) {
        this.db.collection(this.collectionName)
            .findOneAndUpdate(

              FindItemObject,

              { $set: NewItem },

              { returnOriginal: false }, // update options

              (err, res) => { this.handleResponse(err,res, success, 'Find One And Update')  }
            )
      }
    }

    delete(FindItemObject, success){
      if (this.db) {
        this.db.collection(this.collectionName)
            .findOneAndDelete(

              FindItemObject,

              null,// delete options { returnOriginal: false },


              (err, res) => { this.handleResponse(err, res, success, 'Find One And Delete ') }
            )
      }
    }

    handleResponse(err, res, success, fail, info){
      if (info) log('info', '', info);
      if (err) {
        log('error', '',err);
        if (fail) fail(err)
      }
      else if (success){
        // log('success', '', res)
        // if (!res || !res.length || isEmpty(res) ) {
        //   // log('warn', 'Missing Response')
          success(res)
        // }
        // else{
        //   success(res)
        // }
      }
    }

}

module.exports = MongoHandler;
