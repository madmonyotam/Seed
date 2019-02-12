
module.exports = {
    dependencies: ['SimpleSwitch.Mixin','Layouts.Column','Layouts.Row',
     'Examples.ExampleWrapper', 'Examples.ControlWrapper', 'Examples.ComponentWrapper','Simple.Badge','Simple.Label'],
    get(Mixin, Column, Row, ExampleWrapper, ControlWrapper, ComponentWrapper, Badge, Label) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ],

            propScheme(){ // TODO:  
                return {
                    boxShadow: { type: 'boolean', context: this },
                    width: { type: 'default', context: this },
                    height: { type: 'default', context: this },
                    color: { type: 'default', context: this },
                }
            },

            getInitialState() {
                return {
                    boxShadow: true,
                    width: 400,
                    height: '100%',
                    color: core.theme('backgrounds.light_gray')
                };
            },

            getCode(){
                let { boxShadow, width, height, color } = this.state;

                return (`
<Column boxShadow={${boxShadow}} width={${width}} height={${height}} color={${color}} >
    <Row>
        <Label label={"I'm A Row in a column"}/>
        <Badge count={1}/>
    </Row>
    <Row>
        <Label label={"I'm A second Row in a column"}/>
        <Badge count={2}/>
    </Row>
</Column>
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
                            <Column boxShadow={boxShadow} width={width} height={height} color={color} >
                                <Row boxShadow={true} >
                                    <Label label={"I'm A Row in a column"}/>
                                    <Badge count={1}/>
                                </Row>
                                <Row boxShadow={true} >
                                    <Label label={"I'm A second Row in a column"}/>
                                    <Badge count={2}/>
                                </Row>
                            </Column>
                        </ComponentWrapper>
                    </ExampleWrapper>

                )
            }

        }
    }
}
