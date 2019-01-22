var SimplePlugin = require('./simplePlugin');

class Seed {
    constructor(options = {}) {

        var seed = this;

        window.seed = seed;
        seed.name = options.name || 'seed';
        seed.events = {};

        seed.plugins = {};
        seed.CreatePlugings(options.plugins);
        
        if(options.extend){ seed.extend(options.extend) }
    };
 
    typeOf(thing){
        var toString = Object.prototype.toString;
        var type = toString.call(thing);
        return type.substring(8, type.length -1).toLowerCase();

    };

    isUndefined(v){ return this.typeOf(v) === 'undefined'; };
    isBoolean(v){ return this.typeOf(v) === 'boolean'; };
    isNumber(v){ return this.typeOf(v) === 'number'; };
    isString(v){ return this.typeOf(v) === 'string'; };
    isDate(v){ return this.typeOf(v) === 'date'; };
    isArray(v){ return this.typeOf(v) === 'array'; };
    isObject(v){ return this.typeOf(v) === 'object'; };
    isFunction(v){ return this.typeOf(v) === 'function'; };

    extend(extendObject){
        var seed = this;

        for (const key in extendObject) {
                seed[key] = extendObject[key]
        }
    }; 

    CreatePlugings(plugins){
        var seed = this;
        plugins ? plugins.map(plugin => seed.plugin(plugin)) : [];
    };

    plugin(plugin) {
        var seed = this;

        if(!plugin.name) return console.error('missing plugin name');

        if(plugin.extend){ seed.extend(plugin.extend) }
        seed.plugins[plugin.name] = new SimplePlugin(plugin,seed);
    };

    require(dependencies, cb){
        var seed = this;
        var depArray = [];

        dependencies.map((name)=>{
            var plugin = name.split('.')[0];
            var module = name.split('.')[1];

            var found = seed.plugins[plugin].modules[module];
            var foundDependencies = seed.plugins[plugin].modules[module].dependencies;
            
            if(seed.isArray(foundDependencies) && foundDependencies.length){
               
                seed.require(foundDependencies,function() {
                    depArray.push( found.get.apply(seed,arguments) );
                });

            } else {
                depArray.push( found.get.apply(seed) );
            }
            
        })

        if (cb) cb.apply(seed,depArray);
    }

}

module.exports = Seed
