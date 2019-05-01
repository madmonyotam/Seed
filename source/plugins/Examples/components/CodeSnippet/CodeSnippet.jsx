import jsxToString from 'jsx-to-string';

module.exports = {
    name: "CodeSnippet",
    description: '',
    dependencies: [],    
    get() {
        
        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            componentWillUnmount() {
            },


            propsTypes: {
                Element: PropTypes.element,
                ElementProps: PropTypes.object,
            }, 
            getInitialState() {
                return {
                    Element: this.props.Element,
                    ElementProps: this.props.ElementProps, 
                };
            },

            componentWillMount () {
            },

            componentDidMount() {
            },

            componentWillReceiveProps (nextProps) {
                if (nextProps !== this.props) {
                    this.setState(nextProps)
                }
            },

            componentWillUpdate(nextProps, nextState) {
            },

            componentWillUnmount () {
            },

            styles(s){

                const styles = {
                    root: {
                        whiteSpace: 'pre-wrap',
                        borderRadius: 4,
                        overflowY: 'auto',
                        color: 'white',
                        background: '#333333',
                        height: '30%',
                        padding: 15,
                        margin: 10
                    }
                
                }
                
                return(styles[s]);
            },

            renderComponentAsCode(){
                let { ElementProps, Element } = this.state;
                // console.dir(Element)

                let jsString = jsxToString(<Element { ...ElementProps } />, {
                    shortBooleanSyntax: false,
                    functionNameOnly: false,
                    useFunctionCode: false
                });

                return jsString;

            },

            render() {
                if (!this.state.ELement) return null;
                return (
                    <div style={this.styles('root')}>
                        <code>
                        { this.renderComponentAsCode() }
                        </code>
                    </div>
                )
            } 

        }
    }
}
