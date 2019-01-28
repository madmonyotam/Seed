import { Route, Link, Switch } from "react-router-dom";


module.exports = {
    name: "MainRouter",
    description: '',

    bindings: {
        initLoading: ['initLoading']
    },

    dependencies: ['SimpleSwitch.Home','Settings.Settings','Examples.Examples'],

    get(Home, Settings, Examples) {

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

                this.backgrounds = {
                    content: core.theme('backgrounds.content'),
                };

                this.units = {
                    appBarHeight: core.dim("appBar.height"),
                    navWidth: core.dim("nav.width"),
                };

            },

            styles(s) {
                let styles = {
                    content: {
                        position: 'absolute',
                        top:  this.units.appBarHeight,
                        left: this.units.navWidth,
                        bottom: 0,
                        right: 0,
                        overflow: 'hidden',
                        backgroundColor: this.backgrounds.content,
                    },
                }
                
                return(styles[s]);
            },

            render() {   
                return (
                    <div style={ this.styles('content') }>
                        <Switch>
                            <Route path="/home" component={Home} />
                            <Route path="/settings" component={Settings} />
                            <Route path="/examples" component={Examples} />
                        </Switch>
                    </div>
                )
            }
        }
    }
}
