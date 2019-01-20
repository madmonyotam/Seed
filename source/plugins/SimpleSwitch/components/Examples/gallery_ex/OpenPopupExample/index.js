
module.exports = require('./OpenPopupExample.jsx');

if(module.hot) {
    module.hot.accept('./OpenPopupExample.jsx', function() {

        var OpenPopupExample = require('./OpenPopupExample.jsx');
        
        core.injector.revoke(OpenPopupExample.name);
        core.View(OpenPopupExample);
        core.emit('hotUpdate');
        
    });
}