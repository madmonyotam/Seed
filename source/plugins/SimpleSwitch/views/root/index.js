
module.exports = require('./Root.jsx');

if(module.hot) {
    module.hot.accept('./Root.jsx', function() {

        var Root = require('./Root.jsx');
        
        core.injector.revoke(Root.name);
        core.View(Root);
        core.emit('hotUpdate');
        
    });
}