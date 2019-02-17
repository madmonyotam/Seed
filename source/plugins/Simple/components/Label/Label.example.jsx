
module.exports = {
    dependencies: ['SimpleSwitch.Mixin','Layouts.Row',
        'Examples.ExampleWrapper', 'Examples.ControlWrapper', 'Examples.ComponentWrapper','Simple.Label',
        'Examples.ExampleHelper'],
    get(Mixin, Row, ExampleWrapper, ControlWrapper, ComponentWrapper, Label, ExampleHelper) {

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
                    <ExampleWrapper CodeSnippet={ this.getCode() } componentName={ core.translate('Loader') }>
                        <ControlWrapper  scheme={ this.propScheme() } context={this} />
                        <ComponentWrapper>
                                <Row boxShadow={true} color={core.theme('backgrounds.light_gray')} >
                                    <Label size={size} weight={weight} width={width} label={label} color={color}/>
                                </Row>
                        </ComponentWrapper>
                    </ExampleWrapper>

                )
            }

        }
    }
}
