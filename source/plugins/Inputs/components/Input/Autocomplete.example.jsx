
module.exports = {
    dependencies: ['Inputs.Input', 'Examples.SimpleExample', 'Examples.ExampleHelper'],
    name: 'Autocomplete',
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
                    openOnFocus: { type: 'boolean' },
                    suggest: { type: 'boolean' , group: 'initial' },
                    isMultipleValues: { type: 'boolean' },
                }
            }, 

            getInitialState() {
                let defaultProps = Input.getDefaultProps(); 
                return {
                  ...defaultProps,
                  options: [
                    { label : 'Afghanistan', value: 'Afghanistan' }, 
                    { label : 'Albania', value: 'Albania' }, 
                    { label : 'Algeria', value: 'Algeria' },
                    { label : 'Andorra', value: 'Andorra' },
                    { label : 'Angola', value: 'Angola' },
                    { label : 'Argentina', value: 'Argentina' },
                  ]
                };
            },

            getCode(){
                let { options, placeholder, label, openOnFocus, theme, suggest, isMultipleValues } = this.state;

                return (`
const options = ${JSON.stringify(options, null, 4)}
<Input 
  type={ 'autocomplete' }
  options={ options }
  placeholder={ ${placeholder} } 
  openOnFocus={ ${openOnFocus} } 
  suggest={ ${suggest} } 
  isMultipleValues={ ${isMultipleValues} } 
  label={ ${label} } 
  theme={ ${theme} } />
                `)
            },

            render() {
                let { type, suggest, openOnFocus, options, placeholder, label, theme, isMultipleValues } = this.state;

                return (
                    <SimpleExample 
                        context={this} 
                        code={ this.getCode() } 
                        scheme={ this.propScheme() } 
                        codeHeight={ '50%' }
                        exampleHeight={ '50%' }>
                       <Input 
                          type={ 'autocomplete' } 
                          placeholder={ placeholder } 
                          openOnFocus={ openOnFocus } 
                          options={ options } 
                          suggest={ suggest }  
                          isMultipleValues={ isMultipleValues }  
                          label={ label }  
                          value={ '' }
                          theme={ theme } />
                    </SimpleExample>
                )
            }

        }
    }
}
