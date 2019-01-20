
module.exports = require('./PerfectlyFittingText.jsx');

if(module.hot) {
    module.hot.accept('./PerfectlyFittingText.jsx', function() {

        var PerfectlyFittingText = require('./PerfectlyFittingText.jsx');
        
        core.injector.revoke(PerfectlyFittingText.name);
        core.Component(PerfectlyFittingText);
        core.emit('hotUpdate');
        
    });
}