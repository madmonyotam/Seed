
module.exports = require('./PropsEditor.jsx');

if(module.hot) {
    module.hot.accept('./PropsEditor.jsx', function() {

        var PropsEditor = require('./PropsEditor.jsx');
        
        core.injector.revoke(PropsEditor.name);
        core.View(PropsEditor);
        core.emit('hotUpdate');
        
    });
}