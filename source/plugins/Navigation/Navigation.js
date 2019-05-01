module.exports = {
    name: 'Navigation',
    
    tree: require('./tree.js'),
    
    components: [
      require('./components/top')
    ], 

    views: [
      require('./views/MainRouter')
    ],

    init(definition, done) {

        var _options = {}

        done(_options);
    }
};
