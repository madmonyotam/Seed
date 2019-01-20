
module.exports = require('./ColorBox.jsx');

if(module.hot) {
    module.hot.accept('./ColorBox.jsx', function() {

        var ColorBox = require('./ColorBox.jsx');

        core.injector.revoke(ColorBox.name);
        core.View(ColorBox);
        core.emit('hotUpdate');

    });
}
