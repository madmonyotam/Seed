
module.exports = {
    dependencies: ['SimpleSwitch.Mixin','Layouts.Row',
     'Examples.ExampleWrapper', 'Examples.ControlWrapper', 'Examples.ComponentWrapper','Simple.Badge','Simple.Label'],
    get(Mixin, Row, ExampleWrapper, ControlWrapper, ComponentWrapper, Badge, Label) {

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
                    boxShadow: { type: 'boolean', context: this },
                    width: { type: 'default', context: this },
                    height: { type: 'default', context: this },
                    color: { type: 'default', context: this }
                }
            },

            getInitialState() {
                return {
                    boxShadow: true,
                    width: '100%',
                    height: 50,
                    color: core.theme('backgrounds.light_gray')
                };
            },

            getCode(){
                let { boxShadow, width, height, color } = this.state;

                return (`
<Row boxShadow={${boxShadow}} width={${width}} height={${height}} color={${color}} />
    <Label width={'100%'} label={"I'm A Row layout"}/>
    <Badge count={10}/>
</Row>
                `)
            },

            render() {
                let { boxShadow, width, height, color } = this.state;
                if(core.isString(width) && !width.includes('%')) width = Number(width);
                if(core.isString(height) && !height.includes('%')) height = Number(height);

                return (
                    <ExampleWrapper CodeSnippet={ this.getCode() } componentName={ core.translate('Loader') }>
                        <ControlWrapper  scheme={ this.propScheme() } />
                        <ComponentWrapper>
                            <Row boxShadow={boxShadow} width={width} height={height} color={color}>
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
