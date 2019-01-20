
module.exports = require('./widgetManager.js');

if(module.hot) {
    module.hot.accept('./widgetManager.js', function() {
        var plugin = require('./widgetManager.js');
        core.reloadPlugin(plugin);
    });
}
