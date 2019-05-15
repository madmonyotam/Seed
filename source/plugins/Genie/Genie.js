module.exports = {
    name: 'Genie',
    tree: require('./tree.js'),
    actions: [

    ],

    components: [
        require('./components/Cats/CategoryEditModal'),
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
        require('./modules/HelpersCentral/MockUIHelpers'),

        require('./modules/Generator'),
    ],

    views: [
        require('./views/GenieUi')
    ],

    init(definition, done) {
        var core = definition;

        var _options = {

            setMock( data ){
                core.plugins.Settings.set(['config','genie'], data);
                setTimeout(()=>{core.emit('config:changed')}, 250);
            },

            getMock(){
               return  core.plugins.Settings.get(['config','genie']);
            }
        };

        done(_options);
    }
};
