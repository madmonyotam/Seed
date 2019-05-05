module.exports = {
    name: 'Layouts',
    modules: [],

    components: [
        require('./components/Absolute'),
        require('./components/Center'),
        require('./components/Row'),
        require('./components/Column'),
        require('./components/ExpandingPanel'),
        require('./components/LabeledComponent'),
    ],

    init(def, done){

    done({});
    }
};
