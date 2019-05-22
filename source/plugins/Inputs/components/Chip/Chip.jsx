module.exports = {
    name: 'Chip',
    dependencies: ['Inputs.Button', 'Inputs.IconButton'],
    get(Button, IconButton) {
        
        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;
         
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

            getInitialState() {
                return {};
            },

            componentWillMount () { 
            },

            componentDidMount() {
            },

            componentWillUnmount() {
            },

            componentWillReceiveProps (nextProps) {
            }, 

            styles(s){
              let { onClick, style } = this.props;
              const styles = {
                  root: {
                    height: '32px',
                    minWidth: '32px',
                    borderRadius: 16, 
                    fontSize: 12,
                    fontWeight: 400, 
                    paddingRight: 5, 
                    paddingLeft: 5,
                    cursor: onClick ? 'pointer' : 'default',
                    ...style
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
                  <IconButton variant={ 'flat' } 
                              iconSize={ 20 }
                              background={ 'transparent' } 
                              onClick={ this.handleChipDelete }
                              icon={ deleteIcon }
                              style={{ marginRight: -5, marginLeft: 5 }} />
                )
              }
              return null;
            },

            render() {
              let { theme, variant, text } = this.props;
              return (
                <Button style={ this.styles('root')} 
                        theme={ theme } 
                        ripple={ false }
                        onClick={ this.handleChipClick }
                        variant={ variant } >
                  { text }
                  { this.renderClose() }
                </Button>
              )
            } 
        }
    }
}