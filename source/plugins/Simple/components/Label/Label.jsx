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
                text: PropTypes.string,
                color: PropTypes.string,
                size: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
                weight: PropTypes.number,
            },

            getDefaultProps(){
                return {
                    size: 13,
                    weight: 500,
                    width: '100%',
                    label: '',
                    text: '',
                    color: core.theme('colors.text')
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
                let { width, style, size, color, weight } = this.props;

                const styles = {
                    label: {
                        margin: 0,
                        fontWeight: weight,
                        fontSize:size,
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
                let { text, label, style, ...otherProps } = this.props;

                return (
                    <span style={ this.styles('label') } title={label} {...otherProps} >
                        { text ? text : label }
                    </span>
                )
            } 

        }
    }
}
