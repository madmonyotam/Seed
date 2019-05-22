module.exports = {
    name: 'Inputs',
    
    components: [
        require('./components/Button'),
        require('./components/IconButton'),
        require('./components/IconMenu'),
        require('./components/Input'),
        require('./components/Switch'),
        require('./components/Chip'),
    ], 

    init(definition, done) {

        var _options = {}

        done(_options);
    }
};
