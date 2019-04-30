module.exports = {
    name: "ComponentWrapper",
    description: 'control wrapper is a basic layout for controlers in examples tab to control props from the ui',
    dependencies: ['Layouts.Row'],
    get(Row) {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

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
                    show: true
                };
            },

            componentWillMount () {
                this.initUnits();
            },

            componentDidMount() {
                core.on('initialComponent',this.refreshComponent)
            },

            componentWillReceiveProps (nextProps) {
            },

            componentWillUnmount () {
                core.off('initialComponent',this.refreshComponent)
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
                        justifyContent: 'center'
                    },

                }

                return(styles[s]);
            },

            refreshComponent(){
                this.setState({show: false},()=>{
                    this.setState({show:true})
                })
            },

            render() {
                let { style } = this.props;
                let { show } = this.state;

                return (
                    <Row boxShadow={true} width={'80%'} height={'100%'} style={{ ...this.styles('root'), ...style }} >
                      { show ? this.props.children : null }
                    </Row>
                )
            }

        }
    }
}
