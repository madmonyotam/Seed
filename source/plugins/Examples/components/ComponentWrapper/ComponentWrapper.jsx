import { Typography } from "@material-ui/core";
module.exports = {
    name: "ComponentWrapper",
    description: 'control wrapper is a basic layout for controlers in examples tab to control props from the ui',
    dependencies: ['SimpleSwitch.Mixin'],
    get(Mixin) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ],

            componentWillUnmount() {
            },


            propsTypes: {

            },

            getDefaultProps(){
                return {

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

            componentWillReceiveProps (nextProps) {
            },

            componentWillUnmount () {

            },

            initUnits(){
                this.borderColor =  core.theme('colors.black');
            },

            styles(s){

                const styles = {
                    root: {
                        flex: 0.80,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative'
                    },

                }

                return(styles[s]);
            },

            render() {
                let { style } = this.props;
                return (
                    <div style={{ ...this.styles('root'), ...style }}>
                      { this.props.children }
                    </div>
                )
            }

        }
    }
}
