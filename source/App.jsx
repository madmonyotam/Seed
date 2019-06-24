var React = require('react');
var ReactDom = require('react-dom');
import Seed from 'simple-seed';
import { HashRouter , Route } from "react-router-dom";
// const path = require('path')
Seed.getInitialFiles( (DefaultFiles) => {
    Seed.setConfiguration(DefaultFiles.config);

    loadUiPlugins();
    Seed.plugins.Settings.setProjects( DefaultFiles, loadCurrentProject );

    loadCurrentProject()
});

function renderDOM() {
  Seed.require(['Project.Root'], (Root) => {
    let root = getRootWithRouter(Root);
    ReactDom.render( root, document.getElementById('app') );
  })
}

function loadCurrentProject() {
  /*
  // TODO:
      move to server action
        let serverConfig = Seed.plugins.access.get('serverConfig')

        console.debug('[serverConfig] ', serverConfig)
        let defaultProject = serverConfig.projects.default;
        let { projectPath } =  serverConfig.projects[defaultProject];
        let ppath = projectPath.split(':')[1];
        let dirname = path.dirname(ppath);
        let basename = path.basename(ppath);
        let extname = path.extname(ppath);
        console.debug('[path normalize] ', path.normalize(ppath))
        console.debug('[path relative] ', path.relative( ppath, __dirname))
        console.debug('[path resolve] ', path.resolve( ppath))
        let fullPath = path.relative( ppath, __dirname) + path.normalize(ppath)
        console.debug({dirname, basename, extname, fullPath })


        // console.log('currentProject -', currentProject  )
// console.log('TEST ]]', require(dirname+'/'+basename))
        // console.log('projectPath -', projectPath.split(':')[1])
        */

        let currentProject = require('./plugins/Project')
        Seed.CreatePlugins([
          currentProject
        ]);
        renderDOM()
}

function loadUiPlugins() {

      // let serverConfig = Seed.plugins.access.get()
      // console.debug('[serverConfig] ', serverConfig)
      //
    // let currentProject = require('./plugins/Project')

    Seed.CreatePlugins([
        require('./plugins/Attributers'),
        require('./plugins/Buttons'),
        require('./plugins/Calendar'),
        require('./plugins/Decorators'),
        require('./plugins/Examples'),
        require('./plugins/Genie'),
        require('./plugins/Inputs'),
        require('./plugins/Layouts'),
        require('./plugins/mongo'),
        require('./plugins/Navigation'),
        require('./plugins/popovers'),
        require('./plugins/Settings'),
        require('./plugins/Simple'),
        require('./plugins/translate'),
        // currentProject,
    ]);
}

function getRootWithRouter(Root) {
    let root = (props) => {
      return <Root tree={Seed.tree} location={props.location.pathname} />
    }

    return (
        <HashRouter>
            <Route path="/" render={root} />
        </HashRouter>
    )
}

// seed.request.post('/selectServerConfig', {
//     configPath: serverConfig.projects[0].root,
//     configName: serverConfig.projects[0].name
//   }).then( ({ response, results, error }) => {
//     console.log(response);
//   })
