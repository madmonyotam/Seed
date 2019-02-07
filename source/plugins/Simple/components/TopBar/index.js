
module.exports = require('./TopBar.jsx');

if(module.hot) {
    module.hot.accept('./TopBar.jsx', function() {

        var TopBar = require('./TopBar.jsx');
        
        core.injector.revoke(TopBar.name);
        core.Component(TopBar);
        core.emit('hotUpdate');
        
    });
}