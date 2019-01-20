var fs = require('fs');
var p = require('path');
var Q = require('q');
var colors = require('colors');
var request = require('request');
var utils = require('./utils.js');
var _ = require("lodash");

var translations = {};
var names = [];
var count = 0;
var counts = {
  source: 0,
  sourcePass: 0,
  ddm: 0,
  ddmPass: 0,
  systemLists: 0,
  systemListsPass: 0,
  config: 0,
  configPass: 0,
  manuals: 0,
  manualsPass: 0,
  translations: 0,
  files: 0,
  dynamicKeys: 0,
  // occurrences: 0,
  duplicates: 0,
  namespacings: 0,
  fixes: 0,
};
var map = {};
var dynamicKeys = [];
var duplicates = {};
var stringChars = ['"', "'", "`"];
var rootFolder = p.resolve(__dirname, '../')
var root = p.join(rootFolder, 'source');
var username = 'koko';
var password = 'loko';
var appConfigPath = '../../config';
// var masterConfig = fs.existsSync(p.resolve(__dirname, "../../config.dev/index.js")) ? _.merge(require(appConfigPath), require('../../config.dev')) : require(appConfigPath);
var config = require('./config.js');
var token, authorized = false;
var languagesPath = p.join(process.cwd(), 'servers/fusion/languages');
var outputPath = p.join(__dirname, 'output');
var statsPath = p.join(__dirname, 'stats');
var mapPath = p.join(statsPath, 'map.json');
var dynamicKeysPath = p.join(statsPath, 'dynamicKeys.json');
var duplicatesPath = p.join(statsPath, 'duplicates.json');
var strangePath = p.join(statsPath, 'strange.json');
var defaultLanguagePath = p.resolve(__dirname, '../languages/en.json');
var resultPath = p.join(statsPath, 'result.json');

var args = {};
for (var i = 0; i < process.argv.length; i++) {
  if (process.argv[i].indexOf('-') === 0) {
    args[process.argv[i]] = process.argv[i + 1] || true;
  }
}

if (args['-h'] || args['--help']) help();
var stats = args['-s'] || args['--stats'];
var merge = args['-m'] || args['--merge'];
var fix = args['-f'] || args['--fix'];
var mergeAll = args['-a'] || args['--all'];
var override = args['-o'] || args['--override'];
var oc = args['-oc'] || args['--occurrences'];
var logArg = args['-l'] || args['--log'];
var logErrorArg = args['-le'] || args['--log-error'];
var keepOldKeys = (args['-k'] || args['--keep']) || false;

function log(){
 
  if(logArg){
    console.log.apply(console, arguments);
  }
}

function error(){
  if(logArg || logErrorArg){
    console.log.apply(console, arguments);
  }
}


function typeOf(thing) {
  var type = Object.prototype.toString.call(thing);
  return type.substring(8, type.length - 1).toLowerCase();
}

function help() {
  console.log(`
Translate:

--help, -h                          This help doc.

--stats, -s                         write activity stats to 'translate/stats' folder

--merge, -m                         Merge with existing language in 'servers/fusion/languages'. pass a valid existing language name (en, he, etc.)

--all, -a                           Merge all languages in 'servers/fusion/languages'.

--log, -l                           Log to console.

--log-errors, -le                   Log only errors to console.
--keep -k                           Keeps keys that no long exists in source during the merging
    `);
  process.exit();
}

function parseString(source, index, path, lines) { // source[index] should equal " ' or `
  if (!index) index = 0;
  var string = '',
  last = '',
    char, stringChar = source[index];
  if (stringChars.indexOf(stringChar) === -1) {
    return '';
  }
  index += 1;
  char = source[index];
  try{
    while ((char !== stringChar) || last === "\\") {
      string = string + char;
      index += 1;
      last = char;
      char = source[index];
    }
  }
  catch(err){
    console.log('cannot parse string in '.red + path.yellow, '- line'.red, lines.toString().yellow);
  }
  if (!string) console.log('cannot parse string in ' + path, '- line', lines);
  return string;
}

