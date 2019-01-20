
module.exports = require('./translate.js');

if(module.hot) {
    module.hot.accept('./translate.js', function() {

        var translate = require('./translate.js');
        
        core.injector.revoke(translate.name);
        core.Module(translate);
        core.emit('hotUpdate');

    });
}