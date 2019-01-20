
module.exports = require('./MonitoringPlanPopUpExample.jsx');

if(module.hot) {
    module.hot.accept('./MonitoringPlanPopUpExample.jsx', function() {

        var MonitoringPlanPopUpExample = require('./MonitoringPlanPopUpExample.jsx');
        
        core.injector.revoke(MonitoringPlanPopUpExample.name);
        core.View(MonitoringPlanPopUpExample);
        core.emit('hotUpdate');
        
    });
}