function login(cb) {
  if (!config.username) return cb();
  var url = `${masterConfig.master}/authentication?logoutIfLoggedin=true`;
  console.log('logging in..'.green);
  console.log(url.yellow);
  request({
    json: true,
    url: url,
    method: 'POST',
    auth: {
      username: config.username,
      password: config.password
    }
  }, function (err, response, body) {
    if (err) return console.log(err.toString().red);
    if(body.error){
      return console.log(JSON.stringify(body.error).red);
    }
    token = body.AuthorizationToken;
    if (token) {
      console.log('logged in..'.green);
      authorized = true;
      cb && cb(true);
    } else {
      console.log('cannot login - '.red);
      console.log(JSON.stringify(body).red);
    }
  });
}

function addTranslation(key, value, data, count) {
  if (!value) {
    value = key;
  }
  if (translations[key]) {
    counts.duplicates += 1;
    translations[key].occurrences.push(data);
    log(`duplicate key`.red, key.cyan, `in`.red, data.path.cyan);
  }
  else{
    counts.translations += 1;
    if(count){
      counts[count] += 1;
    }
    translations[key] = {
      "defaultValue": value,
      "value": null,
      "occurrences": [data]
    }
  }    
}

function mergeTranslation(newTranslation, oldTranslation, fileName){
  var type, oldType, newType, translation = Object.assign({}, newTranslation);
  for (var m in oldTranslation) {
    if (!translation[m]) {
      console.log(`key`.red, m, `from`.red, `${fileName}`, `no longer exists in source files`.red);
      if(!keepOldKeys)
        continue;
    }    
    
    type = typeOf(oldTranslation[m]);
    if (type === 'object') {
      if(!translation[m]) { 
        log(`keeping old key in localization file: `.yellow, String(m).red);
        console.warn(`keeping old key in localization file: `.yellow, String(m).red);
        translation[m] = {
          defaultValue: oldTranslation[m].defaultValue,
          value: null,
          source: "unknown"
        }
      }
      if (oldTranslation[m].value !== null) {
        log(`merging key`, m.cyan, 'with', String(translation[m].value));
        translation[m].value = oldTranslation[m].value;
      }
    } else if (type === 'string') {
      if(!translation[m]) {
        log(`keeping old key in localization file: `.yellow, String(m).red);
        console.warn(`keeping old key in localization file: `.yellow, String(m).red);
        translation[m] = {
          defaultValue: oldTranslation[m],
          value: null,
          source: "unknown"
        }
      }
      if (oldTranslation[m]) {
        log(`merging key`, m.cyan, 'with', translation[m]);
        translation[m].value = oldTranslation[m];
      }
    }
  }
  return translation;
}

function readDir(path) { // reads a folder recursively. readDir('path') => ['path/file content', ['path/folder/file content'']]

  return Q.nfcall(fs.readdir, path).then((fileNames) => {
    return Q.all(fileNames.map((fileName) => {
      var filePath = p.join(path, fileName);
      return Q.nfcall(fs.lstat, filePath).then(function (stats) {
        var deferred = Q.defer();
        if (stats.isDirectory()) {
          readDir(filePath).then(function (result) {
            deferred.resolve({
              isFile: false,
              path: filePath.replace(root, ''),
              content: result
            });
          });
        } else {
          fs.readFile(filePath, 'utf-8', function (err, content) {
            if (err) return deferred.reject(err);
            deferred.resolve({
              isFile: true,
              path: filePath.replace(root, ''),
              content: content
            });
          })
        }
        return deferred.promise;

      });
    }))
  });
}



function parseMasterConfig(){

  function readConfigTarget(target, config){
    if (Array.isArray(target)) {
      target.map(function (t, i) {
        if (!t[config.keyField]) {
          error(`cannot find key`.red, config.keyField.cyan, `in ${config.path.join('.')}.${i}`.red)
        } else {
          log('setting key', t[config.keyField].cyan, `from masterConfig.${config.path.join('.')}.${i}`);
          addTranslation(t[config.keyField],  t[config.valueField], {
            defaultValue: t[config.valueField],
            source: `config`,
            path: config.path.join(".")
          }, 'configPass')
          counts.config += 1;
        }
      });
    } else {
      if(!target[config.keyField]){
        return error(`cannot find key`.red, config.keyField.cyan, `in masterConfig.${config.path.join('.')}`.red)
      }
      log('setting key', config.keyField.cyan, `from masterConfig.${config.path.join('.')}`);
      addTranslation(target[config.keyField],  target[config.valueField], {
        defaultValue: target[config.valueField],
        source: `config`,
        path: config.path.join(".")
      }, 'configPass')
      counts.config += 1;
    }
  }

  function parseConfigTarget(target, path, config){
    var m, i, p, next, nested;
    var newPath = [ ...path ];
    var property = newPath.shift();
    var newTarget = target[property];
    var newTargetIsArray = Array.isArray(newTarget);
    if (!newTarget) return error(`cannot find target from path "${config.path.join('/')}". property ${property} is missing.`.red);
    if(!newPath.length){
      if(newTargetIsArray){
        newTarget.map(function(t){
          readConfigTarget(t, config);
        });
      }
      else{
        readConfigTarget(newTarget, config);
      }
    }
    else{
      if(newTargetIsArray){
        newTarget.map(function(t, i){
          parseConfigTarget(t, newPath.concat([i]), config);
        });
      }
      else{
        parseConfigTarget(newTarget, newPath, config);
      }
      
    }
  }

  config.getFromMasterConfig.map(function (obj) {
    parseConfigTarget(masterConfig, obj.path, obj);
  });
}

