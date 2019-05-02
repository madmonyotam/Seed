import { Button } from '@material-ui/core'
import { Link } from "react-router-dom";

module.exports = {
    name: 'Top',
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
                handleViews: PropTypes.func.isRequired,
                activeView:  PropTypes.string,
            },

            getDefaultProps() {
                return {
                    handleViews: ()=>{ console.log('Nav handleViews default')},
                    activeView: '/new-project',
                };
            },

            getInitialState(){
              return {
                navItems: [
                  {
                      label: core.translate('New Project'),
                      view: '/new-project'
                  },
                  {
                      label: core.translate('Examples'),
                      view: '/examples'
                  },
                  {
                      label: core.translate('Settings'),
                      view: '/settings'
                  }
                ]
              }
            },

            componentWillMount() { 
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
                    itemStyle: {
                      width: 150,
                      padding: 5,
                      ...flex
                    },
                    logo: {
                      ...flex,
                      flexDirection: 'column',
                      width: 150,
                      textDecoration: 'unset'
                    }
                
                }
                
                return(styles[s]);
            }, 

            setActiveItem(view){
               this.props.handleViews(view);
            },

            renderNavButton(but, key){
              let { activeView } = this.props;
              let isActive = (activeView === but.view) || activeView.indexOf(but.view) > -1;
              return (
                <Link key={ key } to={ but.view } style={{ textDecoration: 'unset', marginLeft: '15px' }} >
                  <Button onClick={ e => { this.setActiveItem(but.view) } }
                          size={ 'small' }
                          variant={ 'flat' }
                          style={{ color: isActive ? units.colors.white : units.texts.logo , background: isActive ? units.colors.primary : 'transparent'  }}> 
                    { but.label } 
                  </Button>
                </Link>
              )
            },

            render() {
              let { navItems } = this.state;

              return (
                <div style={ this.styles('container') } > 
                  <div key={ 'logo' } onClick={ e => { this.setActiveItem('/') } } >
                    <Link to={'/'} style={ this.styles('logo') }>
                    <Label size={ 20 } weight={500} width={ '100%' } label={ core.translate('Seed') } color={ units.texts.logo }/>
                    <Label size={ 14 } weight={400} width={ '100%' } label={ core.translate('Wrapped React Library') } color={ units.texts.logo }/>
                    </Link>
                  </div> 
              
                  <div>

                    { navItems.map(this.renderNavButton) }
                  </div>

                </div>
              );
            }
        };
    }
};
