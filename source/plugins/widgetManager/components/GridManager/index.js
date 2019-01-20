
module.exports = require('./GridManager.jsx');

if(module.hot) {
    module.hot.accept('./GridManager.jsx', function() {

        var GridManager = require('./GridManager.jsx');
        
        core.injector.revoke(GridManager.name);
        core.Component(GridManager);
        core.emit('hotUpdate');
        
    });
}