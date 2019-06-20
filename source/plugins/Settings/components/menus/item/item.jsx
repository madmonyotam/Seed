 
module.exports = {
    name: 'MenuItem',
    dependencies: [ 'Layouts.Row', 'Simple.Label', 'Simple.Icon'],
    get( Row, Label, Icon) {

        var core = this; 
        var { React, PropTypes } = core.imports; 
        
        var units = { 
          colors: { 
            hovered: core.theme('backgrounds.disabled'),
            border: core.theme('borders.default')
          },
        } 

        return {

            propsTypes: {
              icon: PropTypes.string, 
              iconPosition: PropTypes.oneOf(['left', 'right']), 
              iconSize: PropTypes.number, 
              iconStyle: PropTypes.object, 
              label: PropTypes.string, 
              labelColor: PropTypes.string,
              labelStyle: PropTypes.object,
              divider: PropTypes.bool,
              padding: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
              ]), 
              height: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
              ]), 
              onClick: PropTypes.func,
              onMouseEnter: PropTypes.func,
              onMouseLeave: PropTypes.func
            },


            getDefaultProps() {
                return {
                  iconPosition: 'left', 
                  iconSize: 16, 
                  padding: '5px 10px', 
                  height: 30, 
                  label: core.translate('menu item'), 
                };
            }, 

            getInitialState(){
              return {
                hovered: false
              }
            },

            styles(s) {
              let { onClick, style } = this.props;
              let { hovered } = this.state;
              let styles = {  
                item: {
                  background: hovered ? units.colors.hovered : 'transparent',
                  display: 'flex', 
                  alignItems: 'center',
                  cursor: Boolean(onClick) ? 'pointer' : 'default', 
                  ...style
                }, 
              }
              
              return(styles[s]);
            },   

            onMouseEnter(e){
              let { onMouseEnter } = this.props;
              if (onMouseEnter) onMouseEnter(e)
              this.setState({ hovered: true })
            },

            onMouseLeave(e){
              let { onMouseLeave } = this.props;
              if (onMouseLeave) onMouseLeave(e);
              this.setState({ hovered: false })

            },

            render() {
              let { 
                height, 
                onClick, 
                icon, 
                iconColor, 
                iconPosition, 
                iconSize, 
                iconStyle,
                padding, 
                label, 
                labelColor, 
                labelStyle,
                divider, 
                style,
                ...props } = this.props;
              if (divider) {
                return <Row height={ 1 } style={{ margin:'5px 0',borderBottom: `1px solid ${units.colors.border}`, ...style }} padding={ 0 } ></Row>
              }
              return (
                <Row  height={ height } 
                      style={ this.styles('item') } 
                      padding={ padding } 
                      onClick={ onClick } 
                      onMouseEnter={ this.onMouseEnter }
                      onMouseLeave={ this.onMouseLeave }
                      { ...props }>
                  { icon && iconPosition === 'left' ? <Icon size={ iconSize } icon={ icon } color={ iconColor } style={ iconStyle } /> : null }
                  <Label label={ label } color={ labelColor } style={ labelStyle }/>
                  { icon && iconPosition === 'right' ? <Icon size={ iconSize } icon={ icon } color={ iconColor } style={ iconStyle } /> : null }
                </Row>
              ) 
            }
        };
    }
};
