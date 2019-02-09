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
                this.background = core.theme('backgrounds.white');
                this.boxShadow = core.theme('boxShadows.wrapper')
            },

            styles(s){

                const styles = {
                    root: {
                        flex: 0.80,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                        background: this.background,
                        margin: 10,
                        padding: 15,
                        borderRadius: 4,
                        overflow: 'auto',
                        boxShadow: this.boxShadow

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
