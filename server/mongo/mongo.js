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

function getAuthString(auth) {
  if (!auth || !auth.username || !auth.password || isEmpty(auth.password)) return '';
  else return `${auth.username}:${auth.password}@`;
};

var MongoClient = mongodb.MongoClient;

var MongoHandler = class MongoHandler {

    constructor(args = defaultSettings){
      this.logger = process.logger;
      this.ip = args.ip;
      this.port = args.port;
      this.dbName = args.dbName;
      this.auth = args.auth;
      this.authString = getAuthString(args.auth);
      this.url = `mongodb://${ this.authString }${ this.ip }:${ this.port }`;
      this.db = undefined;
      this.mongoConnection = undefined;
      this.client = undefined;
    }

    connect(){
      // console.log('-> connecting to', this.url);
      // this.logger.log('info', 'Connecting to MongoDB ');
      
      var promise = new Promise( (resolve, reject) => { 
        
        if(!this.url) {
          this.logger.log('error', 'MongoDB Connection Error - URL is missing');
          reject(undefined, 'missing url');
        } else {
          // console.log('this.url -> ',this.url);
          this.mongoConnection = new MongoClient(this.url, { 
            useNewUrlParser: true, 
            numberOfRetries : 5, 
          });
          this.mongoConnection.connect( (err, client) => { 
            if (!err) {
                if (client && !isEmpty(client)) {
                  // this.client = client;
                  // this.logger.log('success', 'MongoDB Connected to '+this.dbName);
                  console.log( 'success :: > connected to >', this.dbName );
                  var db = this.selectDB(client, this.dbName)

                  resolve({instance: this, db, connection: this.mongoConnection})

                } else reject('missing client')
            } else reject(err)
          })
        }
      })
      return promise;
    }

    selectDB(client, dbName){
      if (!dbName) return undefined;

      return client.db(dbName) ; 
    }

    automateConnection(connection,){

      let promise = new Promise((res, rej) => {
        if (connection.isConnected()) {
          res({ isConnected: true })
        } else {
          
          // console.log('connection -> ',connection);
          
          connection = new MongoClient(this.url, { 
            useNewUrlParser: true, 
            numberOfRetries : 5
          });

          connection.connect((err, client) => {
            if (err) {
              rej(err);
              process.exit(1);
            }
            else {
              var db = this.selectDB(client, this.dbName)
              res({ instance: this, db, connection })
            }
          })
        }
      })
      return promise; 
    }

 
    // handleResponse(errStack, fail, logType){

    //   if (errStack) {
    //     this.logger.log( logType || 'error', msg);
    //     if (fail) fail(err)
    //   }
    // }

}

module.exports = MongoHandler;
