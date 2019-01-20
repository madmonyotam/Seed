
module.exports = require('./Thumbnails.jsx');

if(module.hot) {
    module.hot.accept('./Thumbnails.jsx', function() {

        var Thumbnails = require('./Thumbnails.jsx');
        
        core.injector.revoke(Thumbnails.name);
        core.Component(Thumbnails);
        core.emit('hotUpdate');
        
    });
}