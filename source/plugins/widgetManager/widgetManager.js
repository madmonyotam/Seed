module.exports = {
    name: 'widgetManager',
    tree: require('./tree.js'),
    actions: [],
    modules: [],
    components: [
        require('./components/GridManager'),
        require('./components/Widget'),
    ],

    init(definition, done) {
        var _widgetManager = {};

        done(_widgetManager);
    }
};
