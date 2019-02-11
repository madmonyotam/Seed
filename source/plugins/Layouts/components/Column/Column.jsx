
module.exports = {
    name: 'Column',
    description: 'This is an example of a component',
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
                this.initUnits();
            },

            componentDidMount() {
            },

            componentWillUnmount() {
            },

            componentWillReceiveProps (nextProps) {
            },

            initUnits(){
                this.boxShadow = core.theme('boxShadows.column');
            },

            styles(s){
                let { width, height, style, boxShadow, color } = this.props;
                let margin = style && style.margin || 0;

                const styles = {
                    row: {
                        width: width,
                        maxWidth: `calc(100% - ${margin}px)`,
                        height: height,
                        maxHeight: `calc(100% - ${margin}px)`,
                        overflow: 'auto',
                        position: 'relative',
                        boxShadow: boxShadow ? this.boxShadow : 'unset',
                        background: color,
                        ...style
                    },
                }

                return(styles[s]);
            },

            render() {
                let { children, width, height, style, boxShadow, color, ...props } = this.props;

                return (
                    <div style={ this.styles('row') } { ...props } >
                        { children }
                    </div>
                )
            } 

        }
    }
}
