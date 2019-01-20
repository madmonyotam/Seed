
import { Typography, Input, InputAdornment, Icon  } from '@material-ui/core';

module.exports = {
    name: "CategoryPopup",
    description: '',
    propTypes: {},
    dependencies: [],

    get() {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
              handleCatName: PropTypes.func,
            },

            getInitialState() {
              return {
                categoryName: ''
              };
            },

            
            componentWillMount() {
              this.initUnits()
            },

            initUnits(){
              this.emptyColor = core.theme('colors.gray');
            },
            
            styles(propName) {
              let styles = {
                root: { height: 150, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', paddingBottom: '50px' },
                emptySpaces: { color: this.emptyColor, fontSize: 11, marginTop: 10 },
                icon: { fontSize: 16, color: this.emptyColor }
              }
              return styles[propName]
            },


            handleChange(event){
              var str = event.target.value;
              if (this.props.handleCatName) {
                this.props.handleCatName(str);
              }
              this.setState({ categoryName: str })
            },

            render() {
              return (

                <div style={this.styles('root')}>
                  <Input
                    id={ 'input-categoryName' }
                    inputProps={{ style: { fontSize: 14 } }}
                    fullWidth={ true }
                    required={ true }
                    value={ this.state.categoryName }
                    onChange={ this.handleChange }
                    autoFocus={ true }
                    placeholder={ core.translate('categoryName', 'Category Name')  }
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
