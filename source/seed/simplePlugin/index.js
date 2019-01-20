class SimplePlugin {
    constructor(definition, seed) {

        var plugin = this;

        plugin.name = definition.name;
        plugin.tree = definition.tree;

        plugin.modules = {};

        plugin.setModules(definition); 

        plugin.views = definition.views || [];
        plugin.components = definition.components || [];
        plugin.actions = definition.actions || [];

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
            if(!value) return console.error('no value to set');

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

    setModules(definition){
        var plugin = this;
        var modules = definition.modules || [];

        modules.map((module)=>{
            if(!module.name) return  new Error(`missing name for module`);
            if(plugin.modules[module.name]) return new Error(`duplicate declaration of plugin ${module.name}`);


            var name = module.name;
            plugin.modules[name] = module;
        });
    }

    // getModules(seed,modulesArray){
    //     var plugin = this;
    //     let found = [];

    //     let correntModules = modulesArray.map((moduleName)=>{
    //         var correntModule = plugin.modules[moduleName];
    //         if(correntModule){


    //             var dependencies = correntModule.dependencies;
    //             dependencies = seed.require(dependencies);
    //             return correntModule.get(dependencies);
    //         } 
    //     })
    // }


}

module.exports = SimplePlugin;
