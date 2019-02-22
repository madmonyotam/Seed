
module.exports = require('./MongoUI.jsx');

if(module.hot) {
    module.hot.accept('./MongoUI.jsx', function() {

        var MongoUI = require('./MongoUI.jsx');

        core.injector.revoke(MongoUI.name);
        core.View(MongoUI);
        core.emit('hotUpdate');

    });
}
