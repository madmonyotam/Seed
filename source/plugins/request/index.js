
module.exports = require('./request.js');

if(module.hot) {
    module.hot.accept('./request.js', function() {
        var plugin = require('./request.js');
        core.reloadPlugin(plugin);
    });
}