module.exports = require('./Examples.js');

if(module.hot) {
    module.hot.accept('./Examples.js', function() {
        var plugin = require('./Examples.js');
        core.reloadPlugin(plugin);
    });
}