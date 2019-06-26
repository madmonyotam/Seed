
module.exports = {
    dependencies: ['Examples.ExampleHelper', 'Examples.SimpleExample','Calendar.DatePicker','Buttons.Button'],
    get(ExampleHelper, SimpleExample, DatePicker,Button) {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            propScheme(){ 
                return {
                    isRange: { type: 'boolean'  },
                }
            },

            getInitialState() {
                let defaultProps = DatePicker.getDefaultProps();
                return defaultProps;
            },

            getCode(){

                return (`
<DatePicker
    onDatesSelect={this.handleDates}
    isRange={${this.state.isRange}}
    onSelectedRange={this.handleSelectedRange}>

    <Button>Click Me To Open Date Picker</Button>

</DatePicker>

                `)
            },

            handleDates(dates){
                console.log('dates', dates)
            },

            render() {
                let { isRange } = this.state;

                return (
                    <SimpleExample  context={this} 
                    code={ this.getCode() } 
                    scheme={ this.propScheme() } 
                    codeHeight={ '40%' }
                    exampleHeight={ '60%' } >
                            <DatePicker
                                onDatesSelect={this.handleDates}
                                isRange={isRange}
                                >
                                <Button>Click Me To Open Date Picker</Button>
                            </DatePicker>
                    </SimpleExample>
                )
            }

        }
    }
}
