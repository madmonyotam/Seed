
module.exports = require('./IconEditor.jsx');

if(module.hot) {
    module.hot.accept('./IconEditor.jsx', function() {

        var IconEditor = require('./IconEditor.jsx');

        core.injector.revoke(IconEditor.name);
        core.View(IconEditor);
        core.emit('hotUpdate');

    });
}
