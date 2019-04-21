module.exports = {
    name: "Home",
    description: '',

    bindings: {
        initLoading: ['initLoading']
    },

    dependencies: ['SimpleSwitch.Component'],

    get(Component) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                path: PropTypes.array,
                testEdit: PropTypes.bool,
            },

            getDefaultProps(){
                return {

                };
            },

            componentDidMount() {
            },

            componentWillUnmount() {
            },

            getInitialState() {
                return {

                };
            },

            styles(s) {
                let styles = {
                    root: {
                        position: 'relative',
                        margin: 15,
                        height: "calc(100% - 48px)",
                        width: "calc(100% - 15px)",
                    },
                }
                
                return(styles[s]);
            },

            render() {

                return (

                    <div id={'Home.root'} style={ this.styles('root')}>
                        <Component text={core.translate("my first core component")}/>
                    </div>
                )


            }
        }
    }
}
