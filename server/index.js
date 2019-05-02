var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var modules = require('./modules'); 

/* start socket io */
// var http = require('http');
// var server = http.Server(app);
// var socket = require('socket.io')(server);
// server.listen(8080);
/* end socket io */

var localRequests = require('./localRequests');
var Logger = require('./logger/constructor.js');
var Helper = modules.Helpers.Helper;
var FilesHelper = modules.Helpers.FilesHelper;

var args = Helper.getArgs();
var activateMongo = args['--mongo'] || args['-M'] || true
var rootFolder = path.resolve(__dirname, "../");

process.rootFolder = rootFolder;

var config = Helper.getServerConfig();
config.mongoActivate = Boolean(activateMongo);

var port = config.port;

var projects = config.projects;
var defaultProject = projects[ projects.default ];

var formattedPath = path.format({
  root: defaultProject.root
});

// var pathForConfig = path.resolve(rootFolder, `${configPath}/serverConfig/default.json`);

// FilesHelper.mergeFile(pathForConfig,config,(margeConfig)=>{
    // console.log(margeConfig);

    var logger = setLogger(config);
    logger.log('success','config has been save to system');
 
    app.use(bodyParser.json({limit: '500kb'})); // support json encoded bodies
    app.use(bodyParser.urlencoded({ extended: true }));
    
    localRequests.settings.activate(app, formattedPath, defaultProject.mongo);
    localRequests.access.activate(app);

    app.listen(port, ()=> {
        logger.log('info',`running on port ${ port }`);
        // logger.log('success',  `Mongo activated`);
      })
      .setTimeout(config.proxyTimeout);
    
    var helpArgs = args['-h'] || args['--help'];
    if (helpArgs) help();

// });

function setLogger(config){

  var loggerConfig = config.logger;
  logger = new Logger(loggerConfig);
  process.logger = logger;
  return logger;

}

function help() {
    console.log(`

  Node Server:

      --help, -h                          This help doc.

      --ip, -ip                           Example: 'node server --ip master'

      --mongo, -M                         Activate MongoDB Client. 
                                          Example: 'node server --mongo' 

      --config-path, -cp                  configuration folder, relative to 'root' folder,
                                          Example: source/path/to/config.
                                          this app uses: config/
  `);
  // process.exit();
};
