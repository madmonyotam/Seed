module.exports = {
    dependencies: ['SimpleSwitch.Mixin','SimpleSwitch.Helper'],
    get(Mixin, Helper) {
        
        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ],

            propsTypes: {
                width: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
                label: PropTypes.string,
                color: PropTypes.string,
                size: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
                weight: PropTypes.number,
            },

            getDefaultProps(){
                return {
                    size: 13,
                    weight: 500,
                    width: '100%',
                    label: 'label',
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
                let { label, style, ...otherProps } = this.props;
                label = Helper.openCamelCase(label);

                return (
                    <span style={ this.styles('label') } title={label} {...otherProps} >
                        { label }
                    </span>
                )
            } 

        }
    }
}
