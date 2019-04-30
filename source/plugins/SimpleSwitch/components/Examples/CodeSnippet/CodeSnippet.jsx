import { Button  } from '@material-ui/core/';


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
                code: PropTypes.string,
            },

            getDefaultProps(){
                return {
                    code: 'let x = "code should be here!"'
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
                this.textColor =  core.theme('colors.dark');
            },

            styles(s){

                const styles = {
                    root: {
                        display: 'flex',
                        justifyContent:'center',
                        alignItems:'center',
                    },
                    pre:{
                        maxHeight: '50vh',
                        textAlign: 'left',
                        backgroundColor: 'white', 
                        padding: '10px', 
                        borderRadius: '5px', 
                        margin: '15px',
                        width:'100%',
                        overflowY: 'auto' 
                    },
                    code:{
                        textAlign: 'left',
                    },
                
                }
                
                return(styles[s]);
            },

            render() {
                let {code} = this.props;

                return (
                    <div style={this.styles('root')}>
                        <pre style={this.styles('pre')}>
                            <code style={this.styles('code')}>
                                {code}
                            </code>
                        </pre>
                    </div>
                )
            } 

        }
    }
}
