module.exports = require('./ButtonEx.jsx');

if(module.hot) {
    module.hot.accept('./ButtonEx.jsx', function() {

        var ButtonEx = require('./ButtonEx.jsx');

        core.injector.revoke(ButtonEx.name);
        core.View(ButtonEx);
        core.emit('hotUpdate');

    });
}