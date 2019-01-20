
module.exports = require('./NestedItem.jsx');

if(module.hot) {
    module.hot.accept('./NestedItem.jsx', function() {

        var NestedItem = require('./NestedItem.jsx');

        core.injector.revoke(NestedItem.name);
        core.View(NestedItem);
        core.emit('hotUpdate');

    });
}
