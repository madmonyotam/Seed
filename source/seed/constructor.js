var SimplePlugin = require('./simplePlugin');
var createReactClass = require('create-react-class');

import { branch } from 'baobab-react/mixins';
import PropTypes from 'prop-types'
import React from 'react'

var imports = {
    React: React,
    PropTypes: PropTypes,
    Branch: branch
}

class Seed {
    constructor(options = {}) {

        var seed = this;

        window.seed = seed;
        seed.name = options.name || 'seed';
        seed.events = {};
        seed.components = {};
        seed.modules = {};

        seed.plugins = {};
        seed.CreatePlugins(options.plugins);

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

    CreatePlugins(plugins){
        var seed = this;
        plugins ? plugins.map(plugin => seed.plugin(plugin)) : [];
    };

    plugin(plugin) {
        var seed = this;

        if(!plugin.name) return console.error('missing plugin name');

        if(plugin.extend){ seed.extend(plugin.extend) }
        seed.plugins[plugin.name] = new SimplePlugin(plugin,seed);
    };

    getComponent(plugin,component){
        var seed = this;

        var currentPlugin = seed.plugins[plugin];
        var found = currentPlugin.components[component];

        found = !seed.isUndefined(found) ? found : currentPlugin.views[component];
        found = !seed.isUndefined(found) ? found : currentPlugin.examples[component];
        return(found);
    };

    addToFinalDependencies(isComponent,found,depArray,dependencies){
        let seed = this;

        if(!isComponent){
            if(seed.modules[found.name]){
                return depArray.push(seed.modules[found.name]);            
            } else {
                var module = found.get.apply(seed,dependencies);
                seed.modules[found.name] = module;
                return depArray.push( found.get.apply(seed,dependencies));
            }
        } 

        if(seed.components[found.name]){
            depArray.push( seed.components[found.name] );
        } else {
            var component = createReactClass({displayName: found.name, ...found.get.apply(seed,dependencies)});
            seed.components[found.name] = component;
            depArray.push( component );
        }
    };

    require(dependencies, cb){

        var seed = this;
        var depArray = [];

        dependencies = seed.isString( dependencies ) ? [dependencies] : dependencies;
        
        dependencies.map((name)=>{
            var isComponent = false;
            var plugin = name.split('.')[0];
            var module = name.split('.')[1];

            if(!seed.plugins[plugin]){
                console.error(`no such plugin ${plugin}`)
            }
            
            var found = seed.plugins[plugin].modules[module];
            
            if(seed.isUndefined(found)){
                var found = this.getComponent(plugin,module);
                isComponent = true;
            }
            if(!found){
                console.error(`no such module ${module}`)
            }
            if(seed.isArray(found.dependencies) && found.dependencies.length){
                seed.require(found.dependencies,function() {
                    seed.addToFinalDependencies(isComponent,found,depArray,arguments)
                });
            } else {
                seed.addToFinalDependencies(isComponent,found,depArray)
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
