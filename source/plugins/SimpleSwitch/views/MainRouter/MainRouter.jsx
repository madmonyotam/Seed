import { Route, Link, Switch } from "react-router-dom";


module.exports = {
    name: "MainRouter",
    description: '',

    bindings: {
        initLoading: ['initLoading']
    },

    dependencies: ['SimpleSwitch.Home','Settings.Settings','Examples.Examples','Layouts.Absolute'],

    get(Home, Settings, Examples, Absolute) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {  
            },

            getDefaultProps(){
                return {
                };
            },

            
            componentWillMount () {
                this.initialUnits();  
            },
            
            componentDidMount() {
            },

            componentWillUnmount() {
            },

            getInitialState() {
                return {

                };
            },

            initialUnits() {

                this.colors = {
                };

                this.units = {
                    navWidth: core.dim("nav.width")
                };

            },

            styles(s) {
                let styles = {
                    content: {
                        left: this.units.navWidth
                    },
                }
                
                return(styles[s]);
            },

            render() {   
                return (
                    <Absolute style={this.styles('content')}>
                        <Switch>
                            <Route path="/home" component={Home} />
                            <Route path="/settings" component={Settings} />
                            <Route path="/examples" component={Examples} />
                        </Switch>
                    </Absolute>
                )
            }
        }
    }
}
