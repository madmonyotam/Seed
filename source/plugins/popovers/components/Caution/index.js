
module.exports = require('./Caution.jsx');

if(module.hot) {
    module.hot.accept('./Caution.jsx', function() {

        var Caution = require('./Caution.jsx');
        
        core.injector.revoke(Caution.name);
        core.Component(Caution);
        core.emit('hotUpdate');
        
    });
}