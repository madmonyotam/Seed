
module.exports = require('./ExtandBasic.js');

if(module.hot) {
    module.hot.accept('./ExtandBasic.js', function() {

        var ExtandBasic = require('./ExtandBasic.js');
        
        core.injector.revoke(ExtandBasic.name);
        core.Module(ExtandBasic);
        core.emit('hotUpdate');

    });
}