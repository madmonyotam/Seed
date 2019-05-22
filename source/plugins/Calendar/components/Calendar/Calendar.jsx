module.exports = {
    dependencies: ['Layouts.Column','Calendar.DaysBar'],    
    get(Column, DaysBar) {
        
        var core = this;
        var { React, PropTypes, ComponentMixin } = core.imports;

        const units = {}

        return {
            mixins: [ ComponentMixin ],

            propsTypes: {
                text: PropTypes.string,
            },

            getDefaultProps(){
                return {
                    text: 'my first  calendar',
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
                return(
                    <DaysBar firstDayInWeek={2} shortName={true} />
                )
            },

            render() {

                return (
                    <Column boxShadow={true} width={350} >
                        { this.renderDaysBar() }
                        {/* { this.renderMonthYearsBar() }
                        { this.renderMainCont() } */}

                    </Column>
                )
            } 

        }
    }
}
