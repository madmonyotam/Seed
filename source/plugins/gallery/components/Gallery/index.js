
module.exports = require('./Gallery.jsx');

if(module.hot) {
    module.hot.accept('./Gallery.jsx', function() {

        var Gallery = require('./Gallery.jsx');
        
        core.injector.revoke(Gallery.name);
        core.Component(Gallery);
        core.emit('hotUpdate');
        
    });
}