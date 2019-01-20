
module.exports = require('./Component.jsx');

if(module.hot) {
    module.hot.accept('./Component.jsx', function() {

        var Component = require('./Component.jsx');
        
        core.injector.revoke(Component.name);
        core.View(Component);
        core.emit('hotUpdate');
        
    });
}