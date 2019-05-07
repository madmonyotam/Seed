module.exports = {
    name: 'Inputs',
    
    components: [
        require('./components/Input'),
        require('./components/Button'),
    ], 

    init(definition, done) {

        var _options = {}

        done(_options);
    }
};
