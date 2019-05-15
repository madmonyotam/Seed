
module.exports = require('./MockUIHelpers.js');

if(module.hot) {
    module.hot.accept('./MockUIHelpers.js', function() {

        var MockUIHelpers = require('./MockUIHelpers.js');
        
        core.injector.revoke(MockUIHelpers.name);
        core.Module(MockUIHelpers);
        core.emit('hotUpdate');

    });
}