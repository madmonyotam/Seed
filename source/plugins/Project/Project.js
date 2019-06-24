module.exports = {
    name: 'Project',
    tree: require('./tree.js'),
    actions: [
        require('./actions/getDataEx'),
        require('./actions/getLanguage'),
    ],
    components: [
        require('./components/Component'),
    ],
    modules: [
        require('./modules/dataModels/constructors/Basic'),
        require('./modules/dataModels/constructors/ExtandBasic'),
        require('./modules/dataModels/DataModelsEntry'),

    ],
    views: [
        require('./views/Root'),
        require('./views/NewProject')
    ],

    extend: {
        hi: {
            you() {
                return 'shalom!'
            }
        },
        SimpleExtend: 'it works!'
    },

    init(definition, done) {
        var _simpleOptions = {
            BaseApi: 'http://some.ip.for/api'
        };

        done(_simpleOptions);
    }
};
