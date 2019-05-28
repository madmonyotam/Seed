module.exports = {
    name: 'Decorators',

    components: [
        require('./components/Ripple'),
        require('./components/Tooltip'),
        require('./components/Popover'),
        require('./components/FileDownloader'),
    ],

    init(definition, done) {

        var _options = {}

        done(_options);
    }
};
