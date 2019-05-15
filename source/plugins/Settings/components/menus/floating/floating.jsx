import { Link } from 'react-router-dom';
var tinycolor = require('tinycolor2');
import moment from 'moment'; 
import { find } from 'lodash';
module.exports = {
    name: 'FloatingMenu',
    dependencies: ['Simple.Loader', 'Decorators.Tooltip', 'Inputs.Button', 'Inputs.Switch', 'Simple.Icon'],
    get(Loader, Tooltip, Button, Switch, Icon) {

        var core = this; 
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
          },
          boxShadow: `4px -4px 10px -10px rgba(0,0,0,0.12), 4px -10px 16px -12px rgba(0,0,0,0.16)`,

          
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
                menuItems: [],
                useMongo: false,
                loading: false,
                popupPosition: { left: undefined }
              }
            },

            componentDidMount() {
              core.on('file:save', this.save)
              this.setMenuItems([
                {
                  title: core.translate('Save'),
                  icon: core.icons('general.save'),
                  key: 'save',
                  onClick: this.save
                },
                {
                  title: core.translate('Load'),
                  icon: core.icons('general.upload'),
                  subItems: true,
                  key: 'load',
                  onClick: this.load
                },
                {
                  title: core.translate('Restore'),
                  icon: core.icons('notify.error'),
                  onClick: this.restore
                }
              ])
            },            

            componentWillMount() { 
              core.off('file:save', this.save)
            },

            styles(s) {
              let { popupPosition } = this.state;
              let flex = {
                display: 'flex',
                alignItems: 'center'
              }
              let styles = { 

                button: { ...flex, justifyContent:'center' },
                
                root: {
                  backgroundColor: units.colors.dark,
                  padding: '0 10px',
                  position:'absolute',
                  right: 0,
                  left: 0,
                  bottom: 0,
                  height: 22,
                  zIndex: 5,
                  ...flex,
                  // flexDirection: 'column',
                  justifyContent: 'space-between'
                },

                menu: {
                  ...flex,
                },
                info: {
                  ...flex,
                  position: 'relative',
                  width: 75,
                  height: '100%',
                  justifyContent: 'flex-end',
                },
                item: {
                  cursor: 'pointer',
                  marginRight: 10
                },
                popup: {
                  position: 'absolute',
                  zIndex: 10,
                  width: 200, 
                  height: 200,
                  bottom: 22,
                  backgroundColor: units.colors.dark,
                  left: popupPosition && popupPosition.left || 0,
                  boxShadow: units.boxShadow,
                  borderTopRightRadius: 2,
                  borderTopLeftRadius: 2
                }
              }
              
              return(styles[s]);
            },  

            setMenuItems(items){
              let dir = this.props.parentKey;
              let { fileMenu } = core.plugins.access.get();
              let dev = items.map(item => {
                if (item.subItems && item.key == 'load') {
                  return {
                    ...item,
                    subItems: fileMenu[dir]
                  }
                }
                return item;
              })
              this.setState({ menuItems: dev })

            },

            getCachedDirName(){
              let cache = core.plugins.Settings.get(['editor', 'cache']);
              let dir = Object.keys(cache)[0];
              let fileData = Object.values(cache)[0];
              return { dir, fileData };
            },

            load(e, data) {
              // let { activeTab } = this.state;
              // let { fileName } = data;
              /** 
              TODO: add some sugar, spice and everything nice!
                    add other logic once we have simple file menu
              **/
              this.setState({ loading: true })

              let { menuItems } = this.state;
              let item = find(menuItems, { key: 'load' }) 
              let loadItem = item.subItems[0];
              let fileName = loadItem.fileName;
              let dir = loadItem.key; 
              // console.debug('loadItem => ', fileName, dir);

              core.plugins.Settings.run('LoadFile', { fileName, dir })
                  .then((newFile)=>{
                    console.debug('newFile => ', newFile);
                    

                    this.setState({ loading: false })

                    // let data = {
                    //   fileData: newFile,
                    //   dir: activeTab.key,
                    //   notify: false
                    // }
                    // core.plugins.Settings.run('saveSettings', data);
                  });
              /*

              },*/
            },

            restore(e) {
              let fileName = 'default.json';
              let dir = this.props.parentKey; 

              this.setState({ loading: true }) 
              
              core.plugins.Settings.run('LoadFile', { fileName, dir })
                  .then((fileData)=>{
                    let params = {
                      fileData: fileData,
                      dir: dir,
                      notify: true
                    }
                    core.plugins.Settings.run('SaveSettings', params)
                        .then(()=>{
                          this.setState({ loading: false }) 
                        })

                    
                  }) 
            },

            save(e, data){
              /** 
              TODO: add some sugar, spice and everything nice!
                    add better module for saving instances.
                    menu, code , keyboards
              **/ 
              this.setState({ loading: true })
              let { dir, fileData } = this.getCachedDirName()
              fileData = JSON.parse(fileData)
              let params = {
                fileData: fileData,
                dir: dir,
                notify: true
              }
              core.plugins.Settings.run('SaveSettings', params)
                  .then( () => {
                    this.setState({ loading: false })
                  })
            }, 

            renderTP(item){
              return <span>{ item.title }</span>
            },

            renderItem(item, key) {
              if (!item) return null; 
               
              return (
                <React.Fragment key={ key }>
                  <Tooltip style={ this.styles('item') } content={ this.renderTP(item)  } position={ 'top' } onClick={ item.onClick } > 
                    <Icon color={ units.colors.white } icon={ item.icon } size={ 14 } />
                  </Tooltip>
                </React.Fragment>

              )  
            }, 

            render() {
              let { menuItems, loading, useMongo } = this.state;

              return (
                <div style={ this.styles('root') }  >
                     
                  <div style={ this.styles('menu') }> 
                    { menuItems.map(this.renderItem) }
                  </div>

                  {/* <div style={{ ...this.styles('menu'), color: units.colors.white, fontSize: 12 }}>
                    <span> File System </span>
                    <Switch size={ 1.2 } checked={ useMongo } style={{ margin: '0 15px' }} />
                    <span> Mongo </span>
                  </div> */}
                   
                  <div style={ this.styles('info') } >
                    
                    <Tooltip style={ this.styles('item') } content={ moment().format('LLLL') } position={ 'bottom' }>
                      <Icon color={ units.colors.white } icon={ core.icons('general.clock') }  size={ 14 } />
                    </Tooltip>
                    <Loader size={ 15 } color={ units.colors.white } show={ loading } /> 
                  </div> 

                </div>
              );
            }
        };
    }
};
