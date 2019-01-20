
module.exports = require('./settings.jsx');

if(module.hot) {
    module.hot.accept('./settings.jsx', function() {

        var settings = require('./settings.jsx');

        core.injector.revoke(settings.name);
        core.View(settings);
        core.emit('hotUpdate');

    });
}
