
module.exports = require('./rules.js');

if(module.hot) {
    module.hot.accept('./rules.js', function() {

        var rules = require('./rules.js');
        
        core.injector.revoke(rules.name);
        core.Module(rules);
        core.emit('hotUpdate');

    });
}