import { Icon, IconButton, CircularProgress } from '@material-ui/core/';

module.exports = {
    name: "Gallery",
    description: '',
    dependencies: ['gallery.Thumbnails', 'gallery.GalleryDots', 'gallery.Arrow'],

    get(Thumbnails, GalleryDots, Arrow) {
        var core = this;
        var { React, PropTypes } = core.imports;

        return {

            propsTypes: {
            },

            getDefaultProps(){
                let defaultGallery = require('../../defaultGallery.js');
                // let defaultGallery = [
                //     {
                //         id: '25091980001',
                //         name: '',
                //         type: 'image',
                //         mimeType: 'png',
                //         url: '/resources/images/placeholder-image.png',
                //         thumbnail: '/resources/images/placeholder-image.png',
                //         info: 'This is a empty gallery info body text.'
                //     }
                // ];

                return {
                    selectedId: defaultGallery[0].id,
                    gallery: defaultGallery,
                    flags: {
                        selector: 'thumbnails', // '' or 'dots' or 'thumbnails'
                        showArrows: true,
                        showSelector: true,
                        showCounter: true,
                        showDownload: true,
                        showInfo: false,
                    },
                };
            },

            getInitialState() {
                return {
                    selectedId: 0,
                    downloading: false,
                };
            },
            
            componentWillReceiveProps(nextProps) {
                this.setStateFromProps(nextProps);
            },

            componentWillMount() {
                this.setStateFromProps(this.props);
            },

            setStateFromProps(props) {
                let {selectedId} = props;
                this.setState({selectedId});
            },

            componentDidMount() {
                document.addEventListener("keydown", this.keyboardKeyHandle);
                document.addEventListener("onkeydown", this.keyboardKeyHandle); // for non alphanumeric keys
            },
            
            componentWillUnmount() {
                document.removeEventListener("keydown", this.keyboardKeyHandle); 
                document.removeEventListener("onkeydown", this.keyboardKeyHandle);
            },

            styles(s) {
                let {downloading} = this.state;
                let {gallery, flags} = this.props;
                let {selector, showSelector} = flags;

                let noThumbnails = Boolean(!showSelector || gallery.length === 1);

                let SELECTOR_HEIGHT = (selector === 'dots') ? 39
                                    : (selector === 'thumbnails') ? 150
                                    : 0;

                let styles = {
                    root: {
                        width: '100%',
                        height: '100%',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        overflow: 'hidden',
                        display:'flex',
                        flexDirection: 'column',
                        position: 'relative',
                    },
                    actionButtons: {
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: core.theme('transparent.black_40'),
                        borderRadius: 3,
                        padding: "3px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 2,
                    },
                    counter: {
                        borderRadius: 3,
                        padding: "3px 10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: core.theme('colors.white'),
                        textShadow: "0px 0px 1px #000",
                    },
                    action: {
                        borderRadius: 3,
                        padding: "3px 7px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: 'pointer',
                    },
                    mediaWrap: {
                        height: (noThumbnails) ? '100%' : `calc(100% - ${SELECTOR_HEIGHT+30}px)`,
                        position: "relative",
                        paddingBottom: 45,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                    },
                    audioWrap: {
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        width: '500px',
                    },
                    picture: {
                        maxHeight: "100%",
                        left: "50%",
                        top: "50%",
                        position: "absolute",
                        transform: "translate(-50%, -50%)",
                        paddingBottom: 15,
                    },
                    thumbnailsRow: {
                        display: "flex",
                        alignItems: "center",
                        height: SELECTOR_HEIGHT,
                        position: "absolute",
                        bottom: 33,
                        left: 0,
                        right: 0,
                        overflowX: 'hidden',
                        overflowY: 'hidden',
                    },
                    dotsRow: {
                        display: "flex",
                        alignItems: "center",
                        height: SELECTOR_HEIGHT,
                        width: '100%',
                        position: "absolute",
                        bottom: 33,
                        left: 0,
                        right: 0,
                        overflowX: 'hidden',
                        overflowY: 'hidden',
                    },
                    buttonStyle: {
                        height: 80,
                        width: 80,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: core.theme('colors.white'),
                    },
                    iconStyle: { 
                        color: core.theme('colors.white'),
                        cursor: 'pointer',
                        fontSize: 75,
                        textShadow: `0px 0px 1px ${core.theme('colors.black')}`,
                    },
                    prevArrow: {
                        display: "flex",
                        alignItems: "center",
                        position: 'absolute',
                        left: 0,
                        zIndex: 1,
                        height: (noThumbnails) ? '100%' : `calc(100% - ${SELECTOR_HEIGHT+30}px)`,
                    },
                    nextArrow: {
                        display: "flex",
                        alignItems: "center",
                        position: 'absolute',
                        right: 0,
                        zIndex: 1,
                        height: (noThumbnails) ? '100%' : `calc(100% - ${SELECTOR_HEIGHT+30}px)`,
                    },
                    renderDownloadButton: {
                        pointer: (downloading) ? 'wait' : 'pointer',
                        height: 30,
                        width: 30,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: core.theme('colors.white'),
                    },
                    downloadWaiting: { 
                        color: core.theme('colors.white'),
                        cursor: 'wait',
                        textShadow: `0px 0px 1px ${core.theme('colors.black')}`,
                    },
                    downloadIcon: { 
                        color: core.theme('colors.white'),
                        cursor: 'pointer',
                        fontSize: 24,
                        textShadow: `0px 0px 1px ${core.theme('colors.black')}`,
                    },
                }
                return(styles[s]);
            },

            getMediaIndex( gallery, givenID ) {
                let imageIndex = -1;

                for (let i = 0; i < gallery.length; i++) {
                    const image = gallery[i];
                    if (image.id === givenID) imageIndex = i;
                }

                return imageIndex;
            },

            getImageDownloadName(media, selected_idx) {

                let urlSplit = media.url.split('.');
                let imgExtention = media.mimetype ? media.mimetype : urlSplit[urlSplit.length - 1];
                let type = '';

                if ( !media.type ) type = 'image';
                else {
                    switch (media.type) {
                        case 'video' :
                            type = 'video';
                            break;
                        case '' :
                        case 'image' :
                        default:
                            type = 'image';
                            break;
                    }
                }

                let mediaName = media.name;

                if ( !mediaName || _.isEmpty(mediaName) ) { mediaName = core.translate('Gallery'); }

                return `${mediaName}-${core.translate(type)}-${selected_idx+1}.${imgExtention}`;
            },

            // MEDIA RENDERS
            mediaErrorHandler(elementID, type) {
                if (document.getElementById(elementID))
                    document.getElementById(elementID)
                            .setAttribute('src', `/resources/images/placeholder-${type}.png`);
            },

            renderImage(image, elementID) {
                return (
                    <img 
                        id={ elementID } 
                        src={ image.url } 
                        style={ this.styles('picture') } 
                        onError={ ()=>{ this.mediaErrorHandler(elementID, 'image') } }
                    />
                );
            },

            renderVideo(video, elementID) {
                return (
                    <video 
                        controls 
                        id={ elementID } 
                        height={800} 
                        style={ {maxHeight: '100%'} } 
                        src={ video.url } 
                        type={ `video/${video.mimeType}` } 
                    />
                );
            },

            renderAudio(audio, elementID) {
                return (
                    <div id={'Gallery.audioWrap'} style={ this.styles('audioWrap') }>
                        <audio 
                            controls 
                            id={ elementID } 
                            style={{width: '100%'}}
                            src={ audio.url } 
                            type={ `video/${audio.mimeType}` } 
                        />
                    </div>
                );
            },

            renderMedia() {
                let {selectedId} = this.state;
                let {gallery} = this.props;

                let selected_idx = this.getMediaIndex(gallery, selectedId);

                if( !gallery || !gallery[selected_idx] || !gallery[selected_idx].url ) return null;

                let media = gallery[selected_idx];
                let mediaType = (media.type) ? media.type : 'image';
                let elementID = `Gallery.id_${media.id}`;

                let mediaRender = ( mediaType === 'video' ) ? this.renderVideo(media, elementID):
                                  ( mediaType === 'audio' ) ? this.renderAudio(media, elementID):
                                                              this.renderImage(media, elementID);

                return(
                    <div id={'Gallery.renderMedia'} style={ this.styles('mediaWrap') }>
                        { mediaRender }
                    </div>
                );
            },

            // SELECTOR
            updateSelected(selectedId) {
                this.setState({selectedId});
            },
            
            buildThumbnailsGallery() {
                let {gallery} = this.props;

                let thumbList = [];

                for (let i = 0; i < gallery.length; i++) {
                    const media = gallery[i];

                    thumbList.push({
                        id: media.id,
                        url: (media.thumbnail) ? media.thumbnail : media.url,
                        type: (media.type) ? media.type : 'image',
                    });
                }

                return thumbList;
            },
            
            buildDotsGallery() {
                let {gallery} = this.props;

                let dotsList = [];

                for (let i = 0; i < gallery.length; i++) {
                    const media = gallery[i];

                    dotsList.push({
                        id: media.id,
                    });
                }

                return dotsList;
            },

            renderSelector() {
                let {selectedId} = this.state;
                let {flags} = this.props;
                let {selector} = flags;
                
                switch (selector) {
                    case 'dots':
                        return (
                            <div id={'Gallery.selectorRow'} style={ this.styles('dotsRow') } >
                                <GalleryDots 
                                    selectedId={ selectedId }
                                    dotsGallery={ this.buildDotsGallery() }
                                    updateSelected={ this.updateSelected }
                                />
                            </div>
                        );
                    case 'thumbnails':
                        return (
                            <div id={'Gallery.selectorRow'} style={ this.styles('thumbnailsRow') } >
                                <Thumbnails 
                                    selectedId={ selectedId }
                                    thumbnailsGallery={ this.buildThumbnailsGallery() }
                                    updateSelected={ this.updateSelected }
                                />
                            </div>
                        );
                    default:
                        return null;
                }
                
            },

            // ARROWS
            keyboardKeyHandle(event) {

                switch (event.keyCode) {
                    case 27: // Esc
                        core.emit('Lightbox.close');
                        break;
                    case 37: // Left Arrow
                        this.gotoPrevImage();
                        break;
                    case 39: // Right Arrow
                        this.gotoNextImage();
                        break;
                
                    default:
                        // console.log( 'event.keyCode --> ', event.keyCode );
                        break;
                }

            },

            gotoPrevImage() {
                let {selectedId} = this.state;
                let {gallery} = this.props;

                let max = gallery.length - 1;
                let selected_idx = this.getMediaIndex(gallery, selectedId);
                let idx = (selected_idx === 0) ? max : selected_idx - 1;
                
                this.setState({selectedId: gallery[idx].id});
            },

            gotoNextImage() {
                let {selectedId} = this.state;
                let {gallery} = this.props;

                let max = gallery.length - 1;
                let selected_idx = this.getMediaIndex(gallery, selectedId);
                let idx = (selected_idx === max) ? 0 : selected_idx + 1;
                
                this.setState({selectedId: gallery[idx].id});
            },

            renderPrevPicture() {
                let {gallery, flags} = this.props;
                let {selector,showArrows, showSelector} = flags;
                
                if (!showArrows || gallery.length === 1) return null;
                
                let noThumbnails = Boolean(!showSelector || gallery.length === 1);
                let SELECTOR_HEIGHT = (selector === 'dots') ? 39
                                    : (selector === 'thumbnails') ? 150
                                    : 0;

                let arrowHeight = (noThumbnails) ? '100%' : `calc(100% - ${SELECTOR_HEIGHT+30}px)`;

                return (
                    <Arrow direction={'prev'} label={core.translate('Previous Item')} action={this.gotoPrevImage} style={{root:{left:0, height:arrowHeight}}}/>
                );
            },

            renderNextPicture() {
                let {gallery, flags} = this.props;
                let {selector,showArrows, showSelector} = flags;
                
                if (!showArrows || gallery.length === 1) return null;

                let noThumbnails = Boolean(!showSelector || gallery.length === 1);
                let SELECTOR_HEIGHT = (selector === 'dots') ? 39
                                    : (selector === 'thumbnails') ? 150
                                    : 0;

                let arrowHeight = (noThumbnails) ? '100%' : `calc(100% - ${SELECTOR_HEIGHT+30}px)`;

                return (
                    <Arrow direction={'next'} label={core.translate('Next Item')} action={this.gotoNextImage} style={{root:{right:0, height:arrowHeight}}}/>
                );
            },

            // ACTIONS
            renderDownload() {
                let {selectedId, downloading} = this.state;
                let {gallery, flags} = this.props;
                let {showDownload} = flags;

                let title = core.translate('Download this image');

                let selected_idx = this.getMediaIndex(gallery, selectedId);
                if( !showDownload || !gallery || !gallery[selected_idx] || !gallery[selected_idx].url ) return null;
                
                let image = gallery[selected_idx];
                let imageURL = image.url;

                const download = () => {
                    const error = () => {
                        core.emit('notify', {
                            title: core.translate('Download Fail'),
                            text: core.translate('Unable to download the current image'),
                            alertKind: 'error'
                        });
                        this.setState({downloading: false});
                    }
                    this.setState({downloading: true}, ()=>{
                        let xhr = new XMLHttpRequest();
                        xhr.responseType = 'blob';
                        xhr.onload = () => {
                            if (xhr.status === 404) { return error(); } 
                            let alink = document.createElement('a');
                                alink.href = window.URL.createObjectURL(xhr.response);
                                alink.download = this.getImageDownloadName(image, selected_idx);
                                alink.style.display = 'none';
                                alink.onError = error;
                            document.body.appendChild(alink);
                                alink.click();
                            document.body.removeChild(alink);
                        };
                        xhr.open('GET', imageURL);
                        xhr.onError = error;
                        xhr.onreadystatechange = ()=>{ if (xhr.readyState === 4) { this.setState({downloading: false}); } }
                        xhr.send();
                    });
                };

                let downloadIcon = (downloading) ? 
                                    <CircularProgress style={ this.styles('downloadWaiting') } size={20} thickness={2.0} variant={'indeterminate'}/> :
                                    <Icon title={ title } style={ this.styles('downloadIcon')}>{ core.icons('general.download') }</Icon>;

                return (
                    <div id={'Gallery.download'} style={ this.styles('action') } >
                        <IconButton
                            disabled={downloading}
                            disableRipple={downloading}
                            key={ 'ImageDownload' }
                            style={this.styles('renderDownloadButton')}
                            onClick={ download }
                        >
                            { downloadIcon }
                        </IconButton>
                    </div>
                );
            },

            renderInfo() {
                let {flags} = this.props;
                let {showInfo} = flags;

                if (!showInfo) return null;

                let title = core.translate('About this image');

                const about = () => {
                    console.log( 'about me ');
                };

                return (
                    <div id={'Gallery.info'} style={ this.styles('action') } >
                        <IconButton  key={ 'ImageDownload' } style={this.styles('renderDownloadButton')} onClick={ about } >
                            <Icon title={ title } style={ this.styles('downloadIcon')}>{ core.icons('general.info') }</Icon>
                        </IconButton>
                    </div>
                );
            },

            renderCounter() {
                let {selectedId} = this.state;
                let {gallery, flags} = this.props;
                let {showCounter} = flags;

                if ( !showCounter || !gallery || gallery.length < 2 ) return null;

                let gallerySize = gallery.length;
                let selected_idx = this.getMediaIndex(gallery, selectedId);

                return(
                    <div id={'Gallery.counter'} style={ this.styles('counter') } >
                        { `${selected_idx+1} / ${gallerySize}` }
                    </div>
                );
            },

            renderActionButtons() {
                let {showCounter, showDownload, showInfo} = this.props.flags;

                if (!showCounter && !showDownload && !showInfo ) return null;

                return(
                    <div id={'Gallery.actionButtons'} style={ this.styles('actionButtons')}>
                        { this.renderCounter() }
                        { this.renderDownload() }
                        { this.renderInfo() }
                    </div>
                )
            },

            render() {
                let {gallery} = this.props;

                if(!gallery || _.isEmpty(gallery)) return null;

                return (
                    <div id={'Gallery.root'} style={ this.styles('root') }>
                        { this.renderActionButtons() }
                        { this.renderPrevPicture() }
                        { this.renderNextPicture() }
                        { this.renderMedia() }
                        { this.renderSelector() }
                    </div>
                )
            }
        }
    }
};