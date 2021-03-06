
module.exports = {
    dependencies: ['Layouts.Row','Simple.Label', 'Examples.ExampleHelper','Examples.SimpleExample'],
    get(Row, Label, ExampleHelper, SimpleExample) {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            propScheme(){ 
                return {
                    size: { type: 'number' },
                    weight: { type: 'number' },
                    width: { type: 'default' },
                    label: { type: 'default' },
                    color: { type: 'default' },
                    transform: { type: 'select', options: ['none', 'capitalize', 'uppercase', 'lowercase', 'initial', 'inherit'] },
                }
            },

            getInitialState() {
                let defaultProps = Label.getDefaultProps();
                return defaultProps;
            },

            getCode(){
                let { size, weight, width, label, color, transform } = this.state;

                return [
                    `<Row boxShadow={true} >`,
                    `    <Label size={${size}} weight={${weight}} width={${width}} label={${label}} color={${color}} transform={${transform}}/>`,
                    `</Row>`,
                ].join('\n');
            },

            render() {
                let { size, weight, width, label, color, transform } = this.state;
                width = ExampleHelper.ifNumber_Convert(width);
                size = ExampleHelper.ifNumber_Convert(size);

                return (
                    <SimpleExample context={this} code={ this.getCode() } scheme={ this.propScheme() } >

                        <Row boxShadow={true} color={core.theme('backgrounds.light_gray')} >
                            <Label size={size} weight={weight} width={width} label={label} color={color} transform={transform}/>
                        </Row>
            
                    </SimpleExample>
                )
            }

        }
    }
}
