
module.exports = require('./CountrySelect.jsx');

if(module.hot) {
    module.hot.accept('./CountrySelect.jsx', function() {

        var CountrySelect = require('./CountrySelect.jsx');
        
        core.injector.revoke(CountrySelect.name);
        core.View(CountrySelect);
        core.emit('hotUpdate');
        
    });
}