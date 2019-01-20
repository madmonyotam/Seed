
module.exports = require('./FullscreenSectionsExample.jsx');

if(module.hot) {
    module.hot.accept('./FullscreenSectionsExample.jsx', function() {

        var FullscreenSectionsExample = require('./FullscreenSectionsExample.jsx');
        
        core.injector.revoke(FullscreenSectionsExample.name);
        core.Component(FullscreenSectionsExample);
        core.emit('hotUpdate');
        
    });
}