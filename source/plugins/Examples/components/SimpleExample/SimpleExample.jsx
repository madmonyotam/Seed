
module.exports = {
  dependencies: ['SimpleSwitch.Mixin', 'Examples.ExampleWrapper', 'Examples.ControlWrapper',
                 'Examples.ComponentWrapper'],
  get(Mixin, ExampleWrapper, ControlWrapper, ComponentWrapper) {

      var core = this;

      var { React, PropTypes } = core.imports;

      return {
          mixins: [ Mixin ],

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
            let { code, scheme, context, children } = this.props;
              
              return (
                  <ExampleWrapper CodeSnippet={ code } >
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