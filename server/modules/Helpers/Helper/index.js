module.exports = {

    getServerConfig() {
        var configDev;
        var config = require(`${process.rootFolder}/server/config/serverConfig.json`);
        
        try {
          configDev = require(`${process.rootFolder}/server/config/serverConfigDev.json`);
        } catch (error) {
          return config;
        }
        
        config = configDev ? configDev : config;
        return config;
    },

    getArgs(){
        var args = {};
        for (var i = 0; i < process.argv.length; i++) {
          if (process.argv[i].indexOf('-') === 0) {
            args[process.argv[i]] = process.argv[i + 1] || true;
          }
        }
        return args;
    },

    getServerIp(){
      var args = this.getArgs(process);
      var serverIp = args['-ip'] || args['--ip'];
      if (!serverIp) serverIp = 'master';
      return serverIp;
    },

    getIp(req) {

        var ip = req.headers["X-Real-IP"]
                 || req.ip
                 || req.connection.remoteAddress
                 || req.connection.socket.remoteAddress
                 || '';

        ip = ip.split(',')[0].trim();
        if(/^::(ffff)?:(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(ip)) {
          ip = ip.replace(/^.*:/, '');
        }

        return ip;
    }


    // var connector = new FedDB(core.config.mongo);
    // connector.connect(function (db) {
    //   userDb.setAuthToken(db, body.AuthorizationToken, body.user.id)
    //     .then(function () {
    //       db.close();
    //     });
    // })

}
