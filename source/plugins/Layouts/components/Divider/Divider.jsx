
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
                orientation: PropTypes.oneOf(['vertical', 'horizontal']),
                color: PropTypes.string,
                thikness: PropTypes.number,
                size: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
                style: PropTypes.object,
            },

            getDefaultProps(){
                return {
                    orientation: 'vertical',
                    color: core.theme('borders.default'),
                    thikness: 1,
                    size: '100%',
                    style: {},
                };
            },

            styles(s){
                let {style, color, size, thikness} = this.props;

                const styles = {
                    vertical: {
                        height: size,
                        width: 1,
                        borderLeft: `${thikness}px solid ${color}`,
                        ...style,
                    },
                    horizontal: {
                        height: 1,
                        width: size,
                        borderTop: `${thikness}px solid ${color}`,
                        ...style,
                    }
                }

                return(styles[s]);
            },

            render() {
                let { orientation } = this.props;

                return (
                    <div id={'Divider'} style={this.styles(orientation)} />
                )
            } 

        }
    }
}
