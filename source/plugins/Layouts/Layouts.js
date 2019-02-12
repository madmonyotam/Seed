module.exports = {
    name: 'Layouts',
    modules: [],

    components: [
        require('./components/Row'),
        require('./components/Column'),
        require('./components/SimpleExpandingPanel')
    ],

    init(def, done){

    done({});
    }
};
