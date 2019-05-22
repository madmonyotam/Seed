module.exports = {
    name: 'Calendar',
    dependencies: ['core.plugin.tree'],
    actions: [],
    modules: [],
    components: [
        require('./components/Calendar'),
    ],

    extend: {
    },

    init(def, done){
        
    done({});    
    }
};