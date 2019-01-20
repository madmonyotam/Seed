module.exports = {
    name: "OneItemGalleryExample",
    description: '',
    dependencies: ['SimpleSwitch.Mixin','SimpleSwitch.CodeSnippet','gallery.Gallery'],    
    get(Mixin,CodeSnippet,Gallery) {
        
        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ],

            componentWillUnmount() {
            },


            propsTypes: {
                text: PropTypes.string,
            },

            getDefaultProps(){
                return {
                };
            },
            
            getInitialState() {
                return {
                    
                };
            },

            componentWillMount () {
                this.initUnits();
            },

            componentDidMount() {
            },

            componentWillReceiveProps (nextProps) {
            },

            componentWillUpdate(nextProps, nextState) {
            },

            componentWillUnmount () {
                
            },

            initUnits(){

            },

            styles(s){

                const styles = {
                    root: {
                    },
                
                }
                
                return(styles[s]);
            },

            getCode(){
                return `
<div  style={{
    backgroundColor: core.theme('backgrounds.lightbox'),
    width: "100%",
    height: 600,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    overflow: 'hidden',
    color: core.theme('colors.white'),
}} >
    <Gallery gallery={[{ 
        id: '25091980000',
        name: 'bat_metal',
        type: 'image',
        mimeType: 'jpg',
        url: '/resources/images/default_gallery/bat_metal.jpg',
        thumbnail: '/resources/images/default_gallery/bat_metal.jpg',
        info: 'This is a example for bat_metal info body text.',
    }]}/>
</div>
                `
            },

            renderOneItemGallery() {
                return (
                    <div>
                        <div  style={{
                            backgroundColor: core.theme('backgrounds.lightbox'),
                            width: "100%",
                            height: 600,
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            overflow: 'hidden',
                            color: core.theme('backgrounds.white'),
                            padding: '15px',
                        }} >
                            <Gallery gallery={[{ 
                                id: '25091980000',
                                name: 'bat_metal',
                                type: 'image',
                                mimeType: 'jpg',
                                url: '/resources/images/default_gallery/bat_metal.jpg',
                                thumbnail: '/resources/images/default_gallery/bat_metal.jpg',
                                info: 'This is a example for bat_metal info body text.',
                            }]}/>
                        </div>
                    </div>
                );
            },
            
            render() {
                return (
                    <div style={this.styles('root')}>
                        <CodeSnippet code={this.getCode()}/>
                        {this.renderOneItemGallery()}
                    </div>
                )
            } 

        }
    }
}
