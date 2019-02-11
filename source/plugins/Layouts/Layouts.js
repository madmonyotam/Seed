module.exports = {
    name: 'Layouts',
    modules: [],

    components: [
        require('./components/Row'),
        require('./components/Column'),
        require('./components/SimpleExpandingPanel')
    ],
    examples: [
        require('./examples/RowEx'),
        require('./examples/ColumnEx'),
        require('./examples/ExpandingPanelEx')
    ],

    init(def, done){

    done({});
    }
};
