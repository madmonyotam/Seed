module.exports = require('./CategoryItemEditor.jsx');

if(module.hot) {
    module.hot.accept('./CategoryItemEditor.jsx', function() {

        var CategoryItemEditor = require('./CategoryItemEditor.jsx');

        core.injector.revoke(CategoryItemEditor.name);
        core.View(CategoryItemEditor);
        core.emit('hotUpdate');

    });
}