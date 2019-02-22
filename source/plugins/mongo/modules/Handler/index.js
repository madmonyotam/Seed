
module.exports = require('./Handler.js');

if(module.hot) {
    module.hot.accept('./Handler.js', function() {

        var Handler = require('./Handler.js');
        
        core.injector.revoke(Handler.name);
        core.Module(Handler);
        core.emit('hotUpdate');

    });
}