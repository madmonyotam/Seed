import moment from 'moment';

module.exports = {
    dependencies: ['Layouts.Column','Calendar.YearSelect','Calendar.DaySelect','Calendar.DaysBar', 'Calendar.MonthPicker'],    
    get(Column, YearSelect, DaySelect, DaysBar, MonthPicker) {
        
        var core = this;
        var { React, PropTypes, ComponentMixin } = core.imports;

        const DAY = 1;
        const MONTH = 2;
        const units = {}

        return {
            mixins: [ ComponentMixin ],

            propsTypes: {
                firstDayInWeek: PropTypes.number,
                daysShortName: PropTypes.bool,
                monthShortName: PropTypes.bool,
                width: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
                height: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
            },

            getDefaultProps(){
                return {
                    daysShortName: true,
                    monthShortName: false,
                    firstDayInWeek: 1,
                    width: 500,
                    height: 500
                };
            },
            
            getInitialState() {
                return {
                    picker: DAY,
                    currentDate: moment().format()
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
                    wrapper: {
                       minWidth: 300,
                       minHeight: 300,
                    },
                
                }
                
                return(styles[s]);
            },

            renderMonthPicker(){
                let { monthShortName } = this.props;
                return(
                    <MonthPicker onSelect={ this.handleMonthChange } shortName={monthShortName}/>
                )
            },

            renderWeeks(){
              return <DaySelect currentDate={ this.state.currentDate } onSelect={ this.handleDayChange }/>
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

                return <DaysBar firstDayInWeek={firstDayInWeek} shortName={daysShortName} />
            },

            handleToggleView(){
                let { picker } = this.state;

                if(picker == DAY) return this.setState({picker:MONTH});
                this.setState({picker:DAY});
            },

            handleYearChange(newDate) {
              let currentDate = moment([newDate.year, newDate.month, 1]).format();
              this.setState({ currentDate: currentDate })
            },

            handleMonthChange(month){
              let { currentDate } = this.state;
              let year = moment(currentDate).year();
              let newDate = moment([year, month.key-1, 1]).format();
              this.setState({ currentDate: newDate }, this.handleToggleView)
            },
            
            handleDayChange(date){
              this.setState({ currentDate: moment(date).format() })

            },
            
            render() {
              let { picker, currentDate } = this.state;
              let { width, height } = this.props;


                return (
                    <Column boxShadow={true} width={width} height={height} style={this.styles('wrapper')} >
                      <YearSelect onChange={ this.handleYearChange } 
                                  currentDate={ currentDate }
                                  onPickerChange={ this.handleToggleView }
                                  pickerState={ picker } />

                        { this.renderDaysBar() }
                        { this.renderMainCont() } 
                    </Column>
                )
            } 

        }
    }
}
