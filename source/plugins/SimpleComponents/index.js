module.exports = require('./SimpleComponents.js');

if(module.hot) {
    module.hot.accept('./SimpleComponents.js', function() {
        var plugin = require('./SimpleComponents.js');
        core.reloadPlugin(plugin);
    });
}