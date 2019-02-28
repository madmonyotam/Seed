var express = require('express');
var path = require('path');
var fs = require('fs');
var log = require('node-pretty-log');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use('/', express.static(path.resolve(__dirname, '../')));

var fsTools = require('./fsTools/fileSystem.js');
var mongoActions = require('./mongo/actions.js');
var configPath;// = 'source/plugins/settings/config/';
// pass -cp to node server command
var args = {};
for (var i = 0; i < process.argv.length; i++) {
  if (process.argv[i].indexOf('-') === 0) {
    args[process.argv[i]] = process.argv[i + 1] || true;
  }
}

var configPath = args['-cp'] || args['--config-path'];
var helpArgs = args['-h'] || args['--help'];
var mongoArgs = args['-m'] || args['--mongo'];

if (mongoArgs) mongoActions.activate(app, null)

function help() {
  console.log(`
Node Server:

--help, -h                          This help doc.

--mongo, -m                         Activate mongodb.

--config-path, -cp                  configuration folder, relative to 'root' folder,
                                    exapmle: source/path/to/config.
                                    this app uses: source/plugins/settings/config/
  `);
  // process.exit();
};

if (helpArgs) help()

app.post('/saveFile', (req, res) => {
  fsTools.saveFile(req, res, configPath);
});

app.post('/saveSettings', (req, res) => {
  fsTools.save(req, res, configPath);
});

app.post('/loadSettings', (req, res) => {
  fsTools.load(res, configPath);
});

app.post('/loadFile', (req, res) => {
  fsTools.loadFile(req, res, configPath);
});

let port = 5000;

app.listen(port, ()=> {
  if (!configPath) configPath = 'source/plugins/settings/config/';

  help()

  if (mongoArgs) log('info', '--', 'Mongodb activated')
  log('success', `running port ${port}`) 

})
