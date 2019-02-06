module.exports = {
    name: "ControlWrapper",
    description: 'control wrapper is a basic layout for controlers in examples tab to control props from the ui',
    dependencies: ['SimpleSwitch.Mixin','Examples.SimpleToggle'],
    get(Mixin,SimpleToggle) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ],

            componentWillUnmount() {
            },


            propsTypes: {
                scheme: PropTypes.object,
            },

            getDefaultProps(){
                return {
                    scheme: {}
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
                this.background = core.theme('backgrounds.white');
            },

            styles(s){

                const styles = {
                    root: {
                        flex: 0.20,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        overflow: 'auto',
                        background: this.background,
                        borderRadius: 4,
                        margin: 10,
                        padding: 15,
                        boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'

                    },

                }

                return(styles[s]);
            },

            handleOnChange(context,stateName,value){
               context.setState({[stateName]:value});
            },

            renderComponentByType(key, type, name, context){
                switch (type) {
                    case 'simpleToggle': 
                        let checked = context.state[name];
                        return  <SimpleToggle key={key} checked={checked} onChange={ this.handleOnChange.bind(this,context,name) }  />

                    case 'simpleNumber': 
                        return  <h2 key={key}>2</h2>
                
                    default:
                        return <p key={key}>3</p>
                }
            },

            renderByScheme(){
                let { scheme } = this.props; 
                let itemInScheme = Object.entries(scheme);
                
                return itemInScheme.map((item,key)=>{
                    let context = item[1].context
                    let type = item[1].type;
                    let name = item[0];

                    return (
                        <div style={} >
                            { this.renderComponentByType(key, type, name, context) }
                        </div>
                    )
                });
            },

            render() {

                return (
                    <div style={this.styles('root')}>
                        { this.renderByScheme() }
                    </div>
                )
            }

        }
    }
}
