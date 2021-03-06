import { Route,  Switch } from "react-router-dom";
import { createHashHistory } from "history";

const history = createHashHistory({
  hashType: 'slash' // the default
});

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
              projects: ['plugins', 'Settings', 'projects'],
              currentPath: ['plugins', 'Settings', 'currentProjectPath']
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
              core.on('reload:settings', this.reloadRoutes)

              if (menu) {
                this.buildRoutes(menu,match)
              }

            },

            reloadRoutes(){
              core.getInitialFiles(( { menu } )=>{
                this.buildRoutes(menu, this.props.match)
              })
            },
            buildRoutes(menu,match, callback){

              let menuKeys = Object.keys(menu)
              let routes = menuKeys.map((routeKey)=>{
                if (routeKey !== 'genie') {
                  return {
                    path: `${ match.path }/${ routeKey }`,
                    label: routeKey,
                    view: undefined,
                    key: routeKey,
                  }
                }
              });

              this.setState({
                routes: routes,
                activeRoute: this.getCurrentRoute(routes)
              }, callback)
            },

            componentWillUnmount() {
              core.off('reload:settings', this.reloadRoutes)
            },

            componentWillReceiveProps(nextProps) {
              let { menu } = this.state;
              let { match } = this.props;

              if(nextProps.match !== match) this.buildRoutes(menu,nextProps.match);
            }, 
            
            getCurrentRoute(routes){
              let afterHash = location.hash.split('#')[1];
              let found  = find(routes, { path: afterHash });
              if (!found) {
                this.setDefaultRoute(routes[0])
                return routes[0];
              }
              return found
            },

            setDefaultRoute(defaultRoute){ 
              history.push(defaultRoute.path)
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
              return (
                <div style={{ height: 'calc(100% - 0px)', width: '100%', padding: '0 0 2px 5px' }}>
                  <CodeEditor data={ menu[routeName] } parentKey={ activeRoute.key } userID={ uniqueId('user_id_')  } />
                </div>
              )
            },

            onRouteChange(route){
              this.setState({ activeRoute: route });
            },

            renderRouteComponent(route, key){
              if (!route) return;
              return <Route key={ key }
                            path={ route.path }
                            component={ this.ComponentRender.bind(this, route.key) } />
            },

            render() {
              let { routes, activeRoute, projects, currentPath } = this.state;
              return (

                  <div id={'Settings_Root'} style={ this.styles('root') }>

                    <RoutesMenu routes={ routes }
                                onRouteChange={ this.onRouteChange }
                                activeRoute={ activeRoute } />

                    <Switch >
                      { routes.map(this.renderRouteComponent) }
                    </Switch>

                    { activeRoute  ? <FloatingMenu parentKey={ activeRoute.key } projects={ projects } currentPath={ currentPath } /> : null }

                  </div>
              )


            }
        }
    }
}
