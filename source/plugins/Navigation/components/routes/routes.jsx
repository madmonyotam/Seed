import { Button } from '@material-ui/core'
import { Link } from "react-router-dom";

require('./triangle.scss')
module.exports = {
    name: 'RoutesMenu',
    description: 'Simple List Route Menu',
    dependencies: ['Layouts.Row', 'Layouts.Column', 'Simple.Label'],
    get(Row, Column, Label) {

        var core = this;
        var { React, PropTypes } = core.imports;
        const units = { 
          colors: { 
            blue015: core.theme('colors.blue015'),
            white: core.theme('colors.white'),
          }
        }
        
        function Triangle({ active }) {
          if (!active) return <div />;
          return <div className={'selected_triangle'} />;
        }

        return {

            propsTypes: {
              routes: PropTypes.array.isRequired,
              activeRoute: PropTypes.object,
              onRouteChange: PropTypes.func,
            },

            getDefaultProps() {
                return { 
                  routes: [ ]
                };
            }, 

            styles(s) {
              
              let styles = {
                container: {
                  height: '100%',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  padding: '0 0 0 5px',
                  transition: 'all .25s ease-out',
                  background: units.colors.blue015,
                  maxWidth: 185,
                  Width: 185,
                  minWidth: 185,
                }, 
              }
                let styles = {
                    container: {
                      height: '100%',
                      minWidth: 185,
                      maxWidth: 185,
                      width: 185,
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      padding: '0 0 0 5px',
                      transition: 'all .25s ease-out',
                      background: units.colors.blue015
                    }, 
                }
                
              return(styles[s]);
            },  

            handlRouteChange(route){
              if (this.props.onRouteChange) this.props.onRouteChange(route)
            },

            renderLink(route, key){
              let { path, label } = route;
              let isActive = route === this.props.activeRoute;

              return (
                <Link key={ key } to={ path } style={{ textDecoration: 'unset' }}>
                  <Row boxShadow={ false } onClick={ e => { this.handlRouteChange(route) } }>
                    <Label size={13} weight={500} width={'100%'} color={ units.colors.white } label={ core.translate(label).toUpperCase() } />
                    <Triangle active={ isActive } />
                  </Row>
                </Link>
              )
            },

            render() {
              let { routes } = this.props;

              return (
                <Column width={ 185 }style={ this.styles('container') } >  
                  { routes && routes.length ? routes.map(this.renderLink) : core.translate('Missing Routes!') }
                </Column>
              );
            }
        };
    }
};
