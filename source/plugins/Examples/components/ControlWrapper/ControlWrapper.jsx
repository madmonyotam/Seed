module.exports = {
    name: "ControlWrapper",
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
                this.borderColor =  core.theme('colors.borderDark');
            },

            styles(s){

                const styles = {
                    root: {
                        flex: 0.20,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        padding: '0 15px 0 0',
                        // borderRight: `1px solid ${this.borderColor}`
                    },

                }

                return(styles[s]);
            },

            render() {

                return (
                    <div style={this.styles('root')}>
                       { this.props.children }
                    </div>
                )
            }

        }
    }
}
