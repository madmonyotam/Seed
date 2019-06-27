module.exports = {
    name: 'Genie',
    tree: require('./tree.js'),
    actions: [

    ],

    components: [
        require('./components/Cats/CategoriesList/Categories'),
        require('./components/Cats/CategoriesList/CategoryItem'),
        require('./components/Cats/CategoryDetails'),
        require('./components/Cats/CategoryItemEditor'),
        require('./components/Cats/CategoryMoveRename'),
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

    config: {
        theme: {
            genie: {
                "white_bg": "colors.white",
                "title_bg": "colors.grey080",
                "lib_bg": "colors.blue055",
                "cat_bg":"colors.blue065",
                "button_text": "colors.black",
                "hover": "colors.blue070"
            }
        },
        icons: {
            genie: {
                "clear": "clear",
                "mongo": "cloud_upload",
                "save": "save",
                "generate": "play_arrow",
                "download": "fas fa-download",
                "code": "code",
                "create": "settings",
                "add": "add",
                "addCategory": "playlist_add",
                "addLibrary": "create_new_folder",
                "table": "view_comfy",
                "upload": "publish",
                "edit": "edit",
                "done": "done",
                "close": "close",
                "search": "search",
                "remove": "delete"
              },
        }
    },

    init(definition, done) {
        var seed = definition;

        var _options = {
        };

        done(_options);
    }
};
