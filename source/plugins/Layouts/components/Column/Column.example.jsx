
module.exports = {
    dependencies: ['Layouts.Column','Layouts.Row', 'Examples.SimpleExample',
        'Simple.Badge','Simple.Label','Examples.ExampleHelper'],
    get(Column, Row, SimpleExample, Badge, Label, ExampleHelper) {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            propScheme(){ // TODO:  
                return {
                    boxShadow: { type: 'boolean' },
                    width: { type: 'default' },
                    height: { type: 'default' },
                    color: { type: 'default' },
                }
            },

            getInitialState() {
                let defaultProps = Column.getDefaultProps();
                defaultProps.boxShadow = true;
                defaultProps.color = core.theme('backgrounds.light_gray');

                return defaultProps;
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
