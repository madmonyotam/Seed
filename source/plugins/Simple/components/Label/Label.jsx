import { Typography } from '@material-ui/core';

module.exports = {
    name: 'Label',
    description: 'This is an example of a component',
    dependencies: ['SimpleSwitch.Mixin','SimpleSwitch.Helper'],
    get(Mixin, Helper) {
        
        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ],

            propsTypes: {
                width: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
                label: PropTypes.string,
            },

            getDefaultProps(){
                return {
                    width: '100%',
                    label: 'label'
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
                let { width, style } = this.props;

                const styles = {
                    label: {
                        margin: 0,
                        fontWeight: 500,
                        fontSize:13,
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
                let { label } = this.props;
                label = Helper.openCamelCase(label);

                return (
                    <Typography style={ this.styles('label') } title={label} >
                        { label }
                    </Typography>
                )
            } 

        }
    }
}