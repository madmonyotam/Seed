var React = require('react');
var ReactDom = require('react-dom');
var seed = require('seed');
import { HashRouter , Route } from "react-router-dom";


seed.CreatePlugings([
    
    require('./plugins/translate'),
    require('./plugins/request'),
 //   require('./plugins/router'),

    require('./plugins/access'),
    require('./plugins/settings'),
    require('./plugins/SimpleComponents'),
    
    require('./plugins/componentsCollection'),
    require('./plugins/popovers'),
    require('./plugins/gallery'),
    require('./plugins/widgetManager'),
    require('./plugins/snackbar'),
    require('./plugins/Examples'),
    
    require('./plugins/SimpleSwitch'),

]);

// console.log(seed);
// seed.simple('hi','you');
// console.log('s.hi.you() :', seed.hi.you());

seed.require(['SimpleSwitch.Helper','SimpleSwitch.ExtandBasic','SimpleSwitch.DataModelsEntry','SimpleSwitch.Root'],
            (Helper, ExtandBasic, DataModelsEntry,Root) => {

    // console.log('Helper: ',Helper);
    // console.log('ExtandBasic: ',ExtandBasic);
    // console.log('DataModelsEntry: ',DataModelsEntry);
    // DataModelsEntry.findConstructor({type:'ExtandBasic'})
  
    // seed.plugins.SimpleSwitch.run('getDataEx',{s:'111',a:'112'}).then((m)=>{
    //     console.log('asa: ',m);
    // }).catch((err)=>{
    //     console.log('mmm',err);

    
    // })
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