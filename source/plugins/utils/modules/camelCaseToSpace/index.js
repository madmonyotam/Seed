
module.exports = require('./camelCaseToSpace.js');

if(module.hot) {
    module.hot.accept('./camelCaseToSpace.js', function() {

        var camelCaseToSpace = require('./camelCaseToSpace.js');
        
        core.injector.revoke(camelCaseToSpace.name);
        core.Module(camelCaseToSpace);
        core.emit('hotUpdate');

    });
}