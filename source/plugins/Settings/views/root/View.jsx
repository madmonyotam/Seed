import { Route, Link, Switch } from "react-router-dom";
 
module.exports = {
    name: "View",
    description: '',
    dependencies: [ 'Settings.ItemsMenu', 'Settings.FloatingMenu'],
    get( ItemsMenu, FloatingMenu ) {
        var core = this;

        var { React, PropTypes, Branch, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin, Branch ],
            
            cursors: {
              currentExample: ['plugins', 'Settings'],
            },

            getInitialState() {

                return {
                }
            },

            componentWillMount () {
            },

            componentDidMount() { 
              console.debug('this.cursor.currentExample.get() => ', this.cursor.currentExample.get());
              console.debug('this.state => ', this.state);

            },

            componentWillUnmount() { 
            },

            componentWillReceiveProps(nextProps) {  
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

            render() { 
              let { match } = this.props; // match.path  = parent route path

                return (

                    <div id={'Settings_Root'} style={ this.styles('root') }> 
                      
                      <ItemsMenu />
                      
                      <Switch>
                        <Route path={`${ match.path }/themes` } component={ this.ComponentRender.bind(this, 'themes') } /> 
                        <Route path={`${ match.path }/icons` } component={ this.ComponentRender.bind(this, 'icons') } /> 
                      </Switch>

                      {/* <FloatingMenu /> */}
                       
                    </div>
                )


            }
        }
    }
}
