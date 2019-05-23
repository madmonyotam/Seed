
module.exports = {
    dependencies: ['Examples.ExampleHelper', 'Examples.SimpleExample','Calendar.Calendar'],
    get(ExampleHelper, SimpleExample, Calendar) {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            propScheme(){ 
                return {
                    firstDayInWeek: { type: 'number', group: 'initial' },
                    daysShortName: { type: 'boolean'  },
                    monthShortName: { type: 'boolean'},
                    width: { type: 'string'},
                    height: { type: 'string'}
                }
            },

            getInitialState() {
                let defaultProps = Calendar.getDefaultProps();
                return defaultProps;
            },

            getCode(){
                let { firstDayInWeek, daysShortName, monthShortName, width, height } = this.state;

                return (`
<Calendar/>
                `)
            },

            render() {
                let { firstDayInWeek, daysShortName, monthShortName, width, height } = this.state;
                firstDayInWeek = Number(firstDayInWeek);
                width = ExampleHelper.ifNumber_Convert(width);
                height = ExampleHelper.ifNumber_Convert(height);

                return (
                    <SimpleExample context={this} code={ this.getCode() } scheme={ this.propScheme() } >

                            <Calendar   width={width}
                                        height={height}
                                        firstDayInWeek={firstDayInWeek} 
                                        daysShortName={daysShortName}
                                        monthShortName={monthShortName}  />
            
                    </SimpleExample>
                )
            }

        }
    }
}
