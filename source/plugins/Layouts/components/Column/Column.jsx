
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
            },

            getDefaultProps(){
                return {
                    width: 200,
                    height: '100%',
                    boxShadow: false
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
                let { width, height, style, boxShadow } = this.props;
                let margin = style && style.margin || 0;

                const styles = {
                    row: {
                        width: width,
                        maxWidth: `calc(100% - ${margin}px)`,
                        height: height,
                        maxHeight: `calc(100% - ${margin}px)`,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'auto',
                        justifyContent: 'flex-start',
                        boxShadow: boxShadow ? this.boxShadow : 'unset',
                        ...style
                    },
                }

                return(styles[s]);
            },

            render() {
                let { children } = this.props;

                return (
                    <div style={ this.styles('row') } >
                        { children }
                    </div>
                )
            } 

        }
    }
}
