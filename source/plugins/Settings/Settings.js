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
      require('./components/menus/floating'), 
    ],
    views: [
      require('./views/root'), 
      require('./views/editors/code.editor'), 
    ],

    init(definition, done) {
      var options = { };
      done(options);
    }
};