
module.exports = require('./Router.jsx');

if(module.hot) {
    module.hot.accept('./Router.jsx', function() {

        var Router = require('./Router.jsx');
        
        core.injector.revoke(Router.name);
        core.View(Router);
        core.emit('hotUpdate');
        
    });
}