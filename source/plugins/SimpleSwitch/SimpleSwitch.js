module.exports = {
    name: 'SimpleSwitch',
    tree: require('./tree.js'),
    actions: [
        require('./actions/getLanguage'),
        require('./actions/getDataEx'),
    ],
    modules: [
        require('./modules/Helper'),
        require('./modules/dataModels/DataModelsEntry'),
        require('./modules/dataModels/constructors/Basic'),
        require('./modules/dataModels/constructors/ExtandBasic'),

    ],
    components: [
        require('./components/Component'),
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
