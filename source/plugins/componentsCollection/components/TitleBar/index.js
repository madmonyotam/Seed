
module.exports = require('./TitleBar.jsx');

if(module.hot) {
    module.hot.accept('./TitleBar.jsx', function() {

        var TitleBar = require('./TitleBar.jsx');
        
        core.injector.revoke(TitleBar.name);
        core.View(TitleBar);
        core.emit('hotUpdate');
        
    });
}