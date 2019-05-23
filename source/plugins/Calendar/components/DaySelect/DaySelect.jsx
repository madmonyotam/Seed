import moment from 'moment';
window.moment = moment;
module.exports = {
  
  dependencies: ['Layouts.Row', 'Layouts.Column', 'Layouts.Center', 'Decorators.Tooltip', 'Inputs.IconButton', 'Inputs.Button', 'Calendar.Day'],    

  get(Row, Column, Center, Tooltip, IconButton, Button, Day) {

    var core = this;
    var { React, PropTypes, ComponentMixin } = core.imports;
    var { Fragment } = React;
    const units = {}

    return {
      mixins: [ ComponentMixin ],

      propsTypes: {
        onDaySelect: PropTypes.func,
        currentDate: PropTypes.string,
      },

      getDefaultProps(){
        return { 
        };
      },

      getInitialState() {
        return { 
        };
      },

      componentDidMount() { 
      }, 

      componentWillReceiveProps (nextProps) {
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
        let firstDayOfMonth = moment(this.props.currentDate).startOf('month');
        let week = []; 
        let firstDay = moment(firstDayOfMonth).startOf('week')
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
        return <Day key={ i } 
                    date={ day } 
                    current={ this.props.currentDate } 
                    onSelect={ this.props.onSelect } /> 
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
