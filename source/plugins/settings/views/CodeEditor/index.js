
module.exports = require('./CodeEditor.jsx');

if(module.hot) {
    module.hot.accept('./CodeEditor.jsx', function() {

        var CodeEditor = require('./CodeEditor.jsx');

        core.injector.revoke(CodeEditor.name);
        core.View(CodeEditor);
        core.emit('hotUpdate');

    });
}
