import { 
    isEmpty as _isEmpty
} from 'lodash';

module.exports = {
    name: 'Examples',
    tree: {},
    dependencies: ['core.plugin.tree'],
    actions: [],
    modules: [
        require('./modules/ExampleHelper'),   
    ],
    components: [
        require('./components/CodeSnippet'),
        require('./components/ComponentWrapper'),
        require('./components/ControlWrapper'),
        require('./components/ExampleMenuItem'),
        require('./components/ExampleWrapper'),
        require('./components/SimpleExample'),
        require('./components/SimpleToggle'),
    ],

    views: [
        require('./views/examples'),
    ],

    extend: {

        getExamples(){

            let seed = this;
            let examples = {};

            for (const pluginKey in seed.plugins) {
                let plugin = seed.plugins[pluginKey];
                if( _isEmpty(plugin.examples) ) continue;

                examples[pluginKey] = {};
                
                for (const exampleKey in plugin.examples) {
                    examples[pluginKey][exampleKey] = {};
                    examples[pluginKey][exampleKey].info = plugin.examples[exampleKey].info;
                    examples[pluginKey][exampleKey].component = seed.require(`${pluginKey}.${exampleKey}`); 
                }
            }
            
            return examples;
        }

    },

    init(def, done){

    done({});
    }
};
