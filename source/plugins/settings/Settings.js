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
        require('./components/CategoryPopup'),
        require('./components/StemCell'),
    ],

    views: [
        require('./views/settings'),
        require('./views/ThemeEditor'),
        require('./views/IconEditor'),
        require('./views/CodeEditor'),
        require('./views/GeneralUi'),
        require('./views/PropsEditor'),
    ],

    init(definition, done) {

        var _options = {

          BaseApi: 'http://some.ip.for/api',

          getInitialFiles: (callback) => {
            core.plugins.Settings.run('loadSettings').then(( data )=>{
              let { config, menu } = data;

              if (menu) {
                core.plugins.Settings.set(['fileMenu'], menu)
              }

              if (config) {
                core.plugins.Settings.set(['config'], config);
                for (let x in config) {
                  core.plugins.access.set([x], config[x])
                }
                if (callback) callback()
              } else if (callback) callback()
            })
          },

        };

        done(_options);
    }
};
