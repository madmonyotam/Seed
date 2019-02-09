module.exports = {
    name: 'Layouts',
    modules: [],

    components: [
        require('./components/Row'),
        require('./components/Column')
    ],
    examples: [
        require('./examples/RowEx'),
        require('./examples/ColumnEx')
    ],

    init(def, done){

    done({});
    }
};
