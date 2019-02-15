import { 
    isEmpty as _isEmpty
} from 'lodash';

module.exports = {
    name: 'Examples',
    dependencies: ['core.plugin.tree'],
    actions: [],
    modules: [
        require('./modules/ExampleHelper'),   
    ],
    components: [
        require('./components/ExampleWrapper'),
        require('./components/ControlWrapper'),
        require('./components/ComponentWrapper'),
        require('./components/CodeSnippet'),
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
                    examples[pluginKey][exampleKey] = seed.require(`${pluginKey}.${exampleKey}`); 
                }
            }
            
            return examples;
        }

    },

    init(def, done){

    done({});
    }
};
