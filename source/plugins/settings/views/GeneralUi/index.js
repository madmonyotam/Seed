
module.exports = require('./GeneralUi.jsx');

if(module.hot) {
    module.hot.accept('./GeneralUi.jsx', function() {

        var GeneralUi = require('./GeneralUi.jsx');

        core.injector.revoke(GeneralUi.name);
        core.View(GeneralUi);
        core.emit('hotUpdate');

    });
}
