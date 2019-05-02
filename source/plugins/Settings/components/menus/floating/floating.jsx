import { Button } from '@material-ui/core'
import { Link } from "react-router-dom";

module.exports = {
    name: 'FloatingMenu',
    dependencies: ['Simple.Label'],
    get(Label) {

        var core = this;
        var { React, PropTypes } = core.imports;
        const units = { 
          colors: {
            default: core.theme('colors.default'),
            secondary: core.theme('colors.secondary'),
            primary: core.theme('colors.primary'),
            white: core.theme('colors.white')
          },
          texts: {
            secondary: core.theme('texts.secondary'),
            logo: core.theme('colors.grey070')
          },
          backgrounds: {
            default: core.theme('colors.dark')
          },
          dim: {
            height: core.dim('nav.top.height')
          }
          
        }
        return {

            propsTypes: {
            },

            getDefaultProps() {
                return { };
            },

            getInitialState(){
              return {}
            }, 
            styles(s) {
              let flex = {
                display: 'flex',
                alignItems: 'center'
              }
                let styles = {
                    container: {
                        height: units.dim.height,
                        padding: '0 15px',
                        ...flex,
                        justifyContent: 'space-between',
                        transition: 'all .25s ease-out',
                        background: units.backgrounds.default
                    }, 
                
                }
                
                return(styles[s]);
            },  

            render() {
              let { navItems } = this.state;

              return (
                <div style={ this.styles('container') } >  
floating menu
                </div>
              );
            }
        };
    }
};
