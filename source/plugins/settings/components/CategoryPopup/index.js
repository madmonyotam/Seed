
module.exports = require('./CategoryPopup.jsx');

if(module.hot) {
    module.hot.accept('./CategoryPopup.jsx', function() {

        var CategoryPopup = require('./CategoryPopup.jsx');

        core.injector.revoke(CategoryPopup.name);
        core.View(CategoryPopup);
        core.emit('hotUpdate');

    });
}
