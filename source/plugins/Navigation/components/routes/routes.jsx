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
          if (!active) return null
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
                  padding: '0 15px',
                  transition: 'all .25s ease-out',
                  background: units.colors.blue015,
                  minWidth: 185,
                }
              }
                
              return(styles[s]);
            },  

            handlRouteChange(route){
              if (this.props.onRouteChange) this.props.onRouteChange(route)
            },

            renderLink(route, key){
              if (!route) return;
              let { path, label } = route;
              let isActive = route === this.props.activeRoute;

              return (
                <Link key={ key } to={ path } style={{ textDecoration: 'unset' }}>
                  <Row boxShadow={ false } onClick={ e => { this.handlRouteChange(route) } } className={ `route_row  ${  isActive ? ' active' : '' }` }>
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
