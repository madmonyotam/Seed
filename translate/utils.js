
var fs = require('fs');
var p = require('path');

module.exports = {
    rmDir(dirPath) {
      try { var files = fs.readdirSync(dirPath); }
      catch(e) { return; }
      if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
          var filePath = dirPath + '/' + files[i];
          if (fs.statSync(filePath).isFile())
            fs.unlinkSync(filePath);
          else
            rmDir(filePath);
        }
      fs.rmdirSync(dirPath);
    },
    jsonFromDir(path){
      var i, filePath, fileName, result = {};
      try { var files = fs.readdirSync(path); }
      catch(e) { return; }
      if (files.length > 0)
        for (i = 0; i < files.length; i++) {
          fileName = files[i].split('.');
          if(fileName.pop() !== 'json') continue;
          filePath = p.join(path, files[i]);
          result[fileName.join('.')] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
      return result;
    }
};