
module.exports = {
    dependencies: ['SimpleSwitch.Mixin','Inputs.Input', 'Examples.SimpleExample', 'Examples.ExampleHelper'],
    get(Mixin, Input, SimpleExample, ExampleHelper) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ], 

            propScheme(){ // TODO:  
                return {
                    theme: { type: 'string', group: 'initial' },
                    label: { type: 'string' },
                    placeholder: { type: 'string' },
                    type: { type: 'string' },
                    
                }
            },

            getInitialState() {
                let defaultProps = Input.getDefaultProps(); 
                return defaultProps;
            },

            getCode(){
                let { type, placeholder, label,  theme } = this.state;

                return (`
<Input 
  type={ ${type} } 
  placeholder={ ${placeholder} } 
  label={ ${label} } 
  theme={ ${theme} } />
                `)
            },

            render() {
                let { type, placeholder, label, theme } = this.state;

                return (
                    <SimpleExample context={this} code={ this.getCode() } scheme={ this.propScheme() } >
                       <Input 
                          type={ type } 
                          placeholder={ placeholder } 
                          label={ label }  
                          value={ '' }
                          theme={ theme } />
                    </SimpleExample>
                )
            }

        }
    }
}
