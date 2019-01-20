
module.exports = require('./Basic.js');

if(module.hot) {
    module.hot.accept('./Basic.js', function() {

        var Basic = require('./Basic.js');
        
        core.injector.revoke(Basic.name);
        core.Module(Basic);
        core.emit('hotUpdate');

    });
}