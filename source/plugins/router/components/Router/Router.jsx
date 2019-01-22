// var pure = require('../../modules/pure');
var Route = require('./Route.js');

module.exports = {
    name: 'Router',
    description: '',
    dependencies: ['router.pure'],
    get(pure){
        var core = this;
        var { React, PropTypes } = core.imports;
       
        return{
            propTypes: {
                components: PropTypes.object,
                routes: PropTypes.array,
                defaultRoute: PropTypes.string,
                onNavigation: PropTypes.func,
            },
            getInitialState() {
                var { router } = core.plugins;
                router.element = this;

                return {
                    route: null
                };
            },
            
            getDefaultProps(){
                return {
                    components: core.components
                };
            },

            componentDidMount() {
                var { router } = core.plugins;

                window.addEventListener('hashchange', this.onHashChange);
                this.onHashChange();
                router.element = this;
            },
            
            componentWillUnmount() {
                window.removeEventListener('hashchange', this.onHashChange);
            },

            onHashChange() {
                var { router } = core.plugins;


                var hash = decodeURIComponent(location.hash.substr(1));
                var queryStart = hash.indexOf('{');
                var name, urlArray, urlString, query, queryString;
                if (queryStart > -1) {
                try {
                    urlString = hash.slice(0, queryStart);
                    queryString = hash.slice(queryStart);
                    query = JSON.parse(queryString);
                    Route.prototype.query = query;
                } catch (err) {
                    alert('cannot parse json url, your address is not correct');
                    return;
                }
                } else {
                    urlString = hash;
                    Route.prototype.query = {};
                }
            urlArray = urlString.split('/').filter(n => n);
            var topRoute = {
                map: this.props.routes ? {
                    children: this.props.routes
                } : null,
            };
            var route = new Route(urlArray, topRoute, this);
            if (!route.component) {
                return (location.hash = this.props.defaultRoute);
            }
            router.navigationCount++;
            this.setRoute(route);
            },
        
            setRoute(route) {
                var { router } = core.plugins;

                var hash = location.hash.substr(1);
                var newHash = pure.routeToUrl(route);
                if (newHash !== hash) { // fix url in address bar
                    history.replaceState(null, null, '#' + decodeURIComponent(newHash));
                }
                router.lastQuery = router.query;
                router.query = JSON.parse(JSON.stringify(route.get()));
                
                this.route = router.route = route;
                
                if (this.props.onNavigation) this.props.onNavigation(route, Route);
                this.toRoute(route,false)
             //   core.fire('router.navigation', route);
                core.emit('router.navigation', route);
                this.setState({
                    route: route
                });
            },

            toRoute(route, silent, newTab) {
                if (newTab) {
                    let href = window.location.href;
                    let base = window.location.origin;
                    if (href.indexOf('#') != -1) {
                        base = href.split('#')[0] + '#';
                    }
                    let hash = pure.routeToUrl(route);
                    window.open(base + hash);
                } else if (silent) {
                    this.setRoute(route);
                } else {
                    location.hash = pure.routeToUrl(route);
                }
            },

            setQuery(query, silent) {
                var route = this.route;
                route.query = query;
                this.toRoute(route, silent);
            },

            renderRoute(route, id) {
                if (!route.name) return null;
                
                var component = core.require([route.component]);
                if (!component) return null;
                var children = route.children || [];
                var props = {
                    key: id,
                    route: route,
                    ...route.query
                };
                return React.createElement(component, props, children.map((child, i) => {
                    return this.renderRoute(child, `${id}.${i}`);
                }));
            },
            render() {
                var route = this.route;
                if (!route) return null;
                return this.renderRoute(route, '0');
            }
    
    
        }
    }
}