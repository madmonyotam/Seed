
module.exports = {
    name: 'LibraryPopup',
    dependencies: [ 'Layouts.Row', 'Simple.Label', 'Simple.Icon' ],
    get( Row, Label, Icon) {

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
                item: {
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  cursor: Boolean(onClick) ? 'pointer' : 'default',
                  opacity: disabled ? 0.75 : 1,
                  pointerEvents: disabled ? 'none' : 'auto',
                  ...style
                },
              }

              return(styles[s]);
            },
            render() {
              let {  style,  ...props } = this.props;

              return (

                <div { ...props }>
                  Library
                </div>
              )
            }
        };
    }
};
