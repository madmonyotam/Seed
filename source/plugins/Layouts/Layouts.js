module.exports = {
    name: 'Layouts',
    modules: [],

    components: [
        require('./components/Absolute'),
        require('./components/Fixed'),
        require('./components/Center'),
        require('./components/Column'),
        require('./components/Divider'),
        require('./components/ExpandingPanel'),
        require('./components/LabeledComponent'),
        require('./components/Row'),
    ],

    init(def, done){

    done({});
    }
};
