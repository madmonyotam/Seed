
module.exports = {
    dependencies: ['SimpleSwitch.Mixin','Layouts.Row','Simple.Label', 'Examples.ExampleHelper','Examples.SimpleExample'],
    get(Mixin, Row, Label, ExampleHelper, SimpleExample) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ],

            propScheme(){ 
                return {
                    size: { type: 'number' },
                    weight: { type: 'number' },
                    width: { type: 'default' },
                    label: { type: 'default' },
                    color: { type: 'default' },
                }
            },

            getInitialState() {
                return {
                    size: 13,
                    weight: 500,
                    width: '100%',
                    label: 'label',
                    color: core.theme('colors.text')
                };
            },

            getCode(){
                let { size, weight, width, label, color } = this.state;

                return (`
<Row boxShadow={true} >
    <Label size={${size}} weight={${weight}} width={${width}} label={${label}} color={${color}}/>
</Row>
                `)
            },

            render() {
                let { size, weight, width, label, color } = this.state;
                width = ExampleHelper.ifNumber_Convert(width);
                weight = ExampleHelper.ifNumber_Convert(weight);
                size = ExampleHelper.ifNumber_Convert(size);

                return (
                    <SimpleExample context={this} code={ this.getCode() } scheme={ this.propScheme() } >

                        <Row boxShadow={true} color={core.theme('backgrounds.light_gray')} >
                            <Label size={size} weight={weight} width={width} label={label} color={color}/>
                        </Row>
            
                    </SimpleExample>
                )
            }

        }
    }
}
