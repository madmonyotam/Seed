
module.exports = require('./Toolbar.jsx');

if(module.hot) {
    module.hot.accept('./Toolbar.jsx', function() {

        var Toolbar = require('./Toolbar.jsx');

        core.injector.revoke(Toolbar.name);
        core.View(Toolbar);
        core.emit('hotUpdate');

    });
}
