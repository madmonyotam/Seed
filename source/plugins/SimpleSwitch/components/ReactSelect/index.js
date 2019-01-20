
module.exports = require('./ReactSelect.jsx');

if(module.hot) {
    module.hot.accept('./ReactSelect.jsx', function() {

        var ReactSelect = require('./ReactSelect.jsx');
        
        core.injector.revoke(ReactSelect.name);
        core.View(ReactSelect);
        core.emit('hotUpdate');
        
    });
}