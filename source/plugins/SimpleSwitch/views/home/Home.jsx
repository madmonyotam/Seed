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
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%'
                    }
                }
                
                return(styles[s]);
            },

            render() {

                return (

                    <div id={'Home'} style={ this.styles('root')}>
                      { core.translate('Home') }
                    </div>
                )


            }
        }
    }
}
