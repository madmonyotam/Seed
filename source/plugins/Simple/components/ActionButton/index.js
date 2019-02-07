
module.exports = require('./ActionButton.jsx');

if(module.hot) {
    module.hot.accept('./ActionButton.jsx', function() {

        var ActionButton = require('./ActionButton.jsx');
        
        core.injector.revoke(ActionButton.name);
        core.View(ActionButton);
        core.emit('hotUpdate');
        
    });
}