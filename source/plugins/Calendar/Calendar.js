module.exports = {
    name: 'Calendar',
    dependencies: ['core.plugin.tree'],
    actions: [],
    modules: [],
    components: [
        require('./components/Calendar'),
        require('./components/DaysBar'),
        require('./components/DaySelect'),
        require('./components/Day'),
        require('./components/YearSelect'),
        require('./components/MonthPicker'),
        require('./components/DatePicker'),
    ],

    config: {
        theme: {
            calendar: {
                "text": "colors.dark",
                "textSelected": "colors.white",
                "textOutOfMonth": "colors.grey050"
            }
        }
    },

    extend: {},

    init(def, done){
        
    done({});    
    }
};