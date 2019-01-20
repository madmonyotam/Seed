
module.exports = require('./LoaderEx.jsx');

if(module.hot) {
    module.hot.accept('./LoaderEx.jsx', function() {

        var LoaderEx = require('./LoaderEx.jsx');
        
        core.injector.revoke(LoaderEx.name);
        core.View(LoaderEx);
        core.emit('hotUpdate');
        
    });
}