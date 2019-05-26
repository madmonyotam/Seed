
module.exports = {
    dependencies: [],
    get() {
        
        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            propsTypes: {
                padding: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
                color: PropTypes.string,
                top: PropTypes.number,
                bottom: PropTypes.number,
                right: PropTypes.number,
                elevation: PropTypes.number,
                left: PropTypes.number,
            },

            getDefaultProps(){
                return {
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    padding: 0,
                    elevation: 1000,
                    color: 'unset'
                };
            },
            
            getInitialState() {
                return {

                };
            },

            styles(s){
                let { padding ,color, style, top, bottom, right, left, elevation } = this.props;

                const styles = {
                    view: {
                        position: 'absolute',
                        top: top,
                        bottom: bottom,
                        right: right,
                        left: left,
                        overflow: 'hidden',
                        background: color,
                        padding: padding,
                        zIndex: elevation,
                        ...style
                    }
                }

                return(styles[s]);
            },

            render() {
                let { children, padding, color, style, ...props } = this.props;

                return (
                    <div style={ this.styles('view') } {...props} >
                        { children }
                    </div>
                )
            } 

        }
    }
}
