module.exports = {
    dependencies: ['Layouts.Column','Calendar.YearSelect','Calendar.DaysBar'],    
    get(Column, YearSelect, DaysBar) {
        
        var core = this;
        var { React, PropTypes, ComponentMixin } = core.imports;

        const units = {}

        return {
            mixins: [ ComponentMixin ],

            propsTypes: {
                firstDayInWeek: PropTypes.number,
            },

            getDefaultProps(){
                return {
                    daysShortName: true,
                    firstDayInWeek: 1,
                };
            },
            
            getInitialState() {
                return {
                    picker: 'day'
                };
            },

            componentWillMount () {
            },

            componentDidMount() {
            },

            componentWillReceiveProps (nextProps) {
            },

            componentWillUnmount () {
                
            },

            styles(s){

                const styles = {
                    root: {
                       border: '1px solid black'
                    },
                
                }
                
                return(styles[s]);
            },

            renderMainCont(){
                let { picker } = this.state

                // switch (picker) {
                //     case 'month':
                //         return this.renderMonthPicker()
                //     case 'day':
                //         return this.renderWeeks()

                // }
            },

            renderDaysBar(){
                let { daysShortName, firstDayInWeek } = this.props;

                return(
                    <DaysBar firstDayInWeek={firstDayInWeek} shortName={daysShortName} />
                )
            },

            render() {

                return (
                    <Column boxShadow={true} width={500} >
                      <YearSelect />
                        { this.renderDaysBar() }
                        {/* { this.renderMonthYearsBar() }
                        { this.renderMainCont() } */}

                    </Column>
                )
            } 

        }
    }
}
