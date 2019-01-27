
module.exports = require('./OpenLightboxGalleryExample.jsx');

if(module.hot) {
    module.hot.accept('./OpenLightboxGalleryExample.jsx', function() {

        var OpenLightboxGalleryExample = require('./OpenLightboxGalleryExample.jsx');
        
        core.injector.revoke(OpenLightboxGalleryExample.name);
        core.View(OpenLightboxGalleryExample);
        core.emit('hotUpdate');
        
    });
}