
module.exports = require('./Notify.jsx');

if(module.hot) {
    module.hot.accept('./Notify.jsx', function() {

        var Notify = require('./Notify.jsx');
        
        core.injector.revoke(Notify.name);
        core.Component(Notify);
        core.emit('hotUpdate');
        
    });
}