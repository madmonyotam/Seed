
module.exports = {
    dependencies: ['SimpleSwitch.Mixin','Layouts.Row',
      'Examples.SimpleExample','Layouts.Absolute','Simple.Label',
      'Examples.ExampleHelper'],
    get(Mixin, Row, SimpleExample, Absolute, Label, ExampleHelper) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ],

            propsTypes: {

            },

            getDefaultProps(){
                return {
                };
            },

            propScheme(){ // TODO:  
                return {
                    color: { type: 'default' },
                    padding: { type: 'number'}
                }
            },

            getInitialState() {
                return {
                    color: core.theme('backgrounds.light_gray'),
                    padding: 10
                };
            },

            getCode(){
                let { color, padding } = this.state;

                return (`
<Absolute color={${color}} padding={${padding}}>
    <Row>
        <Label label={"View - Absolute"}/>
    </Row>
</Absolute>
                `)
            },

            render() {
                let { color, padding } = this.state;
                padding = ExampleHelper.ifNumber_Convert(padding);

                return (
                    <SimpleExample context={this} code={ this.getCode() } scheme={ this.propScheme() } >
                        <Absolute color={color} padding={padding}>
                            <Row>
                                <Label label={"View - absolute"}/>
                            </Row>
                        </Absolute>
                    </SimpleExample>
                )
            }

        }
    }
}
