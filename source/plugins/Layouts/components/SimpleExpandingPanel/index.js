module.exports = require('./SimpleExpandingPanel.jsx');

if(module.hot) {
    module.hot.accept('./SimpleExpandingPanel.jsx', function() {

        var SimpleExpandingPanel = require('./SimpleExpandingPanel.jsx');

        core.injector.revoke(SimpleExpandingPanel.name);
        core.View(SimpleExpandingPanel);
        core.emit('hotUpdate');

    });
}