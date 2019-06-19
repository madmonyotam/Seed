module.exports = {
    name: 'Settings',
    tree: require('./tree.js'),
    actions: [
      require('./actions/save/file'), 
      require('./actions/save/settings'), 
      require('./actions/load/file'),
      require('./actions/projects/selectServerConfig'), 
      require('./actions/projects/loadServerConfig'), 
    ],

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
      var seed = definition;
      
      var options = {

        setProjects: ( ) => { 

          seed.plugins.Settings.run('loadServerConfig')
              .then( (serverConfig) => {
                seed.tree.set(['plugins', 'access', 'serverConfig'], serverConfig.data); 
                seed.plugins.Settings.set(['projects'], serverConfig.projects);
                // console.log('1: ',serverConfig);
              //  seed.emit('app:ready')
              })
        }

       };
      done(options);
    }
};
