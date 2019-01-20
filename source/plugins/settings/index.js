
module.exports = require('./Settings.js');

if(module.hot) {
    module.hot.accept('./Settings.js', function() {
        var plugin = require('./Settings.js');
        core.reloadPlugin(plugin);
    });
}
