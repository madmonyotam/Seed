
module.exports = require('./EasilyCenterYourElements.jsx');

if(module.hot) {
    module.hot.accept('./EasilyCenterYourElements.jsx', function() {

        var EasilyCenterYourElements = require('./EasilyCenterYourElements.jsx');
        
        core.injector.revoke(EasilyCenterYourElements.name);
        core.Component(EasilyCenterYourElements);
        core.emit('hotUpdate');
        
    });
}