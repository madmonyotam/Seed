module.exports = {
    name: 'Layouts',
    modules: [],

    components: [
        require('./components/Row'),
        require('./components/Column'),
        require('./components/ExpandingPanel')
    ],

    init(def, done){

    done({});
    }
};
