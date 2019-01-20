module.exports = require('./translate.js');

if(module.hot) {
    module.hot.accept('./translate.js', function() {
        var plugin = require('./translate.js');
        core.reloadPlugin(plugin);
    });
}