import moment from 'moment';

module.exports = {
  
  dependencies: ['Layouts.Row', 'Decorators.Tooltip', 'Inputs.IconButton', 'Inputs.Button'],    

  get(Row, Tooltip, IconButton, Button) {

    var core = this;
    var { React, PropTypes, ComponentMixin } = core.imports;
    var { Fragment } = React;
    const units = {}

    return {
      mixins: [ ComponentMixin ],

      propsTypes: {
        onToday: PropTypes.func,
        onChange: PropTypes.func,
        onPickerChange: PropTypes.func.isRequired,
      }, 
      
      getInitialState() {
        return { 
          currentDate: this.props.currentDate
        };
      },
 
      componentWillReceiveProps (nextProps) {
        this.setState({ currentDate: nextProps.currentDate })
      },

      styles(s){

        const styles = { 
          icon: {
            cursor: 'pointer',
            margin: '0 5px'
          },
          mainDate: {
            width: 125, 
            margin: '0 15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }

        }

        return(styles[s]);
      }, 


      handlePrevious(momentKey){
        let { currentDate } = this.state;
        let { onChange } = this.props;
        
        let prevDate = moment(currentDate).subtract(1, momentKey);
        
        let date = {
          year: moment(prevDate).year(),
          month: moment(prevDate).month(),
          full:  moment(prevDate).format()
        }
        
        if (onChange) onChange(date)
        
        this.setState({ currentDate: prevDate })
      },

      handleNext(momentKey){
        let { currentDate } = this.state;
        let { onChange } = this.props;

        let nextDate = moment(currentDate).add(1, momentKey);

        let date = {
          year: moment(nextDate).year(),
          month: moment(nextDate).month(),
          full:  moment(nextDate).format()
        }

        if (onChange) onChange(date)

        this.setState({ currentDate: nextDate })
      },

      handleToday(){
        let { onToday } = this.props;
        let date = {
          year: moment().year(),
          month: moment().month(),
          full:  moment().format()
        }
        onToday(date)
      },


      renderMainDate(){
        let { currentDate } = this.state;
        let { onPickerChange } = this.props;

        return (
          <Button variant={ 'filled' } style={ this.styles('mainDate') } onClick={ onPickerChange }> 
            { moment(currentDate).format('MMM YYYY') } 
          </Button>
        )
      }, 

      renderPrevious(){
        return (
          <Fragment>

            <Tooltip content={ 'Previous year' } position={ 'bottom' } offsetY={ 10 }  offsetX={ 0 }>
              <IconButton icon={ core.icons('navigate.left') } 
                    style={ this.styles('icon') } 
                    variant={ 'outlined' }
                    iconSize={ 22 } 
                    onClick={ e => { this.handlePrevious('years') } } />
            </Tooltip>

            <Tooltip content={ 'Previous month' } position={ 'bottom' } offsetY={ 10 }  offsetX={ 0 }>

              <IconButton icon={ core.icons('navigate.arrow_left') } 
                    variant={ 'outlined' }
                    iconSize={ 24 } 
                    style={ this.styles('icon') } 
                    onClick={ e => { this.handlePrevious('months') } } />
            </Tooltip>



          </Fragment>
        )
      },

      renderNext(){
        return (
          <Fragment>

            <Tooltip content={ 'Next month' } position={ 'bottom' } offsetY={ 10 }  offsetX={ 0 }>
              <IconButton icon={ core.icons('navigate.arrow_right') } 
                    style={ this.styles('icon') } 
                    variant={ 'outlined' }
                    iconSize={ 24 } 
                    onClick={ e => { this.handleNext('months') } } />
            </Tooltip>

            <Tooltip content={ 'Next year' } position={ 'bottom' } offsetY={ 10 }  offsetX={ 0 }>
              <IconButton icon={ core.icons('navigate.right') }
                    iconSize={ 22 } 
                    style={ this.styles('icon') } 
                    variant={ 'outlined' }
                    onClick={ e => { this.handleNext('years') } } />
            </Tooltip> 

          </Fragment>
        )
      },

      renderToday(){
        return (
          <div style={{ position: 'absolute', right: '15px' }}>

           <Tooltip content={ 'Today' } position={ 'bottom' } offsetY={ 10 }  offsetX={ 0 }>
              <IconButton icon={ core.icons('calendar.today') }
                    iconSize={ 18 } 
                    style={ this.styles('icon') } 
                    variant={ 'outlined' }
                    onClick={ e => { this.handleToday() } } />
            </Tooltip>
          </div>
        )
      },

      render() {

        return (
          <Row boxShadow={ true } width={ '100%' } height={ 50 } padding={ 15 } style={{ justifyContent: 'center' }} >       
            { this.renderPrevious() }

            { this.renderMainDate() }
            
            { this.renderNext() }

            { this.renderToday() }
          </Row>
        )
      } 

    }
  }
}
