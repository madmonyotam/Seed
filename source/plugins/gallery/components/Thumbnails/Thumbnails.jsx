module.exports = {
    name: "Thumbnails",
    description: '',
    dependencies: [],

    get() {
        var core = this;
        var { React, PropTypes } = core.imports;

        return {

            propsTypes: {
            },

            getDefaultProps(){
                return {};
            },

            componentWillReceiveProps(nextProps) {
                this.setStateFromProps(nextProps);
            },

            getInitialState() {
                return {
                    selectedId: 'emptyThumbnailsGallery',
                    thumbnailsGallery: [
                        {
                            id: 'emptyThumbnailsGallery',
                            url: '/resources/images/placeholder-image.png',
                            type: 'image',
                        }
                    ],
                };
            },

            componentWillMount() {
                this.setStateFromProps(this.props);
            },

            componentDidMount() {
            },
            
            componentWillUnmount() {
            },

            styles(s) {
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
                    row: {
                        display: "flex",
                        alignItems: "center",
                        height: '100%',
                        position: "absolute",
                        padding: 10,
                        backgroundColor: "#000000cc",
                        borderRadius: 2,
                        overflowX: 'hidden',
                        overflowY: 'hidden',
                    },
                    thumbnail: {
                        margin: '0px 10px',
                        borderRadius: 4,
                        position: "relative",
                        height: 100,
                        width: 130,
                        minWidth: 130,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#ffffffd9",
                    },
                    thumbnailImage: {
                        cursor: 'pointer',
                        maxHeight: "100%",
                        maxWidth: "100%",
                    },
                }
                return(styles[s]);
            },

            defaultClickAction(mediaID) {
                console.log( 'mediaID --> ', mediaID );
            },

            setStateFromProps(props) {
                let {selectedId, thumbnailsGallery} = props;
                let defaultGallery = this.state.thumbnailsGallery;
                let newId = (selectedId) ? selectedId
                            : (thumbnailsGallery) ? thumbnailsGallery[0].id
                              : defaultGallery[0].id;
                let newGallery = (thumbnailsGallery) ? thumbnailsGallery : defaultGallery;

                this.setState({selectedId: newId, thumbnailsGallery: newGallery});
            },

            thumbErrorHandler(elementID, type='image') {
                if (document.getElementById(`${elementID}`))
                    document.getElementById(`${elementID}`)
                        .setAttribute('src', `/resources/images/placeholder-${type}.png`);
            },

            renderThumbnailMap(thumb, key) {
                let {selectedId} = this.state;
                
                let thumbSRC = thumb.url;

                let thumbID = thumb.id;
                
                const thumbClick = () => {
                    let {updateSelected} = this.props;
                    
                    this.setState({selectedId: thumbID}, ()=>{
                        if (updateSelected) updateSelected(thumbID);
                        else this.defaultClickAction(thumbID);
                    });
                };

                let thumbnailWrapStyle = this.styles('thumbnail');
                    thumbnailWrapStyle.border = (thumbID === selectedId) 
                                                ? `3px solid ${core.theme('colors.primary')}` 
                                                : `3px solid transparent`;
                let elementID = `ThumbnailImage.id_${key}`;

                if ( thumbID === selectedId && document.getElementById(elementID) ) {
                    setTimeout(() => { document.getElementById(elementID).scrollIntoView({ block: 'end', behavior: 'smooth', inline: 'center'}); }, 0);
                };

                return(
                    <div id={`Thumbnail.id_${key}`} key={key} style={ thumbnailWrapStyle } onClick={ thumbClick }>
                        <img id={ elementID }
                            src={ thumbSRC } 
                            onError={ ()=>{ this.thumbErrorHandler(elementID, thumb.type) }}
                            style={ this.styles('thumbnailImage') }
                        />
                    </div>
                );
            },

            render() {
                let {thumbnailsGallery} = this.state;
                if( !thumbnailsGallery || _.isEmpty(thumbnailsGallery) || thumbnailsGallery.length === 1 ) { return null; }

                return(
                    <div id={'Thumbnails.root'} style={ this.styles('root') } >
                        <div id={'Thumbnails.row'} style={ this.styles('row') } >
                            { thumbnailsGallery.map( this.renderThumbnailMap )}
                        </div>
                    </div>
                );
            }
        }
    }
};