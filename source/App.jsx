var React = require('react');
var ReactDom = require('react-dom');
var seed = require('seed');
import { HashRouter , Route } from "react-router-dom";


seed.CreatePlugins([
    
    require('./plugins/translate'),
    require('./plugins/request'),

    require('./plugins/settings'),
    
    require('./plugins/Layouts'),
    require('./plugins/Simple'),
    require('./plugins/popovers'),
    require('./plugins/gallery'),
    require('./plugins/widgetManager'),
    require('./plugins/snackbar'),
    require('./plugins/Examples'),
    
    require('./plugins/SimpleSwitch'),

]);

seed.require(['SimpleSwitch.Root'],
            (Root) => {

   
    let root = getRootWithRouter(Root);
    ReactDom.render( root, document.getElementById('app') );

})

function getRootWithRouter(Root) {
    let root = (props)=>{ return <Root tree={seed.tree} location={props.location.pathname} /> }

    return (
        <HashRouter>
            <Route path="/" render={root} />   
        </HashRouter>
    )
}