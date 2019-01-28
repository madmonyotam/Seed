
module.exports = require('./Examples.jsx');

if(module.hot) {
    module.hot.accept('./Examples.jsx', function() {

        var Examples = require('./Examples.jsx');
        
        core.injector.revoke(Examples.name);
        core.View(Examples);
        core.emit('hotUpdate');
        
    });
}