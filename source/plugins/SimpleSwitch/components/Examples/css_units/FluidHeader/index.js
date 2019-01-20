
module.exports = require('./FluidHeader.jsx');

if(module.hot) {
    module.hot.accept('./FluidHeader.jsx', function() {

        var FluidHeader = require('./FluidHeader.jsx');
        
        core.injector.revoke(FluidHeader.name);
        core.Component(FluidHeader);
        core.emit('hotUpdate');
        
    });
}