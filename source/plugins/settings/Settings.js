module.exports = {
    name: 'Settings',
    tree: require('./tree.js'),
    actions: [
      require('./actions/saveSettings'),
      require('./actions/loadSettings'),
      require('./actions/saveFile'),
      require('./actions/loadFile'),
    ],

    modules: [

    ],

    components: [
        require('./components/ColorBox'),
        require('./components/ColorPicker'),
        require('./components/SavePopup'),
        require('./components/CategoryPopup')
    ],

    views: [
        require('./views/settings'),
        require('./views/ThemeEditor'),
        require('./views/IconEditor'),
        require('./views/CodeEditor'),
        require('./views/GeneralUi')
    ],

    init(definition, done) {
      var core = definition;

    //    var _options = {

          // getInitialFiles: (callback) => {
          //   core.plugins.Settings.run('loadSettings').then(( data )=>{
          //     let { config, menu } = data;

          //     if (menu) {
          //       core.plugins.Settings.set(['fileMenu'], menu)
          //     }

          //     if (config) {
          //       core.plugins.Settings.set(['config'], config);
          //       for (let x in config) {
          //         core.plugins.access.set([x], config[x])
          //       }
          //       if (callback) callback()
          //     } else if (callback) callback()
          //   })
          // },

   //     };

        var _options = {

          setAccessToSettings: () => {
            let config = core.tree.get(['plugins', 'access', 'config']); 
            let fileMenu = core.tree.get(['plugins', 'access', 'fileMenu']); 

            core.plugins.Settings.set(['config'], config);
            core.plugins.Settings.set(['fileMenu'], fileMenu);
          } 
        };

        done(_options);
    }
};
