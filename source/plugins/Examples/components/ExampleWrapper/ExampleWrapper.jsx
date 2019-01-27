import { Typography, Paper } from "@material-ui/core";

module.exports = {
    name: "ExampleWrapper",
    description: 'control wrapper is a basic layout for controlers in examples tab to control props from the ui',
    dependencies: ['SimpleSwitch.Mixin'],
    get(Mixin) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ],

            componentWillUnmount() {
            },


            propsTypes: {

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

            componentWillUnmount () {

            },

            initUnits(){
                this.textColor =  core.theme('colors.dark');
                this.borderColor =  core.theme('colors.gray');
                this.codeColor = core.theme('colors.white');
                this.codeBackground = core.theme('colors.dark')
            },

            styles(s){

                const styles = {
                    root: {
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        width: '100%',
                    },
                    content: {
                      flexDirection: 'row',
                      display: 'flex',
                      height: '100%',
                      width: '100%',
                    },
                    codePaper: {
                      margin: 10,
                      padding: 15,
                      whiteSpace: 'pre-wrap',
                      fontSize: '90%',
                      height: '40vh',
                      overflow: 'hidden',
                      overflowY: 'auto',
                      color: this.codeColor,
                      background: this.codeBackground
                    },
                    // title: {
                    //   color: this.textColor,
                    //   marginBottom: 10,
                    //   paddingBottom: 5,
                    //   fontSize: 16,
                    //   borderBottom: `1px solid ${this.borderColor}`
                    // }
                }

                return(styles[s]);
            },

            renderCodeSnippet(){
              return (
                <Paper style={ this.styles('codePaper') }>
                  <code>
                  { this.props.CodeSnippet }
                  </code>
                </Paper>
              )
            },

            render() {
                return (
                    <div style={this.styles('root')}>

                      {/* <Typography style={ this.styles('title') }>
                        { this.props.componentName }
                      </Typography> */}


                      <div style={ this.styles('content') }>
                        { this.props.children }
                      </div>

                      { this.renderCodeSnippet() }
                    </div>
                )
            }

        }
    }
}
