
module.exports = require('./ThemeEditor.jsx');

if(module.hot) {
    module.hot.accept('./ThemeEditor.jsx', function() {

        var ThemeEditor = require('./ThemeEditor.jsx');

        core.injector.revoke(ThemeEditor.name);
        core.View(ThemeEditor);
        core.emit('hotUpdate');

    });
}
