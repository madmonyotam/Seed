
module.exports = {
    dependencies: ['Layouts.Row','Simple.Label', 'Examples.ExampleHelper', 'Examples.SimpleExample','Simple.Icon'],
    get(Row, Label, ExampleHelper, SimpleExample, Icon) {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            propScheme(){ 
                return {
                    size: { type: 'number' },
                    color: { type: 'color' },
                    icon: { type: 'icon'}
                }
            },

            getInitialState() {
                let defaultProps = Icon.getDefaultProps();
                return defaultProps;
            },

            getCode(){
                let { size, icon, color } = this.state;

                return (`
<Row height={'fit-content'} width={'50%'} color={core.theme('backgrounds.light_gray')} >
    <Label label={'icon -->'}/>
    <Icon icon={${icon}} color={${color}} size={${size}} />
</Row>
                `)
            },

            render() {
                let { icon, size, color } = this.state;
                size = ExampleHelper.ifNumber_Convert(size);

                return (
                    <SimpleExample context={this} code={ this.getCode() } scheme={ this.propScheme() } >

                        <Row height={'fit-content'} width={'50%'} color={core.theme('backgrounds.light_gray')} >
                            <Label label={'icon -->'}/>
                            <Icon icon={icon} color={color} size={size} />
                        </Row>
            
                    </SimpleExample>
                )
            }

        }
    }
}
