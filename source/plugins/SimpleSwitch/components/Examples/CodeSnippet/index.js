
module.exports = require('./CodeSnippet.jsx');

if(module.hot) {
    module.hot.accept('./CodeSnippet.jsx', function() {

        var CodeSnippet = require('./CodeSnippet.jsx');
        
        core.injector.revoke(CodeSnippet.name);
        core.View(CodeSnippet);
        core.emit('hotUpdate');
        
    });
}