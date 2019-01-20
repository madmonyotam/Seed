
module.exports = require('./ExampleWrapper.jsx');

if(module.hot) {
    module.hot.accept('./ExampleWrapper.jsx', function() {

        var ExampleWrapper = require('./ExampleWrapper.jsx');

        core.injector.revoke(ExampleWrapper.name);
        core.View(ExampleWrapper);
        core.emit('hotUpdate');

    });
}
