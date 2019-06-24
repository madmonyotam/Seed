
module.exports = {
dependencies: ['Simple.Chip', 'Examples.SimpleExample', 'Examples.ExampleHelper', 'Simple.Icon'],
get(Chip, SimpleExample, ExampleHelper, Icon) {
    var core = this;
    var { React, PropTypes, ComponentMixin } = core.imports;

    return {
        mixins: [ ComponentMixin ], 

        propScheme(){ // TODO:  
            return {
                theme: { type: 'select', group: 'initial', options: [ 'default', 'primary', 'secondary' ] },
                variant: { type: 'select', group: 'initial', options: [ 'raised', 'outlined', 'flat' ] },
                onClick: { type: 'boolean' },
                onDelete: { type: 'boolean' },
                text: { type: 'string', group: 'initial' },
            }
        },

        getInitialState() {
            let defaultProps = Chip.getDefaultProps(); 
            return defaultProps;
        },

        getCode(){
            let { text, theme, variant, onClick, onDelete } = this.state;

            return (`
<Chip 
  variant={ ${variant} } 
  text={ ${text} } 
  theme={ ${theme} } 
  onClick={ ${onClick} } 
  onDelete={ ${onDelete} } />

            `)
        },

        render() {
            let { text, theme, variant, onClick, onDelete } = this.state;

            return (
                <SimpleExample 
                    context={this} 
                    code={ this.getCode() } 
                    scheme={ this.propScheme() } 
                    codeHeight={ '50%' }
                    exampleHeight={ '50%' } > 

                    <Chip 
                      variant={ variant } 
                      onClick={ onClick ? () => { console.log('You clicked '+text) } : null }
                      onDelete={ onDelete ? () => { console.log('You deleted '+text) } : null }
                      text={ text } 
                      theme={ theme }  />

                </SimpleExample>
            )
        }
    }
}}
