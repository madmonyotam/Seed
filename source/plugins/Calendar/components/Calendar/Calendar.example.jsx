
module.exports = {
    dependencies: ['Layouts.Row', 'Examples.ExampleHelper', 'Examples.SimpleExample','Calendar.Calendar'],
    get(Row, ExampleHelper, SimpleExample, Calendar) {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            propScheme(){ 
                return {
                    firstDayInWeek: { type: 'number', group: 'initial' },
                    daysShortName: { type: 'boolean'  }
                }
            },

            getInitialState() {
                let defaultProps = Calendar.getDefaultProps();
                return defaultProps;
            },

            getCode(){
                let { firstDayInWeek, daysShortName } = this.state;

                return (`
<Calendar/>
                `)
            },

            render() {
                let { firstDayInWeek, daysShortName } = this.state;
                firstDayInWeek = Number(firstDayInWeek);

                return (
                    <SimpleExample context={this} code={ this.getCode() } scheme={ this.propScheme() } >

                            <Calendar firstDayInWeek={firstDayInWeek} daysShortName={daysShortName}  />
            
                    </SimpleExample>
                )
            }

        }
    }
}
