
module.exports = require('./Lightbox.jsx');

if(module.hot) {
    module.hot.accept('./Lightbox.jsx', function() {

        var Lightbox = require('./Lightbox.jsx');
        
        core.injector.revoke(Lightbox.name);
        core.Component(Lightbox);
        core.emit('hotUpdate');
        
    });
}