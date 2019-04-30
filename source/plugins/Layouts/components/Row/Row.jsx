
module.exports = {
    dependencies: [],
    get() {

        var core = this;
        var { React, PropTypes, ComponentMixin } = core.imports;

        const units = {
            dim: {
                minWidth: core.dim('layouts.minRowWidth')
            },
            boxShadow: core.theme('boxShadows.row')
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
                        minWidth: units.dim.minWidth,
                        height: height,
                        maxHeight: `calc(100% - ${margin}px)`,
                        display: 'flex',
                        flexDirection: 'row',
                        overflow: 'hidden',
                        alignItems: 'center',
                        boxShadow: boxShadow ? units.boxShadow : 'unset',
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
