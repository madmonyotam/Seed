import { Button  } from '@material-ui/core/';
import jsxToString from 'jsx-to-string';


module.exports = {
    name: "CodeSnippet",
    description: '',
    dependencies: ['SimpleSwitch.Mixin'],    
    get(Mixin) {
        
        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ],

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
                this.initUnits();
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

            initUnits(){
                this.codeColor = core.theme('colors.white');
                this.codeBackground = core.theme('colors.dark')
                this.margin = 10;
            },

            styles(s){

                const styles = {
                    root: {
                        whiteSpace: 'pre-wrap',
                        borderRadius: 4,
                        overflowY: 'auto',
                        color: this.codeColor,
                        background: this.codeBackground,
                        height: '30%',
                        padding: 15,
                        margin: this.margin
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
