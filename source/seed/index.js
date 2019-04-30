var seed = require('./constructor.js');
var componentMixin = require('./componentMixin')

var yourSeed = new seed({
    plugins: [
        require('./seedPlugins/request'),
        require('./seedPlugins/Tree'),
        require('./seedPlugins/SimpleEmit'),
        require('./seedPlugins/access'),
    ],
    extend: {
        extendSelf: 'simple',
        simple: (a,b)=>{
            console.log(a,b);
        }
    }
});

yourSeed.imports.ComponentMixin = componentMixin(yourSeed);
module.exports = yourSeed;