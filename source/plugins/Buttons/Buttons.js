module.exports = {
    name: 'Buttons',
    
    components: [
        require('./components/Button'),
        require('./components/IconButton'),
        require('./components/IconMenu'),
        require('./components/Switch'),
    ], 

    init(definition, done) {

        var _options = {}

        done(_options);
    }
};
