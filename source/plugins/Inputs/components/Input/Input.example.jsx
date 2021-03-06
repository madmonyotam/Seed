
module.exports = {
    dependencies: ['Inputs.Input', 'Examples.SimpleExample', 'Examples.ExampleHelper'],
    get(Input, SimpleExample, ExampleHelper) {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ], 

            propScheme(){ // TODO:  
                return {
                    theme: { type: 'select', group: 'initial', options: ['filled', 'outlined', 'default'] },
                    label: { type: 'string' },
                    placeholder: { type: 'string' },
                    type: { type: 'string' },
                    isMultipleValues: { type: 'boolean' },
                }
            },

            getInitialState() {
                let defaultProps = Input.getDefaultProps(); 
                return defaultProps;
            },

            getCode(){
                let { type, placeholder, label,  theme, isMultipleValues } = this.state;

                return (`
<Input 
  type={ '${type}' } 
  placeholder={ '${placeholder}' } 
  label={ '${label}' } 
  theme={ '${theme}' } 
  isMultipleValues={ ${isMultipleValues} } />
                `)
            },

            render() {
                let { type, placeholder, label, theme, isMultipleValues } = this.state;

                return (
                    <SimpleExample 
                        context={this} 
                        code={ this.getCode() } 
                        scheme={ this.propScheme() } 
                        codeHeight={ '50%' }
                        exampleHeight={ '50%' } >
                        
                       <Input 
                          type={ type } 
                          placeholder={ placeholder } 
                          label={ label }  
                          value={ '' }
                          isMultipleValues={ isMultipleValues }
                          theme={ theme } />
                    </SimpleExample>
                )
            }

        }
    }
}
