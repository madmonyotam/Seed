
module.exports = require('./Mongo.js');

if(module.hot) {
    module.hot.accept('./Mongo.js', function() {
        var plugin = require('./Mongo.js');
        core.reloadPlugin(plugin);
    });
}
