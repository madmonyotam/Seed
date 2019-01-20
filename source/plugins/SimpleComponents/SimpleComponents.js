module.exports = {
    name: 'SimpleComponents',
    dependencies: ['core.plugin.tree'],
    actions: [],
    modules: [],
    components: [
        require('./components/Component'),
        require('./components/SimpleLoader')
    ],

    extend: {
    },

    init(def, done){
        
    done({});    
    }
};