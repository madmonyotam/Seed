
module.exports = {
    name: 'LibraryPopup',
    dependencies: [ 'Layouts.Row', 'Inputs.Input' ],
    get( Row, Input) {

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
              }
            },

            styles(s) {
              let { onClick, style, disabled } = this.props;
              let { hovered } = this.state;
              let styles = {
                root: {
                  padding: '15px 35px',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                },
              }

              return(styles[s]);
            },
            render() {
              let {  style,  ...props } = this.props;

              return (

                <div { ...props } style={{ ...this.styles('root'), ...style }}>
                  
                  <Input 
                    type={ 'text' } 
                    placeholder={ core.translate('Enter library name') } 
                    theme={ 'outlined' } 
                    isMultipleValues={ false } />
                </div>
              )
            }
        };
    }
};
