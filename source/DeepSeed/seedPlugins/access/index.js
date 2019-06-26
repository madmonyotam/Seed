module.exports = {
    name: 'access',
    tree: {
        icons:{},
        theme:{},
        dimensions:{},
        general:{},
        genie:{}
    },

    actions: [
        require('./loadSettings')
    ],

    extend: {

        get(type, path) {
            return get(this, type, path);
        },
        
        dim(path) {
            return get(this,'dimensions',path);
        },

        icons(path) {
            return get(this,'icons',path);
        },
        
        theme(path) {
            let code = get(this,'theme',path);

            if ( seed.isUndefined(code) || seed.isObject(code) ) { 
                return code;
            } 
            if ( seed.isString(code) && (code.includes(' ') || code.startsWith('#')) ) {
              return code;
            } 

            return this.theme(code);
        },
        
        general(path) {
            return get(this,'general',path);
        },

        setSystemDefaultConfig(next){
            let systemConfig = require('./config');
            addToConfig(this,systemConfig);
            setTimeout(next);
        },
        
        getInitialFiles(callback) {
            this.plugins.access.run('loadSettings').then(( data ) => {
                    let { menu } = data;
                        
                    if (menu) { this.plugins.access.set(['fileMenu'], menu); };

                    if (callback) { callback(data); };
            }).catch(console.error)
        },

        setConfiguration(config) {

            if (config) { 
              addToConfig(this,config) 
              this.plugins.access.set('config', config); 
            }
        },

        enrichConfig(pluginConfig){
            let systemConfig = seed.plugins.access.get(['system']); 
            let margedConfig = mergeDeep(systemConfig,pluginConfig)
            seed.plugins.access.set(['system'], margedConfig); 
        }

    }
};

function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

function mergeDeep(target, source) {
    
    var innerTarget = JSON.parse( JSON.stringify(target) );
    if (!source) return innerTarget;
  
    if (isObject(innerTarget) && isObject(source)) {
      for (const key in source) {

        if (isObject(source[key])) {
          if (!innerTarget[key]) Object.assign(innerTarget, { [key]: {} });
          innerTarget[key] = mergeDeep(innerTarget[key], source[key]);
        } else {
          Object.assign(innerTarget, { [key]: source[key] });
        }

      }
    }

    return innerTarget;
}

function addToConfig(seed,config) {
    for (let x in config) { 
        seed.plugins.access.set(['system',x], config[x]); 
    };
}

function get(seed, type, path) {
    
    var data = seed.plugins.access.select(type);
    if (!path) return data.get();
    if (seed.isString(path)) {
        path = path.split(/[\.,\/]/);
    }
    var value = data.get(path);

    if(seed.isUndefined(value)){
        data = seed.plugins.access.select(['system',type]);
        value = data.get(path);
    }

    return value 
};
