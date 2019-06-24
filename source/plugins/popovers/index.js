
module.exports = require('./Popovers.js');

if(module.hot) {
    module.hot.accept('./Popovers.js', function() {
        var plugin =  require('./Popovers.js');
        core.reloadPlugin(plugin);
    });
}