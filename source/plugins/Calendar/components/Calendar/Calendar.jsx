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
                onDaySelect: PropTypes.func,
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
                    firstDayInWeek: 0,
                    width: 400,
                    height: 400,
                    onDaySelect: (date) => { console.log('onDaySelect -',date) }
                };
            },
            
            getInitialState() {
                let { defaultDate } = this.props;
                return {
                    picker: DAY,
                    currentDate: defaultDate || moment().format()
                };
            }, 
 
            styles(s){

                const styles = {
                    wrapper: {
                       minWidth: 400,
                       minHeight: 400,
                    },
                
                }
                
                return(styles[s]);
            },

            handleToggleView(){
                let { picker } = this.state;

                if(picker == DAY) return this.setState({picker:MONTH});
                this.setState({picker:DAY});
            },

            handleYearChange(newDate) {
              let { onDaySelect,ignoreYearChange } = this.props; 
              let currentDate = moment([newDate.year, newDate.month, 1]).format();
              this.setState({ currentDate: currentDate })
              if(ignoreYearChange) return;
              onDaySelect(currentDate)

            },

            handleMonthChange(month){
              let { currentDate } = this.state;
              let { onDaySelect,ignoreMonthChange } = this.props; 
              let year = moment(currentDate).year();
              let newDate = moment([year, month.key-1, 1]).format();
              this.setState({ currentDate: newDate }, this.handleToggleView)
              if(ignoreMonthChange) return;
              onDaySelect(newDate)

            },
            
            handleDayChange(date){
              let { onDaySelect } = this.props; 
              this.setState({ currentDate: moment(date).format() })
              onDaySelect(moment(date).format())
            },

            handleSetToday(today){
              this.setState({ currentDate: today.full })
              let { onDaySelect } = this.props; 
              onDaySelect(today.full)

            },

            renderMonthPicker(){
                let { monthShortName } = this.props;
                let { currentDate } = this.state;
                let currentMonth = moment(currentDate).month()+1;

                return(
                    <MonthPicker onSelect={ this.handleMonthChange } shortName={monthShortName} currentMonth={currentMonth}/>
                )
            },

            renderWeeks(){
              let { firstDayInWeek, startDate, onHoverDate, hoverDate } = this.props;
              return (
                <DaySelect 
                    onHoverDate={onHoverDate} 
                    hoverDate={hoverDate} 
                    startDate={startDate} 
                    firstDayInWeek={firstDayInWeek} 
                    currentDate={ this.state.currentDate } 
                    onSelect={ this.handleDayChange }/>
              )
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

            render() {
              let { picker, currentDate } = this.state;
              let { width, height } = this.props;


                return (
                    <Column boxShadow={true} width={width} height={height} style={this.styles('wrapper')} >
                      <YearSelect onChange={ this.handleYearChange } 
                                  currentDate={ currentDate }
                                  onToday={ this.handleSetToday }
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
