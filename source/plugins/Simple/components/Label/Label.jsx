module.exports = {
    dependencies: [],
    get() {
        
        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            propsTypes: {
                width: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
                label: PropTypes.string,
                color: PropTypes.string,
                size: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
                weight: PropTypes.number,
                transform: PropTypes.oneOf(['none', 'capitalize', 'uppercase', 'lowercase', 'initial', 'inherit']),
            },

            getDefaultProps(){
                return {
                    size: 13,
                    weight: 500,
                    width: '100%',
                    label: 'label',
                    color: core.theme('texts.default'),
                    transform: 'none',
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
            },

            styles(s){
                let { width, style, size, color, weight, transform } = this.props;

                const styles = {
                    label: {
                        margin: 0,
                        fontWeight: weight,
                        fontSize:size,
                        textTransform: transform,
                        color: color,
                        width: width,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        ...style
                    },
                }
                return(styles[s]);
            },

            render() {
                let { label, style, ...otherProps } = this.props;

                return (
                    <span style={ this.styles('label') } title={label} {...otherProps} >
                        { label }
                    </span>
                )
            } 

        }
    }
}
