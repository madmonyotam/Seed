import { Button  } from '@material-ui/core/';


module.exports = {
    name: "ButtonEx",
    description: 'This is an example of a component',
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

            componentWillUpdate(nextProps, nextState) {
            },

            componentWillUnmount () {

            },

            initUnits(){
            },

            styles(s){

                const styles = {
                    root: {
                        minWidth: 130,
                    },

                }

                return(styles[s]);
            },

            render() {
                let { func, text, style } = this.props;

                return (
                        <Button style={{ ...this.styles('root'), ...style }} variant="outlined" color="primary" onClick={func}>
                            {text}
                        </Button>
                )
            }

        }
    }
}
