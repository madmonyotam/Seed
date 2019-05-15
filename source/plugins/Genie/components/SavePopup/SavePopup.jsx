
import { Typography, Input, InputAdornment, Icon  } from '@material-ui/core';

module.exports = {
    name: "SavePopup",
    description: '',
    propTypes: {},
    dependencies: [],

    get() {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            propsTypes: {
              handleFileName: PropTypes.func,
            },

            getInitialState() {
              return {
                fileName: ''
              };
            },
            
            componentWillMount() {
              this.initUnits()
            },
            
            initUnits(){
              this.colors = {
                emptyColor: core.theme('buttons.grey')
              }
            },

            styles(propName) {
              let styles = {
                root: { height: 150, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', paddingBottom: '50px' },
                emptySpaces: { color: this.colors.emptyColor, fontSize: 11, marginTop: 10 },
                icon: { fontSize: 16, color: this.colors.emptyColor }
              }
              return styles[propName]
            },

            handleChange(event){
              var str = event.target.value;
              if (this.props.handleFileName) {
                this.props.handleFileName(str);
              }
              this.setState({ fileName: str })
            },

            render() {
              return (

                <div style={ this.styles('root') }>
                  <Input
                    id={ 'input-fileName' }
                    inputProps={{ style: { fontSize: 14 } }}
                    fullWidth={ true }
                    required={ true }
                    value={ this.state.fileName }
                    onChange={ this.handleChange }
                    autoFocus={ true }
                    placeholder={ core.translate('fileName', 'File Name')  }
                    startAdornment={
                      <InputAdornment position="start">
                        <Icon style={ this.styles('icon') }>{core.icons('files.edit')}</Icon>
                      </InputAdornment>
                    }
                  />
                  <Typography style={ this.styles('emptySpaces') }>
                    {'* '+core.translate('emptySpaces','Empty spaces will be saved as underscore')}
                  </Typography>

                </div>

              )
            }
        }
    }
}