function parseSystemLists(cb){
  request({
    json: true,
    url: `${masterConfig.master}/utils/systemlists`,
    method: 'GET',
    headers: {
      'AuthorizationToken': token
    }
  }, function (err, response, systemLists) {

    console.log('applying system lists..'.green);    
    if (err) return console.trace(err);
    if(response.statusCode !== 200) {
      return console.trace("SystemLists request fails", systemLists);
    }
    systemLists.map(function (s, i1) {
      s.values.map(function (v, i2) {
        addTranslation(v.label, v.id, {
          defaultValue: v.id,
          source: "systemList",
          path: `${i1}.values.${i2}`
        }, 'systemListsPass')
        log('setting systemList', v.label.cyan);
        counts.systemLists += 1;
      })
    });
    cb();
  });
}

function parseManuals(){
  console.log('parsing manual keys..'.green);
  for (var k in config.manuals) {
    log('setting key'.green, k.cyan, `from manuals`.green);
    if (typeof config.manuals[k] === 'string') {
      addTranslation(k, config.manuals[k], {
        defaultValue: config.manuals[k],
        source: "manual",
        path: k
      }, 'manualsPass');
    } else {
      addTranslation(config.manuals[k].key, config.manuals[k].defaultValue, {
        defaultValue: config.manuals[k].defaultValue,
        source: "manual",
        path: k
      }, 'manualsPass');
    }
    counts.manuals += 1;
  }
}

function parseSourceFiles(cb){

  function numberOfLines(str) {
    return str.split(/\r\n|\r|\n/).length;
  }

  function occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
  }

  function translateSource(key, value, path, lines) {
    if (!key) {
      console.log('cannot find key in '.red, path.yellow, '- line'.red, String(lines).yellow);
    }
    if (!value) {
      value = key;
    }
    if (!map[path]) map[path] = {};
    map[path][key] = {
      line: lines,
      value: value
    };
    counts.source += 1;
    addTranslation(key, value, {
      "source": "code",
      "path": `${root}${path}:${lines}`,
      "defaultValue": value
    }, 'sourcePass');   
  }

  function parseArguments(source, path, lines) {
    var index = 0;
    source = source.trim();
    var arg, args = [];
    var parans = 0;
    if (stringChars.indexOf(source[0]) === -1) {
      var dkey = source.substr(0, Math.min(source.indexOf(','), source.indexOf(')')));
      var skey = dkey;
      if (dkey.length > 10) skey = dkey.substr(0, 10) + '...';
      counts.dynamicKeys += 1;
      dynamicKeys.push({ path: path, line: lines, key: dkey});
      log('skipping dynamic key'.magenta, skey.cyan, 'in'.magenta, path.yellow, `- line ${lines}`.cyan);
      return null;
    }
    while (source[index] !== ')' && !parans) {
      if (!source[index]) return [];
      if(source[index] === '('){ parans += 1; }
      else if(source[index] === ')'){ parans -= 1; }
      else if (stringChars.indexOf(source[index]) > -1) {
        arg = parseString(source, index, path, lines);
        args.push(arg);
        index = index + arg.length + 1;
      }
      index += 1;
    }
    return args;
  }

  function parse(target) {

    var i, t, k, l, file, index, args, name, component, components, translates, coreTranslates, pluginName;
    var lines = 1;
    var isEmpty = true;
    if (target.isFile) {
      file = target.content;
      
      if((target.path.indexOf('@') > -1) || (target.path.indexOf('.js') < (target.path.length - 4))){
        return;
      }    
      // counts.occurrences += occurrences(file, '.translate(');
      // translates = file.split('this.translate(').join('core.translate(').split('core.translate(');
      if(fix){
        translates = file.split('this.translate(')
        if(translates.length > 1){
          file = translates.join('core.translate(');
          var fPath = p.join(root, target.path);
          fs.writeFileSync(fPath, file);
          counts.fixes += 1;
          log(`this.translate() => core.translate() in -`.cyan, target.path.yellow);
        }
      }
      
      translates = file.split('core.translate(');
      index = 0;
      for (t = 0; t < translates.length; t++) {
        if (translates[t]) {
          index += translates[t].length;
          if (t > 0) {
            index += 15
            args = parseArguments(translates[t], target.path, lines);
            if (args) {
              isEmpty = false;
              translateSource(args[0], args[1], target.path, lines);
            }
          }
          lines += (numberOfLines(translates[t]) - 1);
        }
      }
      if(!isEmpty){
        counts.files += 1;
      }
    } else {
      for (i = 0; i < target.content.length; i++) {
        file = target.content[i];
        parse(file);
      }
    }

  }

  console.log('reading source files from'.green, root.yellow);
  readDir(root).then((data) => {

    console.log('parsing source files..'.green);
    parse({
      isFile: false,
      path: root,
      content: data
    });

    cb();

  }).catch((err) => {
    console.error(err);
  });
}

