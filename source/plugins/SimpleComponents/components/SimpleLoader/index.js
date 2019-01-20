module.exports = require('./SimpleLoader.jsx');

if(module.hot) {
    module.hot.accept('./SimpleLoader.jsx', function() {

        var SimpleLoader = require('./SimpleLoader.jsx');
        
        core.injector.revoke(SimpleLoader.name);
        core.View(SimpleLoader);
        core.emit('hotUpdate');
        
    });
}