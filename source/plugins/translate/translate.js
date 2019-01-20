module.exports = {
    name: 'translate',
    dependencies: ['core.plugin.tree'],

    tree: {
        dictionary: {}
    },

    modules: [
        require('./modules/Translate'),
    ],

    extend: {
        translate(key, defaultValue, args){
            return core.plugins.translate.modules.Translate.translate(key, defaultValue, args)
        }
    },

    init(def, done){
        
        var core = this;
        
        var translate = {
            
            load(language){
                this.set('language', language)
            },

            merge(merge){
                if(!core.isObject(merge)){
                    throw new Error(`translate.merge() expects an object, got ${ core.typeOf(merge) }`);
                }
                this.set('language', { ...this.get('language'), ...merge });
            }

        }

        done(translate);
    }
};