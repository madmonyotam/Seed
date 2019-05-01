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
        const units = {
          dim: { navHeight: core.dim('nav.top.height'), margin: 15 }
        }
        return {
            propsTypes: {  
            },

            getDefaultProps(){
                return {
                };
            },

            
            componentWillMount () {
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
                    content: {
                        top: units.dim.navHeight+units.dim.margin,
                        left: units.dim.margin,
                        right: units.dim.margin,
                        bottom: units.dim.margin,
                        border: '2px groove'
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
