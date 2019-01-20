
module.exports = require('./Arrow.jsx');

if(module.hot) {
    module.hot.accept('./Arrow.jsx', function() {

        var Arrow = require('./Arrow.jsx');
        
        core.injector.revoke(Arrow.name);
        core.Component(Arrow);
        core.emit('hotUpdate');
        
    });
}