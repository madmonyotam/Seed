'use strict';
var express = require('express');
var path = require('path');
var klaw = require('klaw');
var fs = require('fs');
var winston = require('winston');

var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


const logger = winston.createLogger({
  transports: [
    // new winston.transports.Console(),
    new winston.transports.File({ filename: 'simple_switch_combined.log' })
  ]
});

/** winston logger usage:
// logger.log({
//   level: 'info',
//   Name: req.body.fileName,
//   Body: req.body.text,
//   Directory: req.body.dir
// });

**/

var encoding = "utf8";
var walker, walkerOptions;

module.exports = {
  save: (req, res, configPath) => {

    let jsonFile = `${configPath}/${req.body.dir}/modified.json`;

    fs.writeFile(jsonFile, req.body.fileData, encoding, (err) => {
        if (err) {
          res.status(400).send(err)
          throw err;
          return;
        }
        res.status(201).send({ success: true, msg: 'The file was succesfully saved!', data: req.body.fileData })
    });
  },

  saveFile: (req, res, configPath) => {

    let jsonFile = '';

    function writeFirst(callback){
      jsonFile = `${configPath}/${req.body.dir}/modified.json`;

      fs.writeFile(jsonFile, req.body.fileData, encoding, (err) => {
          if (err) {
            res.status(400).send(err)
            throw err;
            return;
          }
          if (callback) callback();
      });
    };

    function writeFile(){
      jsonFile = `${configPath}/${req.body.dir}/${req.body.fileName}.json`;

      fs.writeFile(jsonFile, req.body.fileData, encoding, (err) => {
        if (err) {
          res.status(400).send(err)
          throw err;
          return;
        }
        res.status(201).send({ success: true, msg: `The file ${req.body.fileName}  was succesfully saved!` })
      });
    };

    writeFirst(writeFile)

  },

  load: (res, configPath) => {
    var config = {};
    if (!configPath || typeof configPath == 'undefined' ) {
      res.status(500).send({ success: false, msg: 'missing config path!' })
      return;
    }
    function start(_path, callback){
      var directories = [], newfiles = [], filePath, dirs;
      walker = klaw(_path);

      walker.on('data', item => {
        if (item.stats.isDirectory()) {
          directories.push( path.basename(item.path) )
        }
      })
      .on('error', (err, item) => {
        res.status(400).send({ success: false, msg: err.message });
      })
      .on('end', () => {
        dirs = createDir(directories);
        if (callback) callback(dirs);
      })
    };

    function createDir(directories){
      directories = directories.filter( dir => { return dir !== 'config' });
      directories.map( dir => {
        config = Object.assign(config, { [dir]: {} })
      });
      return config;
    };

    function getFile(key, _path, resolve) {
      var files = [], extracted, fileName, promises = [];
      walker = klaw(_path);
      walker.on('data', item => {
        if (item.stats.isFile()) {
          fileName = path.basename(item.path);
          files.push(item.path)
        }
      })
      .on('end', () => {
        resolve({ key, files });
      })
    };

    function readFile(key, filePath, resolve){
      var files = [], extracted, modified = false, fileName = path.basename(filePath);
      walker = klaw(filePath);
      walker.on('data', item => {
        if (item.stats.isFile()) {
          fs.readFile(item.path, (err, data)=>{

            extracted = JSON.parse(data.toString());
            modified = fileName.indexOf('modified') > -1;

            return resolve({ key, modified: modified, data: extracted, fileName: fileName });
          });
        }
      });
    };

    start(configPath, (dirs)=>{
      var filePath, promises = [], filePromises = [];
      for (var idx in dirs) {
          filePath = configPath+idx;
          promises.push(
            new Promise ( (resolve, reject) => {
              getFile(idx, filePath, resolve);
            })
          )
      }

      Promise.all(promises).then( results => {
        var filePath, idx;
        for (let i = 0; i < results.length; i++) {
          for (let x = 0; x < results[i].files.length; x++) {
            filePath = results[i].files[x];
            idx = results[i].key;
            filePromises.push(
              new Promise ( (resolve, reject) => {
                readFile(idx, filePath, resolve);
              })
            )
          }
        }
        Promise.all(filePromises).then( _fileResults => {
          res.status(200).send({ success: true, msg: 'loaded succesfully !', data: _fileResults })
        });
      })
    });
  },

  loadFile: (req, res, configPath)=>{
    let { filename, dir } = req.body;
    var fullFilePath = `${ configPath }${ dir }/${ filename }`;

    getTheFile(fullFilePath);

    function getTheFile(_path, resolve){
      let newitem, extracted, modified;
      var promise = new Promise ( (resolve, reject) => {
        klaw(_path)
          .on('data', item => {
              if (item.stats.isFile()) {
                fs.readFile(item.path, (err, data)=>{
                  extracted = JSON.parse(data.toString());
                  modified = filename.indexOf('modified') > -1;
                  newitem =  { modified: modified, data: extracted };
                  return resolve(newitem)
                });
              }
          })
          .on('error', (err, item) => {
            res.status(400).send({ success: false, msg: err.message });
          });
      });
      promise.then((data)=>{
        res.status(200).send({ success: true, msg: 'loaded succesfully !', data: data })
      });
    };
  }
}
