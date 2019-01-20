
module.exports = require('./ScrollbarsAndVw.jsx');

if(module.hot) {
    module.hot.accept('./ScrollbarsAndVw.jsx', function() {

        var ScrollbarsAndVw = require('./ScrollbarsAndVw.jsx');
        
        core.injector.revoke(ScrollbarsAndVw.name);
        core.Component(ScrollbarsAndVw);
        core.emit('hotUpdate');
        
    });
}