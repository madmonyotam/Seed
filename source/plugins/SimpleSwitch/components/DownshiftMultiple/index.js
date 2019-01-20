
module.exports = require('./DownshiftMultiple.jsx');

if(module.hot) {
    module.hot.accept('./DownshiftMultiple.jsx', function() {

        var DownshiftMultiple = require('./DownshiftMultiple.jsx');
        
        core.injector.revoke(DownshiftMultiple.name);
        core.View(DownshiftMultiple);
        core.emit('hotUpdate');
        
    });
}