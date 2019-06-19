module.exports = {
    dependencies: [],    
    get() {
        
        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        var units = {
            color: core.theme('backgrounds.default')
        }

        return {
            mixins: [ ComponentMixin ],
            
            propsTypes: {
                width: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
                height: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
                color: PropTypes.string,
            },

            getDefaultProps(){
                return {
                    width: '100%',
                    height: '100%',
                    color: core.theme('backgrounds.default')
                };
            },

            styles(s){
                let { width, height, style, color } = this.props;

                const styles = {
                    center: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        alignContent: "center",
                        width: width,
                        height: height,
                        background: color,
                        ...style
                    },
                }
                
                return(styles[s]);
            },

            render() {
                let { children, ...props } = this.props;

                return (
                    <div { ...props } style={this.styles('center')}>
                        { children }
                    </div>
                )
            } 

        }
    }
}
