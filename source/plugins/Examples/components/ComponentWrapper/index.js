
module.exports = require('./ComponentWrapper.jsx');

if(module.hot) {
    module.hot.accept('./ComponentWrapper.jsx', function() {

        var ComponentWrapper = require('./ComponentWrapper.jsx');
        
        core.injector.revoke(ComponentWrapper.name);
        core.View(ComponentWrapper);
        core.emit('hotUpdate');
        
    });
}