
module.exports = require('./DataModelsEntry.js');

if(module.hot) {
    module.hot.accept('./DataModelsEntry.js', function() {

        var DataModelsEntry = require('./DataModelsEntry.js');
        
        core.injector.revoke(DataModelsEntry.name);
        core.Module(DataModelsEntry);
        core.emit('hotUpdate');

    });
}