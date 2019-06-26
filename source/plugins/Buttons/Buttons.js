module.exports = {
    name: 'Buttons',
    
    components: [
        require('./components/Button'),
        require('./components/IconButton'),
        require('./components/IconMenu'),
        require('./components/Switch'),
    ], 

    config: {
        theme: {
            buttons: {
                default: '#D8D8D8',
                primary: '#6B7ADD',
                secondary: '#DD6A6A',
            }
        }
    },

    init(definition, done) {

        var _options = {}

        done(_options);
    }
};
