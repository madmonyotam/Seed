
module.exports = require('./EasyFullscreenPageScrollWithBackgroundReveal.jsx');

if(module.hot) {
    module.hot.accept('./EasyFullscreenPageScrollWithBackgroundReveal.jsx', function() {

        var EasyFullscreenPageScrollWithBackgroundReveal = require('./EasyFullscreenPageScrollWithBackgroundReveal.jsx');
        
        core.injector.revoke(EasyFullscreenPageScrollWithBackgroundReveal.name);
        core.Component(EasyFullscreenPageScrollWithBackgroundReveal);
        core.emit('hotUpdate');
        
    });
}