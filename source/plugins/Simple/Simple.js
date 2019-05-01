module.exports = {
    name: 'Simple',
    dependencies: ['core.plugin.tree'],
    actions: [],
    modules: [
        require('./modules/Helper'),
    ],
    components: [
        require('./components/ExpandingPanel'),
        require('./components/TitleBar'),
        require('./components/NoResults'),
        require('./components/ActionButton'),
        require('./components/Badge'),
        require('./components/Loader'),
        require('./components/IconPopover'),
        require('./components/label'),
        require('./components/Icon'),
        require('./components/Drawer'),
    ],

    extend: {
    },

    init(def, done){
        
    done({});    
    }
};