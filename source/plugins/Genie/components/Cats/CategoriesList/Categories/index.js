
module.exports = require('./Categories.jsx');

if(module.hot) {
    module.hot.accept('./Categories.jsx', function() {

        var Categories = require('./Categories.jsx');

        core.injector.revoke(Categories.name);
        core.View(Categories);
        core.emit('hotUpdate');

    });
}
