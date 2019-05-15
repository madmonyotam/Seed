module.exports = require('./MockTable.jsx');

if(module.hot) {
    module.hot.accept('./MockTable.jsx', function() {

        var MockTable = require('./MockTable.jsx');

        core.injector.revoke(MockTable.name);
        core.View(MockTable);
        core.emit('hotUpdate');

    });
}