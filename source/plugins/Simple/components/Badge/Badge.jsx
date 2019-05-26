
module.exports = {
    name: "Badge",
    description: '',
    dependencies: [],    

    get() {
        var core = this;
        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                size: PropTypes.number,
                count: PropTypes.number,
                style: PropTypes.object,
            },

            getDefaultProps(){
                return {
                    size:1,
                    count:0
                };
            },
            
            getInitialState() {
                return {};
            },

            componentDidMount() {},
            
            componentDidCatch(err){},

            styles(s) {
                let { size, style } = this.props;

                let styles = {
                    badge: {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minWidth: 20*size,
                        width: 'auto', 
                        height: 15*size,
                        borderRadius: '42%',
                        background: core.theme('colors.white'),
                        border: `1px solid ${core.theme('borders.default')}`,
                        paddingRight: 3*size,
                        paddingLeft: 3*size,
                        margin: `0px ${5*size}px`,
                        fontSize: 10*size,
                        color: core.theme('colors.dark'),
                        ...style
                    },
                }
                return(styles[s]);
            },

            render() {
                let { count } = this.props;

                return (
                    <div style={ this.styles('badge') }>
                        {count}
                    </div>
                )
            }
        }
    }
};