var SimplePlugin = require('./simplePlugin');
var createReactClass = require('create-react-class');

import PropTypes from 'prop-types'
import React from 'react'

var imports = {
    React: React,
    PropTypes: PropTypes
}

class Seed {
    constructor(options = {}) {

        var seed = this;

        window.seed = seed;
        seed.name = options.name || 'seed';
        seed.events = {};

        seed.plugins = {};
        seed.CreatePlugings(options.plugins);

        seed.imports = imports;
        
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

    getComponent(name){
        var seed = this;

        var plugin = name.split('.')[0];
        var component = name.split('.')[1];

        var correntPlugin = seed.plugins[plugin];

        var found = correntPlugin.components[component];
        found = !seed.isUndefined(found) ? found : correntPlugin.views[component];
        return(found);
    }

    require(dependencies, cb){

        var seed = this;
        var depArray = [];

        dependencies = seed.isString( dependencies ) ? [dependencies] : dependencies;
        
        dependencies.map((name)=>{
            var isComponent = false;
            var plugin = name.split('.')[0];
            var module = name.split('.')[1];

            if(!seed.plugins[plugin]){
                debugger
            }
            var found = seed.plugins[plugin].modules[module];
            
            if(seed.isUndefined(found)){
                var found = this.getComponent(name);
                isComponent = true;
            } 

            var foundDependencies = found.dependencies;
            
            if(seed.isArray(foundDependencies) && foundDependencies.length){

                seed.require(foundDependencies,function() {
                    if(!isComponent) return depArray.push( found.get.apply(seed,arguments));

                    var component = createReactClass( found.get.apply(seed,arguments) );
                    depArray.push( component );
                });

            } else {
                if(!isComponent) return depArray.push( found.get.apply(seed) );
             
                var component = createReactClass( found.get.apply(seed) );
                depArray.push( component );
            }
            
        })

        if (cb){
            cb.apply(seed,depArray);
        } else {
            return(depArray[0]);
        } 
    }

}

module.exports = Seed
