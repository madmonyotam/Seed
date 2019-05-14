module.exports = {
    name: "ExampleWrapper",
    description: 'control wrapper is a basic layout for controlers in examples tab to control props from the ui',
    dependencies: ['Layouts.Row', 'Layouts.Column'],
    get(Row, Column) {

        var core = this;

        var { React, PropTypes, ComponentMixin, Branch } = core.imports;

        return {
            mixins: [ ComponentMixin, Branch ],

            cursors: {
                currentExample: ['plugins','Examples','currentExample'],
            },

            componentWillUnmount() {
            },


            propsTypes: {

            },

            getDefaultProps(){
                return {
                  codeHeight: '30%',
                  exampleHeight: undefined
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
                this.codeColor = core.theme('examples.codeColor');
                this.codeBackground = core.theme('examples.codeBackground')
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
                      height: this.props.codeHeight,
                      padding: 15,
                      margin: this.margin,
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
                let { exampleHeight } = this.props;
              //  console.log(this.state.currentExample);

                return (
                    <Column width={'100%'} height={'100%'}>

                      <Row height={ `calc(${ exampleHeight ? exampleHeight : '70%' } - ${this.margin+controllerAndCopmonentMargin}px)` } padding={0}>
                        { this.props.children }
                      </Row>

                       { this.renderCodeSnippet() } 
                    </Column>
                )
            }

        }
    }
}
