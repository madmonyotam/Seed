
module.exports = require('./Popup.jsx');

if(module.hot) {
    module.hot.accept('./Popup.jsx', function() {

        var Popup = require('./Popup.jsx');
        
        core.injector.revoke(Popup.name);
        core.Component(Popup);
        core.emit('hotUpdate');
        
    });
}