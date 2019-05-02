module.exports = {
    name: 'Settings',
    tree: require('./tree.js'),
    // actions: [
    //     // require('./actions/...'), 
    // ],

    // modules: [ 
    //     // require('./modules/...')
    // ],

    components: [
      require('./components/menus/items'), 
      require('./components/menus/floating'), 
    ],
    views: [
      require('./views/root'), 
    ],

    init(definition, done) {
      var options = { };
      done(options);
    }
};
