
module.exports = require('./Helper.js');

if(module.hot) {
    module.hot.accept('./Helper.js', function() {

        var Helper = require('./Helper.js');
        
        core.injector.revoke(Helper.name);
        core.Module(Helper);
        core.emit('hotUpdate');

    });
}