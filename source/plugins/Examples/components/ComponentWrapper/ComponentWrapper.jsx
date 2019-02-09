module.exports = {
    name: "ComponentWrapper",
    description: 'control wrapper is a basic layout for controlers in examples tab to control props from the ui',
    dependencies: ['SimpleSwitch.Mixin','Layouts.Row'],
    get(Mixin,Row) {

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
                this.background = core.theme('backgrounds.white');
                this.boxShadow = core.theme('boxShadows.wrapper')
            },

            styles(s){

                const styles = {
                    root: {
                        background: this.background,
                        margin: 10,
                        borderRadius: 4,
                    },

                }

                return(styles[s]);
            },

            render() {
                let { style } = this.props;
                return (
                    <Row boxShadow={true} width={'80%'} height={'100%'} style={{ ...this.styles('root'), ...style }} >
                      { this.props.children }
                    </Row>
                )
            }

        }
    }
}
