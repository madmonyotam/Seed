var React = require('react');
var ReactDom = require('react-dom');
var core = require('core.web');
var seed = require('seed');

seed.CreatePlugings([
    require('./plugins/SimpleSwitch')
]);

// console.log(seed);
// seed.simple('hi','you');
// console.log('s.hi.you() :', seed.hi.you());

seed.require(['SimpleSwitch.Helper','SimpleSwitch.ExtandBasic','SimpleSwitch.DataModelsEntry'],(Helper, ExtandBasic, DataModelsEntry) => {

    console.log('Helper: ',Helper);
    console.log('ExtandBasic: ',ExtandBasic);
    console.log('DataModelsEntry: ',DataModelsEntry);

    var a = DataModelsEntry.findConstructor({type:'ExtandBasic'})
    console.log(a);
})

// automatically require all files that contain a '.module.' pattern.
core.injector.loadContext('SimpleSwitch', require.context('./', true, /.*\.module\./));

core.plugin([
    
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
])

core.require(['SimpleSwitch.Root'], (Root) => {
    core.tree.commit();  // to prevent duplicate first render when Baobab updates
    ReactDom.render(<Root />, document.getElementById('app'))
});
