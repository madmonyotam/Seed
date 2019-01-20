
module.exports = require('./TitleBarExample.jsx');

if(module.hot) {
    module.hot.accept('./TitleBarExample.jsx', function() {

        var TitleBarExample = require('./TitleBarExample.jsx');
        
        core.injector.revoke(TitleBarExample.name);
        core.View(TitleBarExample);
        core.emit('hotUpdate');
        
    });
}