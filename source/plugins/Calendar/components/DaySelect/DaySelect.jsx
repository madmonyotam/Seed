import moment from 'moment';
window.moment = moment;
import { isEmpty as _isEmpty } from 'lodash';

module.exports = {
  
  dependencies: ['Calendar.Day', 'Layouts.Row', 'Layouts.Column','Calendar.DatePickerDay'],

  get(Day, Row, Column, DatePickerDay) {

    var core = this;
    var { React, PropTypes, ComponentMixin } = core.imports; 

    return {
      mixins: [ ComponentMixin ],

      propsTypes: {
        onSelect: PropTypes.func,
        currentDate: PropTypes.string,
        firstDayInWeek: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ])
      }, 

      styles(s){

        const styles = {
          root: {
            border: '1px solid black'
          },
          icon: {
            cursor: 'pointer',
            margin: '0 5px'
          }
        }

        return(styles[s]);
      },  

      renderWeek(weekIndex, key){
        let { firstDayInWeek, currentDate } = this.props;
        let firstDayOfMonth = moment(currentDate).startOf('month');
        
        if(firstDayInWeek > 6 || firstDayInWeek < 0) firstDayInWeek = 0;
        
        let firstDay = moment(firstDayOfMonth).add(1, 'weeks').startOf('week').isoWeekday(firstDayInWeek); 

        if (moment(firstDayOfMonth).isBefore(moment(firstDay)) ) {
          firstDay = moment(firstDay).subtract(1, 'weeks') 
        }

        let week = []; 
        let next = firstDay.add(weekIndex, 'days'); 

        week.push(next.format());

        const getWeeks = () => {
          for (let x = 1; x <= 6; x++ ) {
            week.push( next.add(1, 'days').format() )
          }
          return week
        }

        return (
          <Row key={ key } padding={ 0 } height={ 'calc( 100% / 6 )' } style={{ minHeight: 50 }} >
            {
              getWeeks().map(this.renderDay)
            }
          </Row>
        )

      },

      renderDay(day, i){
        let { currentDate, onSelect, datePickerProps } = this.props;

        if( _isEmpty(datePickerProps) ) return <Day key={ i } dayDate={ day } current={ currentDate } onSelect={ onSelect } />
        
        return (
          <DatePickerDay 
            key={ i } 
            dayDate={ day } 
            current={ currentDate } 
            onSelect={ onSelect } 
            datePickerProps={datePickerProps}/>
        )
      },

      render() {
        let rows = [ 0, 7, 14, 21, 28, 35 ] 
        
        return (
          <Column style={{ padding: '0' }} height={ 'calc(100% - 100px)' } width={ '100%' }>
            { rows.map(this.renderWeek) }
          </Column>
        )
      } 
    }
  }
}
