module.exports = {
    name: 'Decorators',

    components: [
        require('./components/Popover'),
        require('./components/Ripple'),
        require('./components/Tooltip'),
    ],

    init(definition, done) {

        var _options = {}

        done(_options);
    }
};
