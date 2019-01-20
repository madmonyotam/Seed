module.exports = {
    name: 'Examples',
    dependencies: ['core.plugin.tree'],
    actions: [],
    modules: [],
    components: [
        require('./components/ExampleWrapper'),
        require('./components/ControlWrapper'),
        require('./components/ComponentWrapper')
    ],

    extend: {
    },

    init(def, done){

    done({});
    }
};
