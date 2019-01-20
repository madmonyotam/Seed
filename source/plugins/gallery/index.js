
module.exports = require('./gallery.js');

if(module.hot) {
    module.hot.accept('./gallery.js', function() {
        var plugin = require('./gallery.js');
        core.reloadPlugin(plugin);
    });
}
