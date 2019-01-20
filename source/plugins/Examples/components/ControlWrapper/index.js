
module.exports = require('./ControlWrapper.jsx');

if(module.hot) {
    module.hot.accept('./ControlWrapper.jsx', function() {

        var ControlWrapper = require('./ControlWrapper.jsx');
        
        core.injector.revoke(ControlWrapper.name);
        core.View(ControlWrapper);
        core.emit('hotUpdate');
        
    });
}