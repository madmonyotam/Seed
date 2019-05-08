import { Link } from 'react-router-dom';
var tinycolor = require('tinycolor2');
import moment from 'moment';

module.exports = {
    name: 'FloatingMenu',
    dependencies: ['Simple.Label', 'Inputs.Button', 'Simple.Icon'],
    get(Label, Button, Icon) {

        var core = this;
        this.time = moment().format('HH:mm:ss');
        var { React, PropTypes } = core.imports;
        var units = { 
          colors: {
            default: core.theme('colors.default'),
            secondary: core.theme('colors.secondary'),
            primary: core.theme('colors.primary'),
            white: core.theme('colors.white'),
            dark: core.theme('colors.dark')
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
                };
            },

            getInitialState(){
              return {
                menuItems: [
                  {
                    title: core.translate('Save'),
                    icon: core.icons('general.save'),
                    onClick: this.save
                  },
                  {
                    title: core.translate('Load'),
                    icon: core.icons('general.upload'),
                    onClick: this.prevent
                  },
                  {
                    title: core.translate('Restore'),
                    icon: core.icons('notify.error'),
                    onClick: this.prevent
                  }
                ]
              }
            },

            componentDidMount() {
              core.on('file:save', this.save)
            },            

            componentWillMount() { 
              core.off('file:save', this.save)
            },

            styles(s) {
              let { open } = this.state;
              let flex = {
                display: 'flex',
                alignItems: 'center'
              }
              let styles = { 

                button: { ...flex, justifyContent:'center' },
                
                root: {
                  backgroundColor: tinycolor(units.colors.secondary).darken(15),
                  padding: '0 10px',
                  position:'absolute',
                  right: 0,
                  left: 190,
                  bottom: 0,
                  height: 22,
                  ...flex,
                  // flexDirection: 'column',
                  justifyContent: 'space-between'
                },

                menu: {
                  ...flex,
                },
                item: {
                  cursor: 'pointer',
                  marginRight: 10
                }
              }
              
              return(styles[s]);
            }, 

            onMouseEnter(e){
              if (this.state.dragging) return;
              this.setState({ open: true })
            },

            onMouseLeave(e){
              if (this.state.dragging) return;
              this.setState({ open: false })
            },

            save(e, data){
              /** 
              TODO: add some sugar, spice and everything nice!
                    add better module for saving instances.
                    menu, code , keyboards
              **/ 
              let cache = core.plugins.Settings.get(['editor', 'cache']);
              let dir = Object.keys(cache)[0];
              let fileData = Object.values(cache)[0];
              
              if (data && data.code) fileData = JSON.parse(fileData)

              let params = {
                fileData: fileData,
                dir: dir,
                notify: true
              }
              core.plugins.Settings.run('SaveSettings', params)
            },

            renderItem(item, key) {
              if (!item) return null;
              return (

                <React.Fragment key={ key }>

                  <div style={ this.styles('item') } title={ item.title } onClick={ item.onClick } >
                    <Icon color={ units.colors.white } icon={ item.icon } size={ 14 } />
                  </div> 

                </React.Fragment>
              )  
            },

            render() {
              let { menuItems } = this.state;

              return (
                <div style={ this.styles('root') } 
                     onMouseEnter={ this.onMouseEnter } 
                     onMouseLeave={ this.onMouseLeave }>
                     
                  <div style={ this.styles('menu') }> { menuItems.map(this.renderItem) }</div>
                   
                  <div style={ this.styles('item') } title={ moment().format('LLLL') }  >
                    <Icon color={ units.colors.white } icon={ core.icons('general.clock') }  size={ 14 } />
                  </div>
                  

                </div>
              );
            }
        };
    }
};
