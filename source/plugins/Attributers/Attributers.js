module.exports = {
    name: 'Attributers',

    components: [
        require('./components/Composer'),
        require('./components/Elevation'),
        require('./components/FileDownloader'),
        require('./components/Margin'),
        require('./components/Padding'),
    ],

    init(definition, done) {

        var _options = {}

        done(_options);
    }
};
