module.exports = {
    name: 'popovers',
    tree: require('./tree.js'),
    actions: [],
    modules: [
        require('./modules/PopupHandler'),
    ],
    components: [
        require('./components/Caution'),
        require('./components/Lightbox'),
        require('./components/Lightbox/LightboxInfo'),
        require('./components/Lightbox/LightboxTitleBar'),
        require('./components/Notify'),
        require('./components/Popup'),
    ],

    extend:{
        
    },

    init(definition, done) {
        var core = this;

        var notifications = {

            addNotify(text,alertKind) {
                core.emit('addNotify',{text,alertKind});
            },

            openPopup(data) {
                let {title, body, bodyStyle, okButton, buttons, modalStyle} = data;
                let {btnTitle, btnFunc} = okButton;

                core.emit('Popup', {title, body, bodyStyle, btnTitle, btnFunc, buttons, modalStyle});
            },

            Caution(text,title,func) {
                core.emit('Caution', {text, title, func} );
            },

            openLightbox( data ) {
                /**
                 * if no value is passed, it takes the default value;
                 * set title or info to 'none' for eliminate it;
                 */

                if (!data || _.isEmpty(data)) return core.emit('Lightbox.open');

                let { children, rootStyle, innerStyle, bodyStyle, childrenStyle } = data;

                let lightInfo = (data.info && !_.isEmpty(data.info)) ? data.info : undefined;

                let lightTitle = (data.title && !_.isEmpty(data.title)) ? data.title : {hasInfo: Boolean(data.info !== 'none') };

                core.emit('Lightbox.open', {
                    lightBody: {children, rootStyle, innerStyle, bodyStyle, childrenStyle},
                    lightTitle: lightTitle,
                    lightInfo: lightInfo,
                });
            },
        };

        done(notifications);
    }
};
