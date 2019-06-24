
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
                padding: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
                boxShadow: PropTypes.bool,
                color: PropTypes.string,
            },

            getDefaultProps(){
                return {
                    width: '100%',
                    height: 50,
                    boxShadow: false,
                    padding: 10,
                    color: 'unset'
                };
            },

            styles(s){
                let { padding, width, height, style, boxShadow, color } = this.props;
                let margin = style && style.margin || 0;

                const styles = {

                    row: {
                        width: width,
                        maxWidth: `calc(100% - ${margin}px)`,
                        minWidth: 40,
                        height: height,
                        maxHeight: `calc(100% - ${margin}px)`,
                        display: 'flex',
                        flexDirection: 'row',
                        overflow: 'hidden',
                        alignItems: 'center',
                        boxShadow: boxShadow ? units.boxShadow : '',
                        padding: padding,
                        position: 'relative',
                        background: color,
                        ...style
                    },
                }

                return(styles[s]);
            },

            render() {
                let { children ,width, height, padding, style, boxShadow, color, ...props } = this.props;

                return (
                    <div style={ this.styles('row') } {...props} >
                        { children }
                    </div>
                )
            } 

        }
    }
}
