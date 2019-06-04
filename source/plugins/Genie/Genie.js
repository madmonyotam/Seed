module.exports = {
    name: 'Genie',
    tree: require('./tree.js'),
    actions: [

    ],

    components: [
        require('./components/Cats/CategoryMoveRename'),
        require('./components/Cats/CategoryItemEditor'),
        require('./components/Cats/CategoriesList/Categories'),
        require('./components/Cats/CategoriesList/CategoryItem'),
        require('./components/Cats/CategoryDetails'),
        require('./components/Cats/MockTable'),

        require('./components/Libs/LibrariesList/Libraries'),
        require('./components/Libs/LibrariesList/LibraryItem'),

        require('./components/MenuTitleBar'),
        require('./components/MockEditor'),
        require('./components/SavePopup'),
    ],

    modules: [
        require('./modules/HelpersCentral/Helpers'),

        require('./modules/Generator'),
    ],

    views: [
        require('./views/GenieUi')
    ],

    init(definition, done) {
        var seed = definition;

        var _options = {
        };

        done(_options);
    }
};
