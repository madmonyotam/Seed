module.exports = {
    dependencies: [],    
    get() {
        
        var core = this;
        var { React, PropTypes, ComponentMixin } = core.imports;

        const units = {
            textColor: core.theme('colors.dark')
        }

        return {
            mixins: [ ComponentMixin ],

            propsTypes: {
                text: PropTypes.string,
            },

            getDefaultProps(){
                return {
                    text: core.translate('my first core component'),
                    text: 'my first core component',
                };
            },
            
            getInitialState() {
                return {
                    
                };
            },

            componentWillMount () {

            },

            componentDidMount() {
            },

            componentWillReceiveProps (nextProps) {
            },

            componentWillUnmount () {
                
            },

            styles(s){

                const styles = {
                    root: {
                        color: units.textColor,
                    },
                
                }
                
                return(styles[s]);
            },
            
            renderText(){
                let { text } = this.props;
                
                return(
                    <span>
                        { text }
                    </span>
                )
            },

            render() {

                return (
                    <div style={this.styles('root')}>
                        { this.renderText() }
                    </div>
                )
            } 

        }
    }
}
