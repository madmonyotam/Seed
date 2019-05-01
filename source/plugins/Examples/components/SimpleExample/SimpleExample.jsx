
module.exports = {
  dependencies: ['Examples.ExampleWrapper', 'Examples.ControlWrapper',
                 'Examples.ComponentWrapper'],
  get(ExampleWrapper, ControlWrapper, ComponentWrapper) {

      var core = this;

      var { React, PropTypes, ComponentMixin } = core.imports;

      return {
          mixins: [ ComponentMixin ],

          propsTypes: {
            scheme: PropTypes.object.isRequired,
            code: PropTypes.string,
          },

          getDefaultProps(){
              return {
                codeSnippet: 'no code was added'
              };
          },

          render() {
            let { code, scheme, context, children, codeHeight, exampleHeight } = this.props;
              
              return (
                  <ExampleWrapper CodeSnippet={ code } codeHeight={ codeHeight } exampleHeight={ exampleHeight }  >
                      <ControlWrapper  scheme={ scheme } context={context} />
                      <ComponentWrapper>
                          { children }
                      </ComponentWrapper>
                  </ExampleWrapper>

              )
          }

      }
  }
}