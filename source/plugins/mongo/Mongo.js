module.exports = {
    name: 'Mongo',
    tree: require('./tree.js'),
    actions: [
      require('./actions/connect'),
      require('./actions/disconnect'),
      require('./actions/is_connected'),
      require('./actions/create_collection'),
      require('./actions/get_collections'),
      require('./actions/add'),
      require('./actions/find'),
    ],

    components: [
        require('./components/Toolbar'),
    ],

    modules: [
        require('./modules/Mixin'),
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
