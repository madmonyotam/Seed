import moment from 'moment';
window.moment = moment;
module.exports = {
  
  dependencies: ['Layouts.Row', 'Layouts.Column', 'Decorators.Tooltip', 'Inputs.IconButton', 'Inputs.Button'],    

  get(Row, Column, Tooltip, IconButton, Button) {

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
        if (this.props.currentDate) {
          this.setWeeks(this.props.currentDate)
        }
      },

      setWeeks(startDate){
        let numDays = moment(startDate).daysInMonth()
        let month = moment(startDate).month();  
        let firstDay = moment(startDate).startOf('month');//.format('d');
        // let firstDay = moment(startDate).startOf('month');
        // let endDay = moment(startDate).endOf('month');

        
        // // let range = moment().range(moment(month).startOf('month'), moment(month).endOf('month'));
        // let days = range.by('days');

        // // Create a range for the month we can iterate through
        // let monthRange = moment.range(firstDay, endDay);

        // // // Get all the weeks during the current month
        // let weeks = []
        // // for (let mday of monthRange.by('days')) {
        // //   if (weeks.indexOf(mday.week()) === -1) {
        // //     weeks.push(mday.week());
        // //   }
        // // }
        // console.debug('numDays', numDays);
        // for (var end = moment(startDate).add(1, 'month'); moment(startDate).isBefore(end); moment(startDate).add(1, 'day')) {
        //   console.log('x ->',moment(startDate).format('D-ddd'));
        // }
        let day;
        let blanks = []; 
        

        // for (let i = 0; i < firstDay; i++) {
        //   blanks.push(i);
        // }
        console.debug('firstDay => ', moment(firstDay).startOf('week'));
        this.setState({ blanks })

// let weeks = []
        // for (let x = 1; x < numDays+1; x++) {
        //   day = moment(startDate).month(month).date(x);
        //   // if ()
        //   console.log('day -> ',day.format());
        //   console.log('startOfWeek -> ', day.startOf('week').format())
        //   console.log('endOfWeek -> ', day.endOf('week').format())
        //   console.log('startOfMonth -> ', moment(startDate).startOf('month').format())
        // }
        // console.debug('firstDay => ', firstDay.format());
        // console.debug('endDay => ', endDay.format());

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

      render() {

        // return (
          
        //   <Row boxShadow={ true } width={ '100%' } height={ 50 } padding={ 15 } style={{ justifyContent: 'center' }} >       
        //     { this.renderPrevious() }

        //     { this.renderMainDate() }
            
        //     { this.renderNext() }
        //   </Row>
        // )
        
        let { blanks } = this.state;

        return (
          <Column height={ 'calc(100% - 100px)' } width={ '100%' }>
            <Row>
              { blanks && blanks.length ? <span>blank</span> : null }
            </Row>
          </Column>
        )
      } 

    }
  }
}
