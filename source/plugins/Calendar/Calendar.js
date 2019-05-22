module.exports = {
    name: 'Calendar',
    dependencies: ['core.plugin.tree'],
    actions: [],
    modules: [],
    components: [
        require('./components/Calendar'),
        require('./components/DaysBar'),
        require('./components/YearSelect'),
    ],

    extend: {},

    init(def, done){
        
    done({});    
    }
};