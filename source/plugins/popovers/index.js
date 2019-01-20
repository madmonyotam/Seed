
module.exports = require('./popovers.js');

if(module.hot) {
    module.hot.accept('./popovers.js', function() {
        var plugin =  require('./popovers.js');
        core.reloadPlugin(plugin);
    });
}