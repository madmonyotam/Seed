module.exports = {
    name: 'Settings',
    tree: require('./tree.js'),
    actions: [
      require('./actions/load/file'),
      require('./actions/projects/loadServerConfig'),
      require('./actions/projects/selectServerConfig'),
      require('./actions/save/file'),
      require('./actions/save/settings'),
    ],
    components: [
      require('./components/menus/floating'),
      require('./components/menus/item'),
    ],
    
    // modules: [
      //     // require('./modules/...')
      // ],
      
      views: [
        require('./views/editors/code.editor'),
        require('./views/root'),
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

        setProjects: ( DefaultFiles, callback ) => {
          seed.plugins.Settings.run('loadServerConfig')
              .then( (serverConfig) => {

                seed.tree.set(['plugins', 'access', 'serverConfig'], serverConfig.data);
                seed.plugins.Settings.set(['projects'], serverConfig.projects);
                // console.log('1: ',serverConfig);

                if (serverConfig.projectPath) {
                  seed.plugins.Settings.set(['currentProjectPath'], serverConfig.projectPath);
                  if (callback) callback()
                } else if (callback) callback()

              //  seed.emit('app:ready')
              })
        },



       };
      done(options);
    }
};
