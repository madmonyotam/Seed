var React = require('react');
var ReactDom = require('react-dom');
var seed = require('seed');

seed.CreatePlugings([
    
    require('./plugins/translate'),
    require('./plugins/request'),
    require('./plugins/router'),

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
    ReactDom.render(<Root tree={seed.tree} />, document.getElementById('app'))

})

// automatically require all files that contain a '.module.' pattern.
// core.injector.loadContext('SimpleSwitch', require.context('./', true, /.*\.module\./));

// core.plugin([
    
//     require('./plugins/translate'),
//     require('./plugins/request'),
//     require('./plugins/router'),

//     require('./plugins/access'),
//     require('./plugins/settings'),
//     require('./plugins/SimpleComponents'),
    
//     require('./plugins/componentsCollection'),
//     require('./plugins/popovers'),
//     require('./plugins/gallery'),
//     require('./plugins/widgetManager'),
//     require('./plugins/snackbar'),
//     require('./plugins/Examples'),
    
//     require('./plugins/SimpleSwitch'),
// ])

// core.require(['SimpleSwitch.Root'], (Root) => {
//     core.tree.commit();  // to prevent duplicate first render when Baobab updates

//     ReactDom.render(<Root />, document.getElementById('app'))
// });
