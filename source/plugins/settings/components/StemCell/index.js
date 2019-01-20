
module.exports = require('./StemCell.jsx');

if(module.hot) {
    module.hot.accept('./StemCell.jsx', function() {

        var StemCell = require('./StemCell.jsx');
        
        core.injector.revoke(StemCell.name);
        core.View(StemCell);
        core.emit('hotUpdate');
        
    });
}