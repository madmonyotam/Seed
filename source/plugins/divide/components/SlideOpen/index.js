
module.exports = require('./SlideOpen.jsx');

if(module.hot) {
    module.hot.accept('./SlideOpen.jsx', function() {

        var SlideOpen = require('./SlideOpen.jsx');
        
        core.injector.revoke(SlideOpen.name);
        core.Component(SlideOpen);
        core.emit('hotUpdate');
        
    });
}