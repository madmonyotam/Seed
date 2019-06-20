var React = require('react');
var ReactDom = require('react-dom');
import Seed from 'simple-seed';
import { HashRouter , Route } from "react-router-dom";

Seed.getInitialFiles( (DefaultFiles) => {

    Seed.setConfiguration(DefaultFiles.config);
        
    loadUiPlugins();

    Seed.require(['Project.Root'], (Root) => {

            let root = getRootWithRouter(Root);
            ReactDom.render( root, document.getElementById('app') );
    })

    Seed.plugins.Settings.setProjects( );        
});



function loadUiPlugins() {

    Seed.CreatePlugins([
        require('./plugins/Attributers'),
        require('./plugins/Calendar'),
        require('./plugins/Decorators'),
        require('./plugins/Examples'),
        require('./plugins/Genie'),
        require('./plugins/Inputs'),
        require('./plugins/Layouts'),
        require('./plugins/mongo'),
        require('./plugins/Navigation'),
        require('./plugins/popovers'),
        require('./plugins/Project'),
        require('./plugins/Settings'),
        require('./plugins/Simple'),
        require('./plugins/translate'),
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


