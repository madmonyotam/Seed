
module.exports = require('./Widget.jsx');

if(module.hot) {
    module.hot.accept('./Widget.jsx', function() {

        var Widget = require('./Widget.jsx');
        
        core.injector.revoke(Widget.name);
        core.Component(Widget);
        core.emit('hotUpdate');
        
    });
}