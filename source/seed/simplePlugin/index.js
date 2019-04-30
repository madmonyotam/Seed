class SimplePlugin {
    constructor(definition, seed) {

        var plugin = this;
        plugin.seed = seed;

        plugin.name = definition.name;
        plugin.tree = definition.tree;

        plugin.modules = {};
        plugin.views = {};
        plugin.components = {};
        plugin.actions = {};
        plugin.examples = {};

        plugin.setModules(definition.modules,'modules'); 
        plugin.setModules(definition.actions,'actions'); 
        plugin.setModules(definition.views,'views'); 
        plugin.setModules(definition.components,'components'); 
        plugin.setModules(definition.examples,'examples'); 


        plugin.pluginInit(seed,definition);
    }

    pluginInit(seed,definition){
        let plugin = this;

        if (definition.init) { definition.init(seed,(extendObject)=>{ plugin.extendsPlugin(plugin,extendObject) }) }
        if (plugin.tree) { plugin.extendsTree(seed) }
    }

    extendsPlugin(plugin,extendObject){

        for (const key in extendObject) {
            plugin[key] = extendObject[key]
        }
    }

    extendsTree(seed){
        let plugin = this;

        function get(name, path) {
            if(!path){ path = []; }
            if (!seed.isArray(path)) {
                path = [path];
            }
            var p = ['plugins', name].concat(path);
            return seed.tree.get(p);
        }

        function set(name, path, value) {
            if(!path) { path = []; }
            if (!seed.isArray(path)) {
                path = [path];
            }
            return seed.tree.set(['plugins', name].concat(path), value);
        }
        
        function select(name, path) {
            if(!path) { path = []; }
            if (!seed.isArray(path)) {
                path = [path];
            }
            return seed.tree.select(['plugins', name].concat(path));
        }

        var name = plugin.name;

        plugin.set = set.bind(seed, name);
        plugin.get = get.bind(seed, name);
        plugin.select = select.bind(seed, name);
        seed.tree.set(['plugins', name], plugin.tree);

    }

    setModules(array,key){
        let plugin = this;
        let modules = array || [];

        modules.map((module)=>{
            let name = module.name;

            if(!module.name) return  console.error(`missing name for ${key}`);
            if( plugin.modules[name] || plugin.components[name] ||
                plugin.views[name] || plugin.actions[name] || plugin.examples[name] ){

                    return console.error(`duplicate declaration in plugin: ${name}`);
            }

            plugin[key][name] = module;
            let component = module.component;
            if(component){
                component.name = module.name;
                plugin[key][name] = component;
            }

            if(module.example) this.getExampleFromComponent(module) 
        });
    }

    getExampleFromComponent(module){
        let { example, description, name, component } = module;
        let dependencies = component.dependencies;
        let plugin = this;

        const initExample = (ex) => {
          ex.info={};
          ex.info.description = description;
          ex.info.dependencies = dependencies;
          ex.info.name = ex.name || name;
          ex.name = ex.name || `${name}Example`;
          
          plugin.examples[ex.name] = ex;
        }

        if (Array.isArray(example)) {
          let examples = example;
          examples.map( initExample ) 
        } else initExample(example)
    }
    
    run(actionName, data = {}){
        var plugin = this;
        var action = plugin.actions[actionName];
        var finalAction;

        plugin.seed.require(action.dependencies,function(){
            finalAction = action.get.apply(plugin.seed,arguments);
        });

        var promiseForAction = new Promise((resolve,reject)=>{
            finalAction.call(plugin.seed,data,{resolve,reject});
        })
        
        return promiseForAction;
    }


}

module.exports = SimplePlugin;
