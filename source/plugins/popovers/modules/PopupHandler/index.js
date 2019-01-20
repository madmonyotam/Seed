
module.exports = require('./PopupHandler.js');

if(module.hot) {
    module.hot.accept('./PopupHandler.js', function() {

        var PopupHandler = require('./PopupHandler.js');
        
        core.injector.revoke(PopupHandler.name);
        core.Module(PopupHandler);
        core.emit('hotUpdate');

    });
}