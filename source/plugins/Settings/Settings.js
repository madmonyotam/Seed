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
      require('./components/menus/item'),
    ],
    views: [
      require('./views/root'),
      require('./views/editors/code.editor'),
    ],

    extend : {
      mergeConfig: (config, mongoConfig) => {
       let merged = {
         ...config,
         ...mongoConfig
       };
       return merged
     }
    },

    init(definition, done) {
      var seed = definition;

      var options = {

        setProjects: ( DefaultFiles ) => {
          console.debug({ DefaultFiles })
          seed.plugins.Settings.run('loadServerConfig')
              .then( (serverConfig) => {

                seed.tree.set(['plugins', 'access', 'serverConfig'], serverConfig.data);
                seed.plugins.Settings.set(['projects'], serverConfig.projects);
                // console.log('1: ',serverConfig);
                
                if (serverConfig.projectPath) {
                  seed.plugins.Settings.set(['currentProjectPath'], serverConfig.projectPath);
                }
              //  seed.emit('app:ready')
              })
        },



       };
      done(options);
    }
};
