module.exports = {
    name: "LocalGalleryExample",
    description: '',
    dependencies: ['Examples.CodeSnippet','gallery.Gallery'],   
    get(CodeSnippet,Gallery) {
        
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

            renderGallery() {
                return (
                    <div>
                        <div  style={{
                            backgroundColor: core.theme('backgrounds.lightbox'),
                            width: "100%",
                            height: '600px',
                            padding: '15px',
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            overflow: 'hidden',
                            color: core.theme('backgrounds.white'),
                        }} >
                            <Gallery />
                        </div>
                    </div>
                );
            },

            getCode(){
                return `
<div  style={{
    backgroundColor: core.theme('backgrounds.lightbox'),
    width: "100%",
    height: '600px',
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    overflow: 'hidden',
    color: core.theme('colors.white'),
}} >
    <Gallery />
</div>
                `
            },
            
            render() {
                return (
                    <div style={this.styles('root')}>
                        <CodeSnippet code={this.getCode()}/>
                        {this.renderGallery()}
                    </div>
                )
            } 

        }
    }
}
