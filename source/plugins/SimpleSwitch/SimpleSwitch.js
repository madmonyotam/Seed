module.exports = {
    name: 'SimpleSwitch',
    tree: require('./tree.js'),
    actions: [
        require('./actions/getLanguage'),
        require('./actions/logIn'),
        require('./actions/getDataEx'),
    ],
    modules: [
        require('./modules/Helper'),
        require('./modules/rules'),

        require('./modules/dataModels/DataModelsEntry'),
        require('./modules/dataModels/constructors/Basic'),
        require('./modules/dataModels/constructors/ExtandBasic'),

    ],
    components: [
        require('./components/Nav'),
        require('./components/NestedMenu'),
        require('./components/Component'),
        require('./components/ReactSelect'),
        require('./components/ButtonEx'), 
    ],
    views: [
        require('./views/login'),
        require('./views/root'),
        require('./views/home'),
        require('./views/MainRouter')
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
