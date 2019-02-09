
module.exports = {
    name: "ColumnEx",
    description: '',
    dependencies: ['SimpleSwitch.Mixin','Layouts.Column','Layouts.Row',
     'Examples.ExampleWrapper', 'Examples.ControlWrapper', 'Examples.ComponentWrapper','Simple.Badge','Simple.Label'],
    get(Mixin, Column, Row, ExampleWrapper, ControlWrapper, ComponentWrapper, Badge, Label) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ],

            propScheme(){ // TODO:  
                return {
                    boxShadow: { type: 'simpleToggle', context: this },
                    width: { type: 'default', context: this },
                    height: { type: 'default', context: this }
                }
            },

            getInitialState() {
                return {
                    boxShadow: true,
                    width: 200,
                    height: '100%'
                };
            },

            componentWillMount () {
                this.initUnits();
            },

            initUnits(){
                this.background = core.theme('backgrounds.light_gray');
            },

            styles(s){

                const styles = {
                    column:{
                        background: this.background
                    }
                }

                return(styles[s]);
            },

            handleChange(event){
               this.setState({
                   size: Number(event.target.value)
               })
            },

            getCode(){
                let { boxShadow, width, height } = this.state;

                return (`
<Column boxShadow={${boxShadow}} width={${width}} height={${height}} style={this.styles('column')}>
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
                let { boxShadow, width, height } = this.state;
                if(core.isString(width) && !width.includes('%')) width = Number(width);
                if(core.isString(height) && !height.includes('%')) height = Number(height);

                return (
                    <ExampleWrapper CodeSnippet={ this.getCode() } componentName={ core.translate('Loader') }>
                        <ControlWrapper  scheme={ this.propScheme() } />
                        <ComponentWrapper>
                            <Column boxShadow={boxShadow} width={width} height={height} style={this.styles('column')}>
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
