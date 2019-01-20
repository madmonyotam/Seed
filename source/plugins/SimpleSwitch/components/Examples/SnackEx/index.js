
module.exports = require('./SnackEx.jsx');

if(module.hot) {
    module.hot.accept('./SnackEx.jsx', function() {

        var SnackEx = require('./SnackEx.jsx');
        
        core.injector.revoke(SnackEx.name);
        core.Component(SnackEx);
        core.emit('hotUpdate');
        
    });
}