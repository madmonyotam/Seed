module.exports = {
    name: 'Calendar',
    dependencies: ['core.plugin.tree'],
    actions: [],
    modules: [],
    components: [
        require('./components/Calendar'),
        require('./components/DaysBar'),
    ],

    extend: {},

    init(def, done){
        
    done({});    
    }
};