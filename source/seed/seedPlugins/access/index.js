module.exports = {
    name: 'access',
    tree: {
        icons:{},
        theme:{},
        dim:{},
        general:{},
    },
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
            return get(this,'theme',path);
        },

        general(path) {
            return get(this,'general',path);
        }
        
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
