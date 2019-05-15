
module.exports = require('./Libraries.jsx');

if(module.hot) {
    module.hot.accept('./Libraries.jsx', function() {

        var Libraries = require('./Libraries.jsx');

        core.injector.revoke(Libraries.name);
        core.View(Libraries);
        core.emit('hotUpdate');

    });
}
