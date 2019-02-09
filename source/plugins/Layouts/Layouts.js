module.exports = {
    name: 'Layouts',
    modules: [],

    components: [
        require('./components/Row'),
    ],
    examples: [
        require('./examples/RowEx')
    ],

    init(def, done){

    done({});
    }
};
