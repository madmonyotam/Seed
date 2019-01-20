module.exports = require('./componentsCollection.js');

if(module.hot) {
    module.hot.accept('./componentsCollection.js', function() {
        var plugin = require('./componentsCollection.js');
        core.reloadPlugin(plugin);
    });
}