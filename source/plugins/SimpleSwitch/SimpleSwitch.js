module.exports = {
    name: 'SimpleSwitch',
    tree: require('./tree.js'),
    actions: [
        require('./actions/getLanguage'),
        require('./actions/logIn'),
        require('./actions/getDataEx'),
    ],
    modules: [
        require('./modules/Mixin'),

        require('./modules/Helper'),
        require('./modules/rules'),

        require('./modules/dataModels/DataModelsEntry'),
        require('./modules/dataModels/constructors/Basic'),
        require('./modules/dataModels/constructors/ExtandBasic'),

    ],
    components: [
        require('./components/Nav'),
        require('./components/NestedMenu'),
        require('./components/Examples/css_units/FullscreenSectionsExample'),
        require('./components/Examples/css_units/PerfectlyFittingText'),
        require('./components/Examples/css_units/EasilyCenterYourElements'),
        require('./components/Component'),
        require('./components/Examples/css_units/ScrollbarsAndVw'),
        require('./components/Examples/css_units/EasyFullscreenPageScrollWithBackgroundReveal'),
        require('./components/Examples/css_units/FluidHeader'),
        require('./components/Examples/CodeSnippet'),  
        require('./components/Examples/ButtonEx'),  
        require('./components/Examples/gallery_ex/OpenPopupExample'),  
        require('./components/Examples/gallery_ex/OpenLightboxExample'),  
        require('./components/Examples/gallery_ex/OpenLightboxGalleryExample'),  
        require('./components/Examples/gallery_ex/LocalGalleryExample'),  
        require('./components/Examples/gallery_ex/OneItemGalleryExample'),  
        require('./components/Examples/GridManagerExample'),  
        require('./components/Examples/LoaderEx'),  
        require('./components/Examples/SnackEx'),  
        require('./components/Examples/TitleBarExample'),  
        require('./components/CreateAndUpdateMonitoringPlan'),  
        require('./components/DownshiftMultiple'),  
        require('./components/ReactSelect'),  
        require('./components/MonitoringPlanPopUpExample'),  
    ],
    views: [
        require('./views/login'),
        require('./views/root'),
        require('./views/home'),
        require('./views/examples'),
        require('./views/MainRouter')
    ],

    extend: {
        hi: {
            you() {
                return 'shalom!'
            }
        },
        SimpleExtend: 'it works!'
    },

    init(definition, done) {
        var _simpleOptions = {
            BaseApi: 'http://some.ip.for/api'
        };

        done(_simpleOptions);
    }
};
