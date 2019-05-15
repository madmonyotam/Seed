
module.exports = require('./Helpers.js');

if(module.hot) {
    module.hot.accept('./Helpers.js', function() {

        var Helpers = require('./Helpers.js');
        
        core.injector.revoke(Helpers.name);
        core.Module(Helpers);
        core.emit('hotUpdate');

    });
}