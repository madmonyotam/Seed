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

        plugin.setModules(definition.modules,'modules'); 
        plugin.setModules(definition.actions,'actions'); 
        plugin.setModules(definition.views,'views'); 
        plugin.setModules(definition.components,'components'); 


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
        var plugin = this;
        var modules = array || [];

        modules.map((module)=>{
            var name = module.name;

            if(!module.name) return  console.error(`missing name for ${key}`);
            if( plugin.modules[name] || plugin.components[name] ||
                plugin.views[name] || plugin.actions[name] ){

                    return console.error(`duplicate declaration in plugin: ${name}`);
            }


            var name = module.name;
            plugin[key][name] = module;
        });
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
