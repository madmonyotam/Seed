module.exports = {
    name: 'Mongo',
    tree: require('./tree.js'),
    actions: [
        require('./actions/add'),
        require('./actions/connect'),
        require('./actions/create_collection'),
        require('./actions/disconnect'),
        require('./actions/find'),
        require('./actions/get_collections'),
        require('./actions/is_connected'),
    ],

    components: [
        require('./components/Toolbar'),
    ],

    modules: [
        require('./modules/Handler'),
    ],

    views: [
        require('./views/MongoUI'),
    ],

    init(definition, done) {

        var _options = {}

        done(_options);
    }
};
