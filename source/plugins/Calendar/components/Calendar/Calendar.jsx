module.exports = {
    dependencies: ['Layouts.Column','Calendar.YearSelect','Calendar.DaysBar','Calendar.MonthPicker'],    
    get(Column, YearSelect, DaysBar, MonthPicker) {
        
        var core = this;
        var { React, PropTypes, ComponentMixin } = core.imports;

        const DAY = 1;
        const MONTH = 2;
        const units = {}

        return {
            mixins: [ ComponentMixin ],

            propsTypes: {
                firstDayInWeek: PropTypes.number,
            },

            getDefaultProps(){
                return {
                    daysShortName: true,
                    firstDayInWeek: 1
                };
            },
            
            getInitialState() {
                return {
                    picker: DAY
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

            renderMonthPicker(){
                return(
                    <MonthPicker />
                )
            },

            renderWeeks(){

            },

            renderMainCont(){
                let { picker } = this.state

                switch (picker) {
                    case MONTH:
                        return this.renderMonthPicker()
                    case DAY:
                        return this.renderWeeks()

                }
            },

            renderDaysBar(){
                let { daysShortName, firstDayInWeek } = this.props;
                let { picker } = this.state;

                if(picker!==DAY) return;

                return(
                    <DaysBar firstDayInWeek={firstDayInWeek} shortName={daysShortName} />
                )
            },

            handleToggleView(){
                let { picker } = this.state;

                if(picker == DAY) return this.setState({picker:MONTH});
                this.setState({picker:DAY});
            },

            handleChange(newDate) {
              console.debug('newDate => ', newDate);
            },

            render() {

                return (
                    <Column boxShadow={true} width={500} >
                      <YearSelect onChange={ this.handleChange } 
                                  onPickerChange={ this.handleToggleView }
                                  pickerState={ this.state.picker } />

                        { this.renderDaysBar() }
                        { this.renderMainCont() } 
                    </Column>
                )
            } 

        }
    }
}
