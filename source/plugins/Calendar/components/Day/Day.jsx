import moment from 'moment';
window.moment = moment;
module.exports = {
  
  dependencies: [ 'Layouts.Center', 'Decorators.Tooltip',  'Inputs.Button'],    

  get(Center, Tooltip, Button) {

    var core = this;
    var { React, PropTypes, ComponentMixin } = core.imports; 
    const units = {
      colors: {
        textSelected: core.theme('calendar.textSelected'),
        textOutOfMonth: core.theme('calendar.textOutOfMonth'),
      }
    }

    return {
      mixins: [ ComponentMixin ],

      propsTypes: {
        onSelect: PropTypes.func,
        date: PropTypes.string,
        isCurrent: PropTypes.bool,
      },

      getDefaultProps(){
        return { 
          isCurrent: false
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
         
        }

        return(styles[s]);
      },   
      render() {
        let day = moment(this.props.date);
        let formatted = day.format('DD');
        let startOfMonth = moment(this.props.current).startOf('month').format();
        let endOfMonth = moment(this.props.current).endOf('month').format();
        let current = moment(this.props.current)
        
        let isCurrent = moment(day).isSame(current, 'day');
        let textColor = isCurrent ? units.colors.textSelected : '#333';
        let dis = moment(day.format()).isBefore(startOfMonth) || moment(day.format()).isAfter(endOfMonth) 

        return (
          <Center>
            <Button variant={ 'flat' } 
                    theme={ isCurrent ? 'primary' : 'default' }
                    round={ false } 
                    textColor={ dis ? units.colors.textOutOfMonth : textColor }
                    width={ '100%' } 
                    height={ '100%' } 
                    onClick={ e => { this.props.onSelect(this.props.date) } }> 

              { formatted }

            </Button>
          </Center>
        )
      } 

    }
  }
}
