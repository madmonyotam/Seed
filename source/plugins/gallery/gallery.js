module.exports = {
    name: 'gallery',
    tree: require('./tree.js'),
    actions: [],
    modules: [],
    components: [
        require('./components/Arrow'),
        require('./components/Gallery'),
        require('./components/GalleryDots'),
        require('./components/Thumbnails'),
    ],
    // examples: [     
    //     require('./examples/OpenLightboxExample'),  
    //     require('./examples/OpenLightboxGalleryExample'),  
    //     require('./examples/LocalGalleryExample'),  
    //     require('./examples/OneItemGalleryExample'),
    // ],
    views: [],

    init(definition, done) {
        var _gallery = {};
        done(_gallery);
    }
};
