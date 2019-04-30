module.exports = {
    name: "OpenLightboxGalleryExample",
    description: '',
    dependencies: ['Examples.CodeSnippet','SimpleSwitch.ButtonEx', 'gallery.Gallery',],    
    get(CodeSnippet,ButtonEx,Gallery) {
        
        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

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
                return`
core.plugins.popovers.openLightbox({
    title: {
        title: 'Gallery',
        hasInfo: false,
    },
    children: <Gallery/>,
});`
            },

            openGallery() {
                core.plugins.popovers.openLightbox({
                    title: {
                        title: 'Gallery',
                        hasInfo: false,
                    },
                    children: <Gallery/>,
                });
            },
            
            render() {
                return (
                    <div style={this.styles('root')}>
                        <CodeSnippet code={this.getCode()}/>
                        <ButtonEx func={this.openGallery} text={'Open Lightbox Gallery'}/>
                    </div>
                )
            } 

        }
    }
}
