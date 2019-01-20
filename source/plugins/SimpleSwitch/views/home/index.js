
module.exports = require('./Home.jsx');

if(module.hot) {
    module.hot.accept('./Home.jsx', function() {

        var Home = require('./Home.jsx');
        
        core.injector.revoke(Home.name);
        core.View(Home);
        core.emit('hotUpdate');
        
    });
}