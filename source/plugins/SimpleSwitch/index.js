
module.exports = require('./SimpleSwitch.js');

if(module.hot) {
    module.hot.accept('./SimpleSwitch.js', function() {
        var plugin = require('./SimpleSwitch.js');
        core.reloadPlugin(plugin);
    });
}
