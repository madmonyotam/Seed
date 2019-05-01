
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
                    theme: { type: 'string', group: 'initial' },
                    //options: { type: 'array' },
                    label: { type: 'string' },
                    placeholder: { type: 'string' },
                    openOnFocus: { type: 'boolean' },
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
                let { options, placeholder, label, openOnFocus, theme } = this.state;

                return (`
const options = ${JSON.stringify(options, null, 4)}
<Input 
  type={ 'autocomplete }
  options={ options }
  placeholder={ ${placeholder} } 
  openOnFocus={ ${openOnFocus} } 
  label={ ${label} } 
  theme={ ${theme} } />
                `)
            },

            render() {
                let { type, openOnFocus, options, placeholder, label, theme } = this.state;

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
                          label={ label }  
                          value={ '' }
                          theme={ theme } />
                    </SimpleExample>
                )
            }

        }
    }
}