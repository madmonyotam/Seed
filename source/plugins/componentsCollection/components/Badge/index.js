
module.exports = require('./Badge.jsx');

if(module.hot) {
    module.hot.accept('./Badge.jsx', function() {

        var Badge = require('./Badge.jsx');
        
        core.injector.revoke(Badge.name);
        core.View(Badge);
        core.emit('hotUpdate');
        
    });
}