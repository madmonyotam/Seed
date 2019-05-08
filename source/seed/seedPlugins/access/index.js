module.exports = {
    name: 'access',
    tree: {
        icons:{},
        theme:{},
        dim:{},
        general:{},
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
        
        getInitialFiles(callback) {
          this.plugins.access.run('loadSettings')
              .then(( data ) => {
                  let { menu } = data;
                    
                  if (menu) { this.plugins.access.set(['fileMenu'], menu); };

                  if (callback) { callback(data); };
              }).catch(console.error)
        },

        setConfiguration(config) {
            if (config) { 
              for (let x in config) { 
                  this.plugins.access.set([x], config[x]); 
              }; 

              this.plugins.access.set('config', config); 
            }
        },
        
    }
};

function get(seed, type, path) {
    
    var data = seed.plugins.access.select(type);
    if (!path) return data.get();
    if (seed.isString(path)) {
        path = path.split(/[\.,\/]/);
    }
    var value = data.get(path);
    return value 
};
