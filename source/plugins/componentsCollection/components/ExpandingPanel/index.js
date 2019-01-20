
module.exports = require('./ExpandingPanel.jsx');

if(module.hot) {
    module.hot.accept('./ExpandingPanel.jsx', function() {

        var ExpandingPanel = require('./ExpandingPanel.jsx');
        
        core.injector.revoke(ExpandingPanel.name);
        core.Component(ExpandingPanel);
        core.emit('hotUpdate');
        
    });
}