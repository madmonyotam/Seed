
module.exports = require('./Mixin.js');

if(module.hot) {
    module.hot.accept('./Mixin.js', function() {

        var Mixin = require('./Mixin.js');
        
        core.injector.revoke(Mixin.name);
        core.Module(Mixin);
        core.emit('hotUpdate');

    });
}