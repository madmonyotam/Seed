import { Icon, IconButton, CircularProgress } from '@material-ui/core/';

module.exports = {
    name: "GalleryDots",
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
                    selectedId: 'emptyGalleryDotsGallery',
                    dotsGallery: [
                        {
                            id: 'emptyGalleryDotsGallery',
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
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                    row: {
                        display: "flex",
                        alignItems: "center",
                        height: '100%',
                        position: "absolute",
                        padding: 10,
                        backgroundColor: core.theme('transparent.black_80'),
                        borderRadius: 2,
                        overflowX: 'hidden',
                        overflowY: 'hidden',
                    },
                    dot: {
                        color: core.theme('colors.white'),
                        fontSize: 22,
                        padding: 2,
                        margin: 2,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    },
                }
                return(styles[s]);
            },

            defaultClickAction(mediaID) {
                console.log( 'mediaID --> ', mediaID );
            },

            setStateFromProps(props) {
                let {selectedId, dotsGallery} = props;
                let defaultGallery = this.state.dotsGallery;
                let newId = (selectedId) ? selectedId
                            : (dotsGallery) ? dotsGallery[0].id
                              : defaultGallery[0].id;
                let newGallery = (dotsGallery) ? dotsGallery : defaultGallery;

                this.setState({selectedId: newId, dotsGallery: newGallery});
            },

            renderDotsMap(thumb, key) {
                let {selectedId} = this.state;
                
                let dotId = thumb.id;
                
                const thumbClick = () => {
                    let {updateSelected} = this.props;
                    
                    this.setState({selectedId: dotId}, ()=>{
                        if (updateSelected) updateSelected(dotId);
                        else this.defaultClickAction(dotId);
                    });
                };

                let dotWrapStyle = this.styles('dot');
                if (selectedId === dotId) {
                    dotWrapStyle.fontSize = 28;
                    dotWrapStyle.color = core.theme('colors.primary');
                }
                let elementID = `ThumbnailImage.id_${key}`;

                if ( dotId === selectedId && document.getElementById(elementID) ) {
                    setTimeout(() => { document.getElementById(elementID).scrollIntoView({ block: 'end', behavior: 'smooth', inline: 'center'}); }, 0);
                };

                return(
                    <div id={`Thumbnail.id_${key}`} key={key} style={ dotWrapStyle } onClick={ thumbClick }>
                        {/* <i style={{fontSize: "unset",}} className={'material-icons'} >{core.icons('circle')}</i> */}
                        <i style={{fontSize: "unset",}} className={'material-icons'} >fiber_manual_record</i>
                    </div>
                );
            },

            render() {
                let {dotsGallery} = this.state;
                if( !dotsGallery || _.isEmpty(dotsGallery) || dotsGallery.length === 1 ) { return null; }

                return(
                    <div id={'GalleryDots.root'} style={ this.styles('root') } >
                        <div id={'GalleryDots.row'} style={ this.styles('row') } >
                            { dotsGallery.map( this.renderDotsMap )}
                        </div>
                    </div>
                );
            }
        }
    }
};