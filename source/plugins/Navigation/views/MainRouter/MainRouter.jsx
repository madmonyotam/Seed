import { Route, Link, Switch } from "react-router-dom";


module.exports = {
    name: "MainRouter",
    description: '',

    bindings: {
        initLoading: ['initLoading']
    },

    dependencies: ['Project.NewProject','Examples.Examples','Layouts.Absolute'],

    get(NewProject, Examples, Absolute) {

        var core = this;

        var { React, PropTypes } = core.imports;
        const units = {
          dim: { navHeight: core.dim('nav.top.height'), margin: 0 }
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
                    },

                    center: {
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%'
                    }
                }
                
                return(styles[s]);
            },
            
            WelcomeRender(){
              return <div style={ this.styles('center') }> { core.translate('Seed') } </div>
            },

            render() {   
                return (
                    <Absolute style={this.styles('content')}>
                        <Switch>
                            <Route path="/" exact component={ this.WelcomeRender } />
                            <Route path="/new-project" component={ NewProject } />
                            <Route path="/examples" component={ Examples } />
                        </Switch>
                    </Absolute>
                )
            }
        }
    }
}
