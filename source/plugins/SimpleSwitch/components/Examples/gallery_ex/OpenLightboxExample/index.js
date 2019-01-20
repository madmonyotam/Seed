
module.exports = require('./OpenLightboxExample.jsx');

if(module.hot) {
    module.hot.accept('./OpenLightboxExample.jsx', function() {

        var OpenLightboxExample = require('./OpenLightboxExample.jsx');
        
        core.injector.revoke(OpenLightboxExample.name);
        core.View(OpenLightboxExample);
        core.emit('hotUpdate');
        
    });
}