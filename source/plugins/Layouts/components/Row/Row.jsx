
module.exports = {
    dependencies: ['SimpleSwitch.Mixin'],
    get(Mixin) {
        
        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ],

            propsTypes: {
                width: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
                height: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
                boxShadow: PropTypes.bool,
                padding: PropTypes.number,
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
            
            getInitialState() {
                return {

                };
            },

            componentWillMount () {
                this.initUnits();
            },

            componentDidMount() {
            },

            componentWillUnmount() {
            },

            componentWillReceiveProps (nextProps) {
            },

            initUnits(){
                this.boxShadow = core.theme('boxShadows.row');
                this.dim = {
                    minWidth: core.dim('layouts.minRowWidth')
                }
            },

            styles(s){
                let { padding, width, height, style, boxShadow, color } = this.props;
                let margin = style && style.margin || 0;

                const styles = {

                    row: {
                        width: width,
                        maxWidth: `calc(100% - ${margin}px)`,
                        minHeight: this.dim.minWidth,
                        height: height,
                        maxHeight: `calc(100% - ${margin}px)`,
                        display: 'flex',
                        flexDirection: 'row',
                        overflow: 'hidden',
                        alignItems: 'center',
                        boxShadow: boxShadow ? this.boxShadow : 'unset',
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
