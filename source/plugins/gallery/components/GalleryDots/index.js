
module.exports = require('./GalleryDots.jsx');

if(module.hot) {
    module.hot.accept('./GalleryDots.jsx', function() {

        var GalleryDots = require('./GalleryDots.jsx');
        
        core.injector.revoke(GalleryDots.name);
        core.Component(GalleryDots);
        core.emit('hotUpdate');
        
    });
}