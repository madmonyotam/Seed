
module.exports = require('./Nav.jsx');

if(module.hot) {
    module.hot.accept('./Nav.jsx', function() {

        var Nav = require('./Nav.jsx');
        
        core.injector.revoke(Nav.name);
        core.Component(Nav);
        core.emit('hotUpdate');
        
    });
}