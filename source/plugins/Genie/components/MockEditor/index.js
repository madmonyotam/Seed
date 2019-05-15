
module.exports = require('./MockEditor.jsx');

if(module.hot) {
    module.hot.accept('./MockEditor.jsx', function() {

        var MockEditor = require('./MockEditor.jsx');

        core.injector.revoke(MockEditor.name);
        core.View(MockEditor);
        core.emit('hotUpdate');

    });
}
