module.exports = require('./Router.js');

if(module.hot) {
    module.hot.accept('./Router.js', function() {
        var plugin = require('./Router.js');
        core.reloadPlugin(plugin);
    });
}