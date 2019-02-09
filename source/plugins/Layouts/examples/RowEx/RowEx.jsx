
module.exports = {
    name: "RowEx",
    description: '',
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
                    boxShadow: { type: 'simpleToggle', context: this },
                    width: { type: 'default', context: this },
                    height: { type: 'default', context: this }
                }
            },

            getInitialState() {
                return {
                    boxShadow: true,
                    width: '100%',
                    height: 50
                };
            },

            componentWillMount () {
                this.initUnits();
            },

            componentDidMount() {
            },

            componentWillReceiveProps (nextProps) {
            },

            componentWillUnmount () {

            },

            initUnits(){
                this.background = core.theme('backgrounds.light_gray');
            },

            styles(s){

                const styles = {
                    row:{
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
<Row boxShadow={${boxShadow}} width={${width}} height={${height}} />
    <Label width={'100%'} label={"I'm A Row layout"}/>
    <Badge count={10}/>
</Row>
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
                            <Row boxShadow={boxShadow} width={width} height={height} style={this.styles('row')}>
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
