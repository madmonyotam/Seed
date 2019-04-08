var seed = require('./constructor.js');

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

module.exports = yourSeed;