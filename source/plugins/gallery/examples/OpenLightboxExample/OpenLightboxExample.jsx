module.exports = {
    name: "OpenLightboxExample",
    description: '',
    dependencies: ['Examples.CodeSnippet','SimpleSwitch.ButtonEx'],    
    get(CodeSnippet,ButtonEx) {
        
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
                return `
core.plugins.popovers.openLightbox();
                `
            },

            renderLightbox(){
                core.plugins.popovers.openLightbox();
            },
            
            render() {
                return (
                    <div style={this.styles('root')}>
                        <CodeSnippet code={this.getCode()}/>
                        <ButtonEx func={this.renderLightbox} text={'Open Lightbox'}/>
                    </div>
                )
            } 

        }
    }
}
