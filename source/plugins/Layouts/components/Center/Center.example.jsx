
module.exports = {
    dependencies: ['Layouts.Center', 'Examples.SimpleExample', 'Simple.Label','Examples.ExampleHelper'],
    get(Center, SimpleExample, Label, ExampleHelper) {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            propScheme(){ // TODO:  
                return {
                    width: { type: 'default' },
                    height: { type: 'default' },
                    color: { type: 'default' },
                }
            },

            getInitialState() {
                let defaultProps = Center.getDefaultProps();
                defaultProps.color = '#ddd'
                return defaultProps;
            },

            getCode(){
                let { width, height, color } = this.state;

                return (`
<Center width={${width}} height={${height}} color={${color}} >
    <Label width={50} label={"I'm a label in the Center"}/>
</Center> 
                `)
            },

            render() {
                let { width, height, color } = this.state;
                width = ExampleHelper.ifNumber_Convert(width);
                height = ExampleHelper.ifNumber_Convert(height);

                return (
                    <SimpleExample context={this} code={ this.getCode() } scheme={ this.propScheme() } >

                           <Center width={width} height={height} color={color} >
                                 <Label width={50} label={"I'm a label in the Center"}/>
                            </Center> 
                        
                    </SimpleExample>
                )
            }

        }
    }
}
