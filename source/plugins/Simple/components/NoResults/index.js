
module.exports = require('./NoResults.jsx');

if(module.hot) {
    module.hot.accept('./NoResults.jsx', function() {

        var NoResults = require('./NoResults.jsx');
        
        core.injector.revoke(NoResults.name);
        core.View(NoResults);
        core.emit('hotUpdate');
        
    });
}