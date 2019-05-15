
module.exports = require('./CategoryItem.jsx');

if(module.hot) {
    module.hot.accept('./CategoryItem.jsx', function() {

        var CategoryItem = require('./CategoryItem.jsx');

        core.injector.revoke(CategoryItem.name);
        core.View(CategoryItem);
        core.emit('hotUpdate');

    });
}
