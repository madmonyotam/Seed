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
      },

      getDefaultProps(){
        return { };
      },

      getInitialState() {
        return { 
          currentDate: moment()
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
        let prevDate = moment(currentDate).subtract(1, momentKey);
        this.setState({ currentDate: prevDate })
      },

      handleNext(momentKey){
        let { currentDate } = this.state;
        let prevDate = moment(currentDate).add(1, momentKey);
        this.setState({ currentDate: prevDate })
      },


      renderMainDate(){
        let { currentDate } = this.state;
        return (
          <Button style={ this.styles('mainDate') }> 
            { moment(currentDate).format('MMM YYYY') } 
          </Button>
        )
      },



      renderPrevious(){
        return (
          <Fragment>

            <Tooltip content={ 'Previous year' } position={ 'left' } offsetY={ 0 }>
              <IconButton icon={ core.icons('navigate.left') } 
                    style={ this.styles('icon') } 
                    variant={ 'outlined' }
                    size={ 19 } 
                    onClick={ e => { this.handlePrevious('years') } } />
            </Tooltip>

            <Tooltip content={ 'Previous month' } position={ 'left' } offsetY={ 0 }>

              <IconButton icon={ core.icons('navigate.arrow_left') } 
                    variant={ 'outlined' }
                    style={ this.styles('icon') } 
                    onClick={ e => { this.handlePrevious('months') } } />
            </Tooltip>



          </Fragment>
        )
      },

      renderNext(){
        return (
          <Fragment>
            <Tooltip content={ 'Next month' } position={ 'right' } offsetY={ 0 }>
            
              <IconButton icon={ core.icons('navigate.arrow_right') } 
                    style={ this.styles('icon') } 
                    variant={ 'outlined' }
                    onClick={ e => { this.handleNext('months') } } />
            </Tooltip>

            <Tooltip content={ 'Next year' } position={ 'right' } offsetY={ 0 }>
              <IconButton icon={ core.icons('navigate.right') }
                    size={ 19 } 
                    style={ this.styles('icon') } 
                    variant={ 'outlined' }
                    onClick={ e => { this.handleNext('years') } } />
            </Tooltip>

          </Fragment>
        )
      },

      render() {

        return (
          <Row boxShadow={ true } width={ '100%' } height={ 50 } padding={ 15 } style={{ justifyContent: 'center' }} >       
            { this.renderPrevious() }

            { this.renderMainDate() }
            
            { this.renderNext() }
          </Row>
        )
      } 

    }
  }
}
