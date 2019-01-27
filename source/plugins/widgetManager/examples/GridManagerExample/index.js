
module.exports = require('./GridManagerExample.jsx');

if(module.hot) {
    module.hot.accept('./GridManagerExample.jsx', function() {

        var GridManagerExample = require('./GridManagerExample.jsx');
        
        core.injector.revoke(GridManagerExample.name);
        core.View(GridManagerExample);
        core.emit('hotUpdate');
        
    });
}