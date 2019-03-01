
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

            propScheme(){ // TODO:  
                return {
                    color: { type: 'default' },
                    padding: { type: 'number'},
                    top: { type: 'number'},
                    bottom: { type: 'number'},
                    right: { type: 'number'},
                    left: { type: 'number'},
                }
            },

            getInitialState() {
                let defaultProps = Absolute.getDefaultProps();
                defaultProps.color = 'grey';
                return defaultProps;
            },

            getCode(){
                let { color, padding, top, bottom, left, right  } = this.state;

                return (`
<Absolute color={${color}} padding={${padding}} top={${top}} bottom={${bottom}} left={${left}} right={${right}}>
    <Row>
        <Label label={"View - Absolute"}/>
    </Row>
</Absolute>
                `)
            },

            render() {
                let { color, padding, top, bottom, left, right  } = this.state;
                padding = ExampleHelper.ifNumber_Convert(padding);
                top = ExampleHelper.ifNumber_Convert(top);
                bottom = ExampleHelper.ifNumber_Convert(bottom);
                left = ExampleHelper.ifNumber_Convert(left);
                right = ExampleHelper.ifNumber_Convert(right);

                return (
                    <SimpleExample context={this} code={ this.getCode() } scheme={ this.propScheme() } >
                        <Absolute color={color} padding={padding} top={top} bottom={bottom} left={left} right={right}>
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
