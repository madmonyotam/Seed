
module.exports = require('./pure.js');

if(module.hot) {
    module.hot.accept('./pure.js', function() {

        var pure = require('./pure.js');
        
        core.injector.revoke(pure.name);
        core.Module(pure);
        core.emit('hotUpdate');

    });
}