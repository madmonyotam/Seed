
module.exports = require('./MenuTitleBar.jsx');

if(module.hot) {
    module.hot.accept('./MenuTitleBar.jsx', function() {

        var MenuTitleBar = require('./MenuTitleBar.jsx');

        core.injector.revoke(MenuTitleBar.name);
        core.View(MenuTitleBar);
        core.emit('hotUpdate');

    });
}
