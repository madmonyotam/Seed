module.exports = {
    name: 'Chip',
    dependencies: ['Inputs.Button', 'Simple.Icon'],
    get(Button, Icon) {
        
        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;
        const units = {
          colors: {
            white: core.theme('colors.white'),
            dark: core.theme('colors.dark')
          }
        }
        return {
            mixins: [ ComponentMixin ],

            propsTypes: {
              text: PropTypes.string,   
              onDelete: PropTypes.func,
              onClick: PropTypes.func,
              style: PropTypes.object,
              deleteIcon: PropTypes.string,
              variant: PropTypes.oneOf([ 'raised', 'outlined', 'flat' ]),
              theme: PropTypes.oneOf([ 'default', 'primary', 'secondary' ])
            },

            getDefaultProps(){
              return {
                text: 'Basic',
                onClick: undefined,
                onDelete: undefined,
                variant: 'flat',
                theme: 'default',
                deleteIcon: core.icons('general.delete')
              };
            },

            styles(s){
              let { onClick, style, variant, theme } = this.props;
              let color, 
                  isDefaultTheme = theme === 'default',
                  isOutlined = variant === 'outlined';
 
              if ( isOutlined ) color = units.colors.dark;
              else if (!isDefaultTheme) color = units.colors.white; 

              const styles = {
                  root: {
                    height: '28px',
                    minWidth: '28px',
                    borderRadius: 16, 
                    fontSize: 12,
                    fontWeight: 400, 
                    paddingRight: 5, 
                    paddingLeft: 5,
                    cursor: onClick ? 'pointer' : 'default',
                    ...style
                  },
                  icon: {
                    cursor: 'pointer', 
                    marginRight: -5, 
                    marginLeft: 5,
                    transition: 'color 0.15s ease-in-out',
                    color: color
                  }
                }
                return(styles[s]);
            },

            handleChipClick(e) {
              let { onClick, text } = this.props;
              if (onClick && onClick !== undefined) onClick(e, text)
            }, 
            handleChipDelete(e) {
              let { onDelete, onClick, text } = this.props;
              if (onDelete && onDelete !== undefined) {
                if (onClick && e && e.stopPropagation) e.stopPropagation()
                onDelete(e, text)
              }
            }, 

            renderClose() {
              let { onDelete, deleteIcon } = this.props;
              if (onDelete && onDelete !== undefined) {
                return (
                  <Icon size={ 15 }
                        onClick={ this.handleChipDelete }
                        icon={ deleteIcon }
                        style={ this.styles('icon') } />
                )
              }
              return null;
            },

            render() {
              let { theme, variant, text, children } = this.props;
              return (
                <Button style={ this.styles('root')} 
                        theme={ theme } 
                        ripple={ false }
                        onClick={ this.handleChipClick }
                        variant={ variant } >
                  { text || children }

                  { this.renderClose() }
                  
                </Button>
              )
            } 
        }
    }
}