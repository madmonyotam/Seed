
module.exports = {
    dependencies: ['SimpleSwitch.Mixin','Layouts.Row',
     'Examples.ExampleWrapper', 'Examples.ControlWrapper', 'Examples.ComponentWrapper','Simple.Badge','Simple.Label',
      'Examples.ExampleHelper'],
    get(Mixin, Row, ExampleWrapper, ControlWrapper, ComponentWrapper, Badge, Label, ExampleHelper) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ],

            componentWillUnmount() {
            },


            propsTypes: {
                text: PropTypes.string,
            },

            getDefaultProps(){
                return {
                };
            },

            propScheme(){ // TODO:  
                return {
                    boxShadow: { type: 'boolean' },
                    width: { type: 'default' },
                    height: { type: 'default' },
                    color: { type: 'default' },
                    padding: { type: 'number'}
                }
            },

            getInitialState() {
                return {
                    boxShadow: true,
                    width: '100%',
                    height: 50,
                    color: core.theme('backgrounds.light_gray'),
                    padding: 10
                };
            },

            getCode(){
                let { boxShadow, width, height, color, padding } = this.state;

                return (`
<Row boxShadow={${boxShadow}} width={${width}} height={${height}} color={${color}} padding={${padding}} />
    <Label width={'100%'} label={"I'm A Row layout"}/>
    <Badge count={10}/>
</Row>
                `)
            },

            render() {
                let { boxShadow, width, height, color, padding } = this.state;
                width = ExampleHelper.ifNumber_Convert(width);
                height = ExampleHelper.ifNumber_Convert(height);
                padding = ExampleHelper.ifNumber_Convert(padding);

                return (
                    <ExampleWrapper CodeSnippet={ this.getCode() } componentName={ core.translate('Loader') }>
                        <ControlWrapper  scheme={ this.propScheme() } context={this} />
                        <ComponentWrapper>
                            <Row boxShadow={boxShadow} width={width} height={height} color={color} padding={padding}>
                                <Label width={'100%'} label={"I'm A Row layout"}/>
                                <Badge count={10}/>
                            </Row>
                        </ComponentWrapper>
                    </ExampleWrapper>

                )
            }

        }
    }
}
