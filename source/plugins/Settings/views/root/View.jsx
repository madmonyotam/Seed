import { Route, Link, Switch } from "react-router-dom";
import { find , uniqueId } from 'lodash';
module.exports = {
    name: "View",
    description: '',
    dependencies: [ 'Navigation.RoutesMenu', 'Settings.CodeEditor', 'Settings.FloatingMenu'],
    get( RoutesMenu, CodeEditor, FloatingMenu ) {
        var core = this;

        var { React, PropTypes, Branch, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin, Branch ],
            
            cursors: {
              menu: ['plugins', 'access', 'config'],
              // TODO: CHECK FOR TREE MIS-BINDINGS
            },

            getInitialState() { 
              return {
                routes: []
              } 
            },

            componentWillMount () {
            },

            componentDidMount() {  
              let { menu } = this.state;
              let { match } = this.props; // match.path  = parent route path
              if (menu) {
                this.buildRoutes(menu,match) 
              }

            },
            buildRoutes(menu,match){ 

              let menuKeys = Object.keys(menu)
              let routes = menuKeys.map((routeKey)=>{
                return {
                  path: `${ match.path }/${ routeKey }`,
                  label: routeKey,
                  view: undefined,
                  key: routeKey,
                }
              })
              this.setState({
                routes: routes,
                activeRoute: this.getCurrentRoute(routes)
              })
            },

            componentWillUnmount() { 
            },

            componentWillReceiveProps(nextProps) {  
              let { menu } = this.state;
              let { match } = this.props;

              if(nextProps.match !== match) this.buildRoutes(menu,nextProps.match);
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
              let { menu, activeRoute } = this.state;
              // console.log(1, menu)
              return (
                <div style={{ height: 'calc(100% - 20px)', width: '100%', padding: '0 0 2px 5px' }}>
                  <CodeEditor data={ menu[routeName] } parentKey={ activeRoute.key } userID={ uniqueId('user_id_')  } />
                </div>
              )
            },

            onRouteChange(route){ ;
              this.setState({ activeRoute: route });
            },

            renderRouteComponent(route, key){
              return <Route key={ key } 
                            path={ route.path } 
                            component={ this.ComponentRender.bind(this, route.key) } /> 
            },

            render() { 
              let { routes, activeRoute } = this.state; 
              // console.debug('activeRoute => ', activeRoute);
              return (

                  <div id={'Settings_Root'} style={ this.styles('root') }> 
                    
                    <RoutesMenu routes={ routes } 
                                onRouteChange={ this.onRouteChange } 
                                activeRoute={ activeRoute } />
                    
                    <Switch>
                      { routes.map(this.renderRouteComponent) }
                    </Switch>

                    { activeRoute  ? <FloatingMenu parentKey={ activeRoute.key } /> : null }
                      
                  </div>
              )


            }
        }
    }
}
