
module.exports = {
dependencies: ['Inputs.Button', 'Examples.SimpleExample', 'Examples.ExampleHelper'],
get(Button, SimpleExample, ExampleHelper) {
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
                disabled: { type: 'boolean'},
                isLoading: { type: 'boolean'},
                ripple: { type: 'boolean', group: 'initial' },
                round: { type: 'boolean', group: 'initial' },
                
            }
        },

        getInitialState() {
            let defaultProps = Button.getDefaultProps(); 
            return defaultProps;
        },

        getCode(){
            let { ripple, backgroundColor, textColor, theme, disabled, isLoading, variant, round, width, height } = this.state;

            return [
                `<Button theme={ ${theme} }`,
                `        variant={ ${variant} } `,
                `        textColor={ ${textColor || '' } } `,
                `        backgroundColor={ ${backgroundColor || '' } } `,
                `        width={ ${width} }`,
                `        height={ ${height} }`,
                `        ripple={ ${ripple} } `,
                `        disabled={ ${disabled} } `,
                `        isLoading={ ${isLoading} } `,
                `        round={ ${round} } >`,
                `    Button`,
                `</Button>`,
            ].join('\n');
        },

        render() {
            let { ripple, backgroundColor, textColor, theme, disabled, isLoading, variant, round, width, height } = this.state;
            width = ExampleHelper.ifNumber_Convert(width);
            height = ExampleHelper.ifNumber_Convert(height);

            return (
                <SimpleExample 
                    context={this} 
                    code={ this.getCode() } 
                    scheme={ this.propScheme() } 
                    codeHeight={ '25%' }
                    exampleHeight={ '75%' } > 

                    <Button
                        theme={ theme }
                        variant={ variant }
                        textColor={ textColor }
                        backgroundColor={ backgroundColor }
                        width={ width }
                        height={ height }
                        ripple={ ripple }
                        disabled={ disabled }
                        isLoading={ isLoading }
                        onClick={()=>{console.log('click')}}
                        round={ round }  >
                        Button
                    </Button>

                </SimpleExample>
            )
        }
    }
}}
