import { Typography, Paper } from "@material-ui/core";

module.exports = {
    name: "ExampleWrapper",
    description: 'control wrapper is a basic layout for controlers in examples tab to control props from the ui',
    dependencies: ['SimpleSwitch.Mixin','Layouts.Row','Layouts.Column'],
    get(Mixin, Row, Column) {

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
                this.margin = 10;
            },

            styles(s){

                const styles = {
                    codePaper: {
                      whiteSpace: 'pre-wrap',
                      borderRadius: 4,
                      overflowY: 'auto',
                      color: this.codeColor,
                      background: this.codeBackground,
                      height:'30%',
                      padding: 15,
                      margin: this.margin
                    }
                }

                return(styles[s]);
            },

            renderCodeSnippet(){
              return (
                <div style={ this.styles('codePaper') }>
                  <code>
                      { this.props.CodeSnippet }
                  </code>
                </div>
              )
            },

            render() {
                let controllerAndCopmonentMargin = 10;

                return (
                    <Column width={'100%'} height={'100%'}>

                      <Row height={`calc(70% - ${this.margin+controllerAndCopmonentMargin}px)`} padding={0}>
                        { this.props.children }
                      </Row>

                      { this.renderCodeSnippet() }
                    </Column>
                )
            }

        }
    }
}
