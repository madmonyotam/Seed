
module.exports = require('./OneItemGalleryExample.jsx');

if(module.hot) {
    module.hot.accept('./OneItemGalleryExample.jsx', function() {

        var OneItemGalleryExample = require('./OneItemGalleryExample.jsx');
        
        core.injector.revoke(OneItemGalleryExample.name);
        core.View(OneItemGalleryExample);
        core.emit('hotUpdate');
        
    });
}