module.exports = require('./Loader.jsx');

if(module.hot) {
    module.hot.accept('./Loader.jsx', function() {

        var Loader = require('./Loader.jsx');
        
        core.injector.revoke(Loader.name);
        core.View(Loader);
        core.emit('hotUpdate');
        
    });
}