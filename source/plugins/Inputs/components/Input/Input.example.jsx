
module.exports = {
    dependencies: ['Inputs.Input', 'Examples.SimpleExample', 'Examples.ExampleHelper'],
    get(Input, SimpleExample, ExampleHelper) {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ], 

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
