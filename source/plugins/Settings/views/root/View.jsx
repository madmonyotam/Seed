import { Route, Link, Switch } from "react-router-dom";
import { find } from 'lodash';
module.exports = {
    name: "View",
    description: '',
    dependencies: [ 'Navigation.RoutesMenu', 'Settings.FloatingMenu'],
    get( RoutesMenu, FloatingMenu ) {
        var core = this;

        var { React, PropTypes, Branch, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin, Branch ],
            
            cursors: {
              currentExample: ['plugins', 'Settings'],
            },

            getInitialState() {
              let { match } = this.props; // match.path  = parent route path
              const routes = [
                { path: `${ match.path }/themes`, label: 'themes', view: undefined },
                { path: `${ match.path }/icons`, label: 'icons', view: undefined }
              ]
              return {
                activeRoute: this.getCurrentRoute(routes),
                routes: routes 
              }
            },

            componentWillMount () {
            },

            componentDidMount() { 
              // console.debug('this.cursor.currentExample.get() => ', this.cursor.currentExample.get());
              // console.debug('this.state => ', this.state);

            },

            componentWillUnmount() { 
            },

            componentWillReceiveProps(nextProps) {  
            }, 
            
            getCurrentRoute(routes){
              let afterHash = location.hash.split('#')[1];
              let found  = find(routes, { path: afterHash })
              return found
            },

            styles(propName) {
              let styles = {
                root: { 
                  height: '100%', 
                  width: '100%', 
                  display: 'flex', 
                  
                }, 
              }
              return styles[propName]
            },  
            
            ComponentRender(routeName){
              return <div style={{ padding: 15 }}> { core.translate(routeName) } </div>
            },

            onRouteChange(route){ ;
              this.setState({ activeRoute: route });
            },

            renderRouteComponent(route, key){
              return <Route key={ key } 
                            path={ route.path } 
                            component={ route.view || this.ComponentRender.bind(this, route.label) } /> 
            },

            render() { 
              let { routes } = this.state;
              
              return (

                  <div id={'Settings_Root'} style={ this.styles('root') }> 
                    
                    <RoutesMenu routes={ routes } 
                                onRouteChange={ this.onRouteChange } 
                                activeRoute={ this.state.activeRoute } />
                    
                    <Switch>
                      { routes.map(this.renderRouteComponent) }
                    </Switch>

                    {/* <FloatingMenu /> */}
                      
                  </div>
              )


            }
        }
    }
}
