
module.exports = require('./CategoryDetails.jsx');

if(module.hot) {
    module.hot.accept('./CategoryDetails.jsx', function() {

        var CategoryDetails = require('./CategoryDetails.jsx');

        core.injector.revoke(CategoryDetails.name);
        core.View(CategoryDetails);
        core.emit('hotUpdate');

    });
}
