
module.exports = require('./CreateAndUpdateMonitoringPlan.jsx');

if(module.hot) {
    module.hot.accept('./CreateAndUpdateMonitoringPlan.jsx', function() {

        var CreateAndUpdateMonitoringPlan = require('./CreateAndUpdateMonitoringPlan.jsx');
        
        core.injector.revoke(CreateAndUpdateMonitoringPlan.name);
        core.View(CreateAndUpdateMonitoringPlan);
        core.emit('hotUpdate');
        
    });
}