
module.exports = {
    dependencies: ['Inputs.Button', 'Examples.SimpleExample', 'Examples.ExampleHelper', 'Simple.Icon'],
    get(Button, SimpleExample, ExampleHelper, Icon) {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ], 

            propScheme(){ // TODO:  
                return {
                    theme: { type: 'select', group: 'initial', options: [ 'default', 'primary', 'secondary' ] },
                    variant: { type: 'select', group: 'initial', options: [ 'raised', 'outlined', 'flat' ] },
                    textColor: { type: 'string', group: 'initial' },
                    backgroundColor: { type: 'string', group: 'initial' },
                    width: { type: 'string', group: 'initial' },
                    height: { type: 'string', group: 'initial' },
                    ripple: { type: 'boolean', group: 'initial' },
                    round: { type: 'boolean', group: 'initial' },
                    
                }
            },

            getInitialState() {
                let defaultProps = Button.getDefaultProps(); 
                return defaultProps;
            },

            getCode(){
                let { ripple, backgroundColor, textColor, theme,  variant, round, width, height } = this.state;

                return (`
<Button 
  theme={ ${theme} }
  variant={ ${variant} } 
  textColor={ ${textColor || '' } } 
  backgroundColor={ ${backgroundColor || '' } } 
  width={ ${width} }
  height={ ${height} }
  ripple={ ${ripple} } 
  round={ ${round} } >
    Button
</Button>
                `)
            },

            render() {
                let { ripple, backgroundColor, textColor, theme,  variant, round, width, height } = this.state;

                return (
                    <SimpleExample 
                        context={this} 
                        code={ this.getCode() } 
                        scheme={ this.propScheme() } 
                        codeHeight={ '50%' }
                        exampleHeight={ '50%' } > 

                      <Button
                              theme={ theme }  
                              variant={ variant } 
                              textColor={ textColor } 
                              backgroundColor={ backgroundColor } 
                              width={ width }  
                              height={ height }   
                              ripple={ ripple } 
                              round={ round } >
                        Button
                      </Button>  

                    </SimpleExample>
                )
            }

        }
    }
}
