module.exports = {
    name: 'Calendar',
    dependencies: ['core.plugin.tree'],
    actions: [],
    modules: [],
    components: [
        require('./components/Calendar'),
        require('./components/DaysBar'),
        require('./components/YearSelect'),
        require('./components/MonthPicker'),
    ],

    extend: {},

    init(def, done){
        
    done({});    
    }
};