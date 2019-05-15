
module.exports = require('./LibraryItem.jsx');

if(module.hot) {
    module.hot.accept('./LibraryItem.jsx', function() {

        var LibraryItem = require('./LibraryItem.jsx');

        core.injector.revoke(LibraryItem.name);
        core.View(LibraryItem);
        core.emit('hotUpdate');

    });
}
