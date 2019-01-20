
module.exports = require('./NestedMenu.jsx');

if(module.hot) {
    module.hot.accept('./NestedMenu.jsx', function() {

        var NestedMenu = require('./NestedMenu.jsx');

        core.injector.revoke(NestedMenu.name);
        core.View(NestedMenu);
        core.emit('hotUpdate');

    });
}
