
module.exports = {
    dependencies: ['SimpleSwitch.Mixin','Layouts.Column','Layouts.Row', 'Examples.SimpleExample',
        'Examples.ExampleWrapper', 'Examples.ControlWrapper', 'Examples.ComponentWrapper','Simple.Badge','Simple.Label',
        'Examples.ExampleHelper'],
    get(Mixin, Column, Row, SimpleExample, ExampleWrapper, ControlWrapper, ComponentWrapper, Badge, Label, ExampleHelper) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ],

            propScheme(){ // TODO:  
                return {
                    boxShadow: { type: 'boolean' },
                    width: { type: 'default' },
                    height: { type: 'default' },
                    color: { type: 'default' },
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
                width = ExampleHelper.ifNumber_Convert(width);
                height = ExampleHelper.ifNumber_Convert(height);

                return (
                    <SimpleExample context={this} code={ this.getCode() } scheme={ this.propScheme() } >

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
                        
                    </SimpleExample>
                )
            }

        }
    }
}
