var seed = require('./constructor.js');

var yourSeed = new seed({
    plugins: [
        require('./seedPlugins/Tree'),
        require('./seedPlugins/SimpleEmit'),
    ],
    extend: {
        extendSelf: 'simple',
        simple: (a,b)=>{
            console.log(a,b);
        }
    }
});

module.exports = yourSeed;