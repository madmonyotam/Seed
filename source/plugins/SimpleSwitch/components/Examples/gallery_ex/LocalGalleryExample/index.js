
module.exports = require('./LocalGalleryExample.jsx');

if(module.hot) {
    module.hot.accept('./LocalGalleryExample.jsx', function() {

        var LocalGalleryExample = require('./LocalGalleryExample.jsx');
        
        core.injector.revoke(LocalGalleryExample.name);
        core.View(LocalGalleryExample);
        core.emit('hotUpdate');
        
    });
}