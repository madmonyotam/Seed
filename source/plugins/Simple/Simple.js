module.exports = {
    name: 'Simple',
    dependencies: ['core.plugin.tree'],
    actions: [],

    components: [
        require('./components/ActionButton'),
        require('./components/Badge'),
        require('./components/Chip'),
        require('./components/ExpandingPanel'),
        require('./components/Icon'),
        require('./components/IconPopover'),
        require('./components/Label'),
        require('./components/Loader'),
        require('./components/NoResults'),
        require('./components/TitleBar'),
    ],
    modules: [
        require('./modules/Helper'),
    ],
    extend: {
    },

    init(def, done){
        
    done({});    
    }
};