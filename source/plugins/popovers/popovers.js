module.exports = {
    name: 'Popovers',
    tree: require('./tree.js'),
    actions: [],
    modules: [
        require('./modules/PopupHandler'),
    ],
    components: [
        require('./components/Caution'),
        require('./components/Drawer'),
        require('./components/Notify'),
        require('./components/Popup'),
        require('./components/Popup/PopupButtons'),
    ],

    // examples: [     
    //     require('./examples/OpenPopupExample'),
    // ],

    extend:{
        
    },

    init(definition, done) {
        var seed = definition;

        var notifications = {
            openPopup(id, parameters) {
                let {title, body, bodyStyle, okButton, buttons, modalStyle, width, height} = parameters;
                let {btnTitle, btnFunc} = okButton;

                seed.emit('Popup', {id, title, body, bodyStyle, btnTitle, btnFunc, buttons, width, height, modalStyle});
            },

            Caution(text,title,func) {
                seed.emit('Caution', {text, title, func} );
            },

            openLightbox( data ) {
                /**
                 * if no value is passed, it takes the default value;
                 * set title or info to 'none' for eliminate it;
                 */

                if (!data || _.isEmpty(data)) return seed.emit('Lightbox.open');

                let { children, rootStyle, innerStyle, bodyStyle, childrenStyle } = data;

                let lightInfo = (data.info && !_.isEmpty(data.info)) ? data.info : undefined;

                let lightTitle = (data.title && !_.isEmpty(data.title)) ? data.title : {hasInfo: Boolean(data.info !== 'none') };

                seed.emit('Lightbox.open', {
                    lightBody: {children, rootStyle, innerStyle, bodyStyle, childrenStyle},
                    lightTitle: lightTitle,
                    lightInfo: lightInfo,
                });
            },
        };

        done(notifications);
    }
};
