var React = require('react');
var ReactDom = require('react-dom');
var seed = require('seed');
import { HashRouter , Route } from "react-router-dom";

seed.getInitialFiles( (DefaultFiles) => {

    seed.setConfiguration(DefaultFiles.config);
        
    loadUiPlugins();
    seed.plugins.Settings.setAccessToSettings();

    seed.require(['SimpleSwitch.Root'],
            (Root) => {
                let root = getRootWithRouter(Root);
                ReactDom.render( root, document.getElementById('app') );
            })

});


function loadUiPlugins() {

    seed.CreatePlugins([
    
        require('./plugins/translate'),
        require('./plugins/settings'), 
        require('./plugins/Layouts'),
        require('./plugins/Simple'),
        require('./plugins/popovers'),
        require('./plugins/gallery'),
        require('./plugins/widgetManager'),
        require('./plugins/snackbar'),
        require('./plugins/Examples'),
        require('./plugins/mongo'),
        require('./plugins/SimpleSwitch'),
    
    ]);
}

function getRootWithRouter(Root) {
    let root = (props)=>{ return <Root tree={seed.tree} location={props.location.pathname} /> }

    return (
        <HashRouter>
            <Route path="/" render={root} />   
        </HashRouter>
    )
}


