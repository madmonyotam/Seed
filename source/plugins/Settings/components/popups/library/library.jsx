
module.exports = {
    name: 'LibraryPopup',
    dependencies: [ 'Layouts.Row', 'Inputs.Input' , 'Popovers.PopupHandler', 'Simple.Label'],
    get( Row, Input, Handler, Label) {

        var core = this;
        var { React, PropTypes } = core.imports;

        var units = {
          colors: {
            border: core.theme('borders.default'),
            disabled: core.theme('texts.secondary'),
          },
          backgrounds: {
            disabled: core.theme('backgrounds.disabled'),
            hovered: core.theme('texts.background')
          }
        }

        return {

            propsTypes: {

              onClose: PropTypes.func,
              anchorEl: PropTypes.object
            },

            getInitialState(){
              return {
                value: ''
              }
            },

            styles(s) {
              let { onClick, style, disabled } = this.props;
              let { hovered } = this.state;
              let styles = {
                root: {
                  padding: '15px 35px',
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                },
              }

              return(styles[s]);
            },

            handleChange(value){
              if (value && value.trim().length) {
                Handler.enableOkButton('addlibrarypopup')
                this.setState({ value }); 
                Handler.addData({ id: 'addlibrarypopup', data: value }) 
              }
            },

            render() {
              let {  style,  ...props } = this.props;
              let { value } = this.state;

              return (

                <div { ...props } style={{ ...this.styles('root'), ...style }}>
                  
                  <Input 
                    type={ 'text' } 
                    value={ value }
                    placeholder={ core.translate('Enter library name') } 
                    theme={ 'outlined' }
                    onChange={ this.handleChange } 
                    isMultipleValues={ false } />

                  <Label label={'* '+core.translate('emptySpaces','Empty spaces will be saved as underscore')} />
                </div>
              )
            }
        };
    }
};
