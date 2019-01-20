
module.exports = require('./IconPopover.jsx');

if(module.hot) {
    module.hot.accept('./IconPopover.jsx', function() {

        var IconPopover = require('./IconPopover.jsx');
        
        core.injector.revoke(IconPopover.name);
        core.View(IconPopover);
        core.emit('hotUpdate');
        
    });
}