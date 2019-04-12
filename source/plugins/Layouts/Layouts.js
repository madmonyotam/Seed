module.exports = {
    name: 'Layouts',
    modules: [],

    components: [
        require('./components/Absolute'),
        require('./components/Column'),
        require('./components/ExpandingPanel'),
        require('./components/LabeledComponent'),
        require('./components/Row'),
    ],

    init(def, done){

    done({});
    }
};
