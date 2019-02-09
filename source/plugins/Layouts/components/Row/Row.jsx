
module.exports = {
    name: 'Row',
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
                    width: '100%',
                    height: 70,
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
                this.boxShadow = core.theme('boxShadows.row');
            },

            styles(s){
                let { width, height, style, boxShadow } = this.props;
                if(core.isString(width) && !width.includes('%')) width = Number(width);
                if(core.isString(height) && !height.includes('%')) height = Number(height);

                const styles = {
                    row: {
                        width: width,
                        height: height,
                        minHeight: height,
                        display: 'flex',
                        flexDirection: 'row',
                        overflow: 'hidden',
                        alignItems: 'center',
                        boxShadow: boxShadow ? this.boxShadow : 'unset',
                        padding: 10,
                        ...style
                    },
                }

                console.log(styles);

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
