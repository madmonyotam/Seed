var React = require('react');
var ReactDom = require('react-dom');
var seed = require('seed');
import { HashRouter , Route } from "react-router-dom";

seed.getInitialFiles( (DefaultFiles) => {

    seed.setConfiguration(DefaultFiles.config);
        
    loadUiPlugins();

    seed.require(['Project.Root'],
            (Root) => {
                let root = getRootWithRouter(Root);
                ReactDom.render( root, document.getElementById('app') );
            })

});


function loadUiPlugins() {

    seed.CreatePlugins([
        require('./plugins/translate'), 
        require('./plugins/Layouts'),
        require('./plugins/Simple'),
        require('./plugins/popovers'),
        require('./plugins/Examples'),
        require('./plugins/mongo'),
        require('./plugins/Inputs'),
        require('./plugins/Navigation'),
        require('./plugins/Project'),
        require('./plugins/Settings'),
        require('./plugins/Decorators'),
    
    ]);
}

function getRootWithRouter(Root) {
    let root = (props) => { 
      return <Root tree={seed.tree} location={props.location.pathname} /> 
    }

    return (
        <HashRouter>
            <Route path="/" render={root} />   
        </HashRouter>
    )
}


