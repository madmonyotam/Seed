import moment from 'moment';
window.moment = moment;
module.exports = {
  
  dependencies: [ 'Layouts.Center', 'Decorators.Tooltip', 'Buttons.Button'],    

  get(Center, Tooltip, Button) {

    var core = this;
    var { React, PropTypes, ComponentMixin } = core.imports; 
    const units = {
      colors: {
        text: core.theme('calendar.text'),
        textSelected: core.theme('calendar.textSelected'),
        textOutOfMonth: core.theme('calendar.textOutOfMonth'),
        calendarRange: core.theme('calendar.rangeHover'),
      }
    }

    return {
      mixins: [ ComponentMixin ],

      propsTypes: {
        onSelect: PropTypes.func,
        current: PropTypes.string,
        dayDate: PropTypes.string,
      }, 

      getDay(){
        let { dayDate } = this.props;
        return moment(dayDate)
      },

      getCurrent(){
        let { current } = this.props;
        return moment(current)
      },

      getDisabled(){
        let current = this.getCurrent();
        let day = this.getDay();
        let startOfMonth = moment(current).startOf('month').format();
        let endOfMonth = moment(current).endOf('month').format();
        return moment(day.format()).isBefore(startOfMonth) || moment(day.format()).isAfter(endOfMonth) 
      },

      isCurrent(){
        let day = this.getDay();
        let current = this.getCurrent()
        return moment(day).isSame(current, 'day')
      },

      isStart(){
        let {startDate} = this.props;
        let day = this.getDay();
        return moment(startDate).isSame(day, 'day')
      },

      handleOnMouseEnter(){
        let {onHoverDate} = this.props;
        if(onHoverDate) {
          let day = this.getDay();
          onHoverDate(day)
        }
      },

      isInRange(){
        let {startDate,hoverDate} = this.props;
        let day = this.getDay();

        if( moment(day).isBetween(startDate,hoverDate) || moment(day).isBetween(hoverDate,startDate)) return true;
        else return false;
      },

      render() {
        let { onSelect, dayDate } = this.props;

        let day = this.getDay();
        let disabled = this.getDisabled()
        let formatted = day.format('DD'); 
        let textColor = this.isCurrent() || this.isStart() ? units.colors.textSelected : units.colors.text; 
        textColor = disabled ? units.colors.textOutOfMonth : textColor; 
        let isInRange = this.isInRange();

        return (
          <Center>
            <Button variant={ 'flat' } 
                    theme={ this.isCurrent() || this.isStart() ? 'primary' : 'default' }
                    round={ false } 
                    textColor={ textColor }
                    width={ '100%' } 
                    height={ '100%' } 
                    onClick={ e => { onSelect(dayDate) } }
                    onMouseEnter={ this.handleOnMouseEnter }
                    backgroundColor={ isInRange? units.colors.calendarRange : null }
                    > 

              { formatted }

            </Button>
          </Center>
        )
      } 

    }
  }
}
