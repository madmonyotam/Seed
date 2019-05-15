
module.exports = require('./SavePopup.jsx');

if(module.hot) {
    module.hot.accept('./SavePopup.jsx', function() {

        var SavePopup = require('./SavePopup.jsx');

        core.injector.revoke(SavePopup.name);
        core.View(SavePopup);
        core.emit('hotUpdate');

    });
}