function parseDDM(done){
  console.log(`fetching DDM`.green);
  request({
    json: true,
    url: `${masterConfig.master}/ddm?logoutIfLoggedin=true`,
    method: 'GET',
    headers: {
      'AuthorizationToken': token
    }
  }, function (err, response, body) {
      if (err) return console.log(err.toString().red);
      if(body.error){
        return console.log(JSON.stringify(body.error).red);
      }
      console.log(`got DDM, parsing..`.green);
      var ddm = body;
      var getFromDDM = config.getFromDDM;
      var prefix = getFromDDM.prefix;
      var labelKeyFields = getFromDDM.labelKeyFields;
      var defaultLabelFields = getFromDDM.defaultLabelFields;

      function set(key, path, target){
        var value;
        var pathString = path.join('.')
        for(var i = 0; i < defaultLabelFields.length; i++){
          if(defaultLabelFields[i] in target){
            value = target[defaultLabelFields[i]];
            if(prefix){
              key = prefix + key;
            }
            counts.ddm += 1;
            return addTranslation(key, value, {
              source: 'ddm',
              path: pathString,
              defaultValue: value
            }, 'ddmPass');
          }
        }
        console.log('DDM - no display label in '.red, pathString.yellow);
      }

      function walk(target, path){
        if(!target){ return; }
        if(Array.isArray(target)){
          for(var i = 0; i < target.length; i++){
            walk(target[i], path.concat([i]));
          }
        }
        else if(typeof target === 'object'){
          for(var m in target){
            if(labelKeyFields.indexOf(m) > -1){
              set(target[m], path, target)
            }
            else{
              walk(target[m], path.concat([m]));
            }
          }
        }
      }

      walk(ddm, []);
      done();
  });
}



function namespace(duplicate){
  duplicate.occurrences.map(occ => {
    if(occ.source !== 'code'){ return; }
    var path = occ.path.split(':')[0];
    var file = fs.readFileSync(path, 'utf-8');
    var stringChar = occ.stringChar;
    var array = file.split('core.translate(');
    var first = array.shift();
    var index = first.length + 15;
    var changed = false;
    var namespaced = array.map(function(t){
      var stringChar = t[0];
      var string = parseString(t);
      if(!string){
        return t;
      }
      var fileName = path.substring(path.lastIndexOf(p.sep) + 1,path.lastIndexOf('.'));
      if(fileName.indexOf('.module') > -1){
        fileName = fileName.substring(0, fileName.indexOf('.module'))
      }
      if(string.indexOf(fileName) > -1){
        return t;
      }
      changed = true;
      return (stringChar + fileName + '.' + string + t.substr(string.length + 1));
    });
    if(changed){
      namespaced.unshift(first);
      counts.namespacings += 1;
      fs.writeFileSync(path, namespaced.join('core.translate('))
    }
    
  });
}


