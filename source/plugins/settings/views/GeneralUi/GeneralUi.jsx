import {  Typography, Switch, IconButton,
  Paper, Icon, Menu, Input, InputAdornment,
  MenuItem, Popper
} from '@material-ui/core';

module.exports = {
    name: "GeneralUi",
    description: '',
    propTypes: {},
    dependencies: ['SimpleSwitch.Helper', 'componentsCollection.NoResults', 'componentsCollection.Loader'],
    bindings: {
      config: ['config'],
    },

    get(Helper, NoResults, Loader) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
              data: PropTypes.object,
              parentKey: PropTypes.string
            },

            getDefaultProps(){
                return {
                  data: {},
                  parentKey: ''
                };
            },

            getInitialState() {
                return {
                  data: {},
                };
            },
            
            componentWillMount() {
              this.initUnits()
            },
            
            componentDidMount() {
              this.isUnmounted = false;
              if (this.props.data) this.setState({ data: this.props.data })
            },
              
            componentWillUnmount() {
              this.isUnmounted = true;
            },
            
            componentWillReceiveProps(nextProps) {
              if (nextProps.data && ( !_.isEqual(nextProps.data, this.props.data)) ) {
                this.setState({ data: nextProps.data })
              } 
            }, 

            initUnits(){
              this.borderColor = core.theme('colors.borderLight');
              this.emptyColor = core.theme('colors.gray');
            },

            styles(propName) {
              let styles = {
                main: {
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%'
                },
                parentPaper: { 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: 300,
                  minHeight: 400,
                  maxHeight: '100%',
                  width: '65%',
                  padding: '15px',
                  margin: '0 auto' ,
                  overflowY: 'auto'
                },
                itemRow: {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  borderBottom: `1px solid ${this.borderColor}`,
                  padding: '5px 0',
                  height: 40,
                  minHeight: 40
                },
                icon: { fontSize: 16, color: this.emptyColor }
              }
              return styles[propName]
            },

            handleChange(item, newValue){
              let { data } = this.state;
              for (let i = 0; i < data.length; i++) {
                if (data[i].key == item.key) {
                  data[i].data = newValue;
                }
              }
              this.setState({ data: data }, ()=>{
                core.plugins.Settings.set(['config', 'general', item.key], newValue);
              });
            },

            renderItems(item, idx){
              if (!item) return null;
              let typeofItem = typeof item.data; 
              if (item.key.toLowerCase() == 'apptitle' || typeofItem === 'undefined') {
                typeofItem = 'string';
              }
              return (
                <div key={ idx } style={ this.styles('itemRow') }>
                  <Typography title={ item.title } style={{ flex: 1 }} >{ item.title }</Typography>
                  <div style={{ flex: 1.5 }}>
                    { this.renderByType(item, typeofItem) }
                  </div>
                </div>
              ) 
            },

            renderByType(item, itemType){ 
              
              switch (itemType.toLowerCase()) {
                case 'boolean':
                  return (
                    <Switch
                      checked={ item.data }
                      onChange={ (e, checked) => { this.handleChange(item, checked) } }
                      value="booleanSwitch"
                    />
                  )
                  break;
              
                case 'string':
                case 'number':
                  return (
                    <Input
                      id={ 'input-value' }
                      disableUnderline={ true }
                      fullWidth={ true }
                      inputProps={{ style: { fontSize: 13, border: 'none' } }}
                      value={ item.data || '' }
                      onChange={ (e) => { this.handleChange(item, e.target.value) } }
                      startAdornment={
                        <InputAdornment position={ 'start' }>
                          <Icon style={ this.styles('icon') }>{core.icons('files.edit')}</Icon>
                        </InputAdornment>
                      }
                      autoFocus={ false }  />
                  )
                  break;
              
                default:
                  break;
              }
            },


            render() {
              let { data } = this.state;
              return (
                  <div id={'root.generalUi'} style={this.styles('main')}>
                    <Paper elevation={ 2 } style={ this.styles('parentPaper') }>
                      { _.map(data, this.renderItems) }
                    </Paper>
                  </div>
              )
            }
        }
    }
}
