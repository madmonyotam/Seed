
module.exports = {
    dependencies: ['Layouts.Row', 'Examples.ExampleHelper', 'Examples.SimpleExample','Calendar.Calendar'],
    get(Row, ExampleHelper, SimpleExample, Calendar) {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            propScheme(){ 
                return {
                    color: { type: 'color' }
                }
            },

            getInitialState() {
                let defaultProps = Calendar.getDefaultProps();
                return defaultProps;
            },

            getCode(){
                let { color } = this.state;

                return (`
<Calendar/>
                `)
            },

            render() {
                let { icon, size, color } = this.state;
                size = ExampleHelper.ifNumber_Convert(size);

                return (
                    <SimpleExample context={this} code={ this.getCode() } scheme={ this.propScheme() } >

                            <Calendar/>
            
                    </SimpleExample>
                )
            }

        }
    }
}
