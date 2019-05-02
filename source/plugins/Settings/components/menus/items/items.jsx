import { Button } from '@material-ui/core'
import { Link } from "react-router-dom";

require('./triangle.scss')
module.exports = {
    name: 'ItemsMenu',
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
            },

            getDefaultProps() {
                return { };
            },

            getInitialState(){
              return {
                routes: ['themes', 'icons']
              }
            }, 
            styles(s) {
              let flex = {
                display: 'flex',
                flexDirection: 'column'
              }
                let styles = {
                    container: {
                      height: '100%',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      padding: '0 0 0 5px',
                      transition: 'all .25s ease-out',
                      background: units.colors.blue015
                    }, 
                
                }
                
                return(styles[s]);
            },  

            getHash(){
              return location.hash.split('#')[1];
            },

            renderLink(path, key){
              let fullPath = `/settings/${ path }`;
              let isActive = fullPath === this.getHash()
              return (
                <Link key={ key } to={ fullPath } style={{ textDecoration: 'unset' }}>
                  <Row boxShadow={ false } >
                    <Label size={13} weight={500} width={'100%'} color={ units.colors.white } label={ core.translate(path).toUpperCase() } />
                    <Triangle active={ isActive } />
                  </Row>
                </Link>
              )
            },

            render() {
              let { routes } = this.state;

              return (
                <Column style={ this.styles('container') } >  
                  { routes.map(this.renderLink) }
                </Column>
              );
            }
        };
    }
};