function finish(){

  function sortFunc(a, b) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }

  var keys = Object.keys(translations).sort(sortFunc);
  var existing, result = {};
  keys.map(k => {
    var t = translations[k];
    if(!oc){
      t = Object.assign({}, t);
      delete t.occurrences;
    }
    result[k] = t;
    if(translations[k].occurrences.length > 1){
      duplicates[k] = translations[k];
    }
  });

  if (merge) {
    try {
      existing = fs.readFileSync(p.join(process.cwd(), 'servers/fusion/languages', `${merge}.json`));
      existing = JSON.parse(existing);
      result = mergeTranslation(result, existing, `servers/fusion/languages/${merge}.json`);
    } catch (err) {
      console.log(`cannot find language ${merge} in 'servers/fusion/languages/${merge}.json'`);
    }
  }

  else if(mergeAll){
    utils.rmDir(outputPath);
    fs.mkdirSync(outputPath);
    var all = utils.jsonFromDir(languagesPath);
    for(var m in all){
      fs.writeFile(p.join(outputPath, `${m}.json`), JSON.stringify(mergeTranslation(result, all[m],`servers/fusion/languages/${m}.json`), null, 4), function (err) { if(err) console.log(err) });
    }
  }

  else if(override){
    var all = utils.jsonFromDir(languagesPath);
    utils.rmDir(languagesPath);
    fs.mkdirSync(languagesPath);
    for(var m in all){
      fs.writeFile(p.join(languagesPath, `${m}.json`), JSON.stringify(mergeTranslation(result, all[m],`servers/fusion/languages/${m}.json`), null, 4), function (err) { if(err) console.log(err) });
    }
  }

  

  

  if(stats){
    utils.rmDir(statsPath);
    fs.mkdirSync(statsPath);
    var strange = {};
    for(var t in result){
      if(/\$\{(.*)\}/.test(result[t].defaultValue)){
        strange[t] = result[t];
      }
    }
    fs.writeFile(resultPath, JSON.stringify(result, null, 4), function (err) { if(err) console.log(err) });
    fs.writeFile(mapPath, JSON.stringify(map, null, 4), function (err) { if(err) console.log(err) });
    fs.writeFile(dynamicKeysPath, JSON.stringify(dynamicKeys, null, 4), function (err) { if(err) console.log(err) });
    fs.writeFile(duplicatesPath, JSON.stringify(duplicates, null, 4), function (err) { if(err) console.log(err) });
    fs.writeFile(strangePath, JSON.stringify(strange, null, 4), function (err) { if(err) console.log(err) });
  }



  console.log(`+ ${counts.translations} total translations`.green);
  console.log(`+ ${ counts.sourcePass }/${counts.source} from source code in ${ counts.files } files`.green);
  // console.log(`+ ${ counts.ddmPass }/${ counts.ddm } from DDM`.green);
  // console.log(`+ ${ counts.systemListsPass }/${ counts.systemLists } systemLists`.green);
  console.log(`+ ${ counts.configPass }/${ counts.config } master config values`.green);
  console.log(`+ ${ counts.manualsPass }/${ counts.manuals } manuals`.green);
  console.log(`${ counts.dynamicKeys } dynamic keys`.magenta);
  // console.log(`${ counts.occurrences } occurrences`.magenta);
  console.log(`${ Object.keys(duplicates).length } duplicated keys with ${ counts.duplicates } values`.magenta);

  fs.writeFileSync(defaultLanguagePath, JSON.stringify(result, null, 4));
  console.log(` * =>`.green, defaultLanguagePath.yellow);
  
}

// parseSourceFiles(function () {
//   finish();
// });

if(fix){
  parseSourceFiles(function(){
    Object.keys(translations).map(k => {
      if(translations[k].occurrences.length > 1){
        namespace(translations[k]);
      }
    });
    if(counts.fixes > 0){
      console.log(`fixed ${ counts.fixes } files, please commit to version control`.cyan);
    }
    if(counts.namespacings > 0){
      console.log(`namespaced ${ counts.namespacings } files, please commit to version control`.cyan);
    }
  });
}
else{
  // login(function(){
    parseSourceFiles(function(){
      // parseSystemLists(function(){
        // parseDDM(function(){
        //  parseManuals();
        //  parseMasterConfig();
          finish();
        // });
      // });
    })
  // })
}

