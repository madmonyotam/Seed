
module.exports = {
    dependencies: [],
    get() {
        
        var core = this;
        var { React, PropTypes, ComponentMixin } = core.imports;

        const units = {
            boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 1px -1px rgba(0, 0, 0, 0.12)",
        }

        return {
            mixins: [ ComponentMixin ],

            propsTypes: {
                width: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
                height: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
                boxShadow: PropTypes.bool,
                color: PropTypes.string,
            },

            getDefaultProps(){
                return {
                    width: 200,
                    height: '100%',
                    boxShadow: false,
                    color: 'unset'
                };
            },
            
            getInitialState() {
                return {

                };
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
                let { width, height, style, boxShadow, color } = this.props;
                let margin = style && style.margin || 0;

                const styles = {
                    column: {
                        width: width,
                        maxWidth: `calc(100% - ${margin}px)`,
                        height: height,
                        maxHeight: `calc(100% - ${margin}px)`,
                        overflow: 'auto',
                        position: 'relative',
                        boxShadow: boxShadow ? units.boxShadow : 'unset',
                        background: color,
                        ...style
                    },
                }

                return(styles[s]);
            },

            render() {
                let { children, width, height, style, boxShadow, color, ...props } = this.props;

                return (
                    <div style={ this.styles('column') } { ...props } >
                        { children }
                    </div>
                )
            } 

        }
    }
}
