// import { Link } from 'react-router-dom';
// var tinycolor = require('tinycolor2');
// import moment from 'moment'; 
import { find } from 'lodash';
module.exports = {
    name: 'FloatingMenu',
    dependencies: ['Simple.Loader', 'Settings.MenuItem', 'Layouts.Row', 'Simple.Label', 'Decorators.Tooltip', 'Decorators.Popover', 'Inputs.Button', 'Inputs.Switch', 'Simple.Icon'],
    get(Loader, MenuItem, Row, Label, Tooltip, Popover, Button, Switch, Icon) {

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
                parentKey:  PropTypes.string,
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
              core.on('file:save', this.save);
              this.menuItems = [
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
                  onClick: e => { this.handelSubMenu(e, { key: 'load', title: core.translate('Load') }) }
                  // onClick: this.load
                },
                {
                  title: core.translate('Restore'),
                  icon: core.icons('notify.error'),
                  onClick: this.restore
                }
              ]
              this.setMenuItems(this.props.parentKey, this.menuItems)
            },            

            componentWillReceiveProps(nextProps) {
              if (nextProps.parentKey !== this.props.parentKey) {
                this.setMenuItems(nextProps.parentKey, this.menuItems)
              }
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
                  position:'absolute',
                  right: 25,
                  bottom: 25,
                  zIndex: 5,
                  ...flex,
                  // flexDirection: 'column',
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

            setMenuItems(dir = this.props.parentKey, items){
              let { fileMenu } = core.plugins.access.get();
              // console.debug('fileMenu[dir] => ', fileMenu[dir]);
              let subItems = fileMenu[dir];
              let dev = items.map(item => {
                if (item.subItems && item.key == 'load') {
                  return {
                    ...item,
                    subItems: subItems.map(item => { return { ...item, title: item.fileName } }),
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

            load(item) {
              console.log('load -', item, this.props.parentKey)
              this.setState({ loading: true })
 
              let fileName = item.fileName;
              let dir = this.props.parentKey; 
              

              core.plugins.Settings.run('LoadFile', { fileName, dir })
                  .then((newFile)=>{
                    console.debug('newFile => ', newFile);
                    

                    this.setState({ loading: false })

                    let data = {
                      fileData: newFile,
                      dir: dir,
                      notify: true
                    }
                    core.plugins.Settings.run('SaveSettings', data);
                  }); 
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
              TODO:  
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
              return <MenuItem key={ key } 
                              icon={ item.icon } 
                              iconColor={ units.colors.primary } 
                              label={ item.title } 
                              labelStyle={{ marginLeft: 15 }} 
                              onClick={ item.onClick } />
            }, 

            renderSubItem(item, key) {
              if (!item) return null; 
              return <MenuItem key={ key } 
                        label={ item.title } 
                        icon={ core.icons('files.file') }
                        labelStyle={{ marginLeft: 15 }} 
                        onClick={ e => { this.load(item) } }/>   
                
            }, 

            expandMenu(e){
              this.setState({ anchorEl: e.currentTarget })
            },

            closeMenu(){
              this.setState({ anchorEl: undefined })
            },

            renderContent(){
              let { menuItems, showSub } = this.state;
              if (showSub) return null;
              return (
                <div style={{ width: '100%', height: 210 }}> 
                  { menuItems.map(this.renderItem) }
                </div>
              )
            },

            getSubMenuItems(subKey){
              let { menuItems } = this.state; 
              let found = find(menuItems, { key: subKey });
              if (found && found.subItems) return found.subItems
              else return []
            },
            

            renderSubMenu (){
              let { showSub, subTitle, realShow } = this.state; 

              if (!showSub) return null
              let subMenuItems = this.getSubMenuItems(showSub) 

              return (
                <div style={{ width: '100%', height: 230 }}> 

                  <Row height={ 30 } style={{ cursor: 'pointer', backgroundColor: 'white' }} padding={ '0 10px' } onClick={ this.handelSubMenu }>
                    <Icon size={ 16 } icon={ core.icons('navigate.left') } />
                    <Label label={ subTitle } />
                  </Row>
                  <div style={{ 
                    height: "calc(100% - 40px)", 
                    maxHeight: "100%", 
                    overflow: "auto", 
                    opacity: realShow ? 1 : 0, 
                    transform: realShow ? 'translateX(0)' : 'translateX(-25px)',
                    transition: 'all 0.05s ease-in'  
                  }}>
                    { subMenuItems.map(this.renderSubItem) }
                  </div>
                </div>
              )
            },

            handelSubMenu(e, param){
              let { showSub } = this.state;
              if (showSub) this.setState({ showSub: null, subTitle: null, realShow: false })
              else if (param) {
                let { key, title } = param;
                this.setState({ showSub: key, subTitle: title, first: true }, ()=>{
                  setTimeout(() => {
                    this.setState({ realShow: true })
                  }, 150);
                })
              }
            },

            render() {
              let { menuItems, loading, useMongo, showSub, first, anchorEl } = this.state;
              let expanded = Boolean(anchorEl)
              return (
                <div style={ this.styles('root') }>
                  <Button theme={ 'primary' }
                          variant={ 'raised' }  
                          disabled={ false } 
                          isLoading={ false }
                          width={ expanded ? 280 : 70 }
                          onClick={ this.expandMenu }
                          style={{
                            paddingLeft: expanded ? 5 : 0,
                            justifyContent: expanded ? 'flex-start' : 'center',
                            transition: 'all 0.15s ease-in-out',
                          }}  >
                    Menu
                  </Button>
                  <Popover  anchorEl={ anchorEl }
                            width={ 280 }
                            delay={ 250 }
                            position={ 'top' }
                            theme={ 'light' }
                            backdrop={ false }
                            elevation={ 4 }
                            padding={ showSub ? 0 : '20px 0 0' }
                            offsetX={ first ? 0 : 5 }
                            offsetY={ 15 }
                            interactive={ false }
                            onClose={ this.closeMenu } >
                    { this.renderContent() }
                    { this.renderSubMenu() }
                  </Popover>
                  
                </div>
              )
              // return (
              //   <div style={ this.styles('root') }  >
                     
              //     <div style={ this.styles('menu') }> 
              //       { menuItems.map(this.renderItem) }
              //     </div>

              //     {/* <div style={{ ...this.styles('menu'), color: units.colors.white, fontSize: 12 }}>
              //       <span> File System </span>
              //       <Switch size={ 1.2 } checked={ useMongo } style={{ margin: '0 15px' }} />
              //       <span> Mongo </span>
              //     </div> */}
                   
              //     <div style={ this.styles('info') } >
                    
              //       <Tooltip style={ this.styles('item') } content={ moment().format('LLLL') } position={ 'bottom' }>
              //         <Icon color={ units.colors.white } icon={ core.icons('general.clock') }  size={ 14 } />
              //       </Tooltip>
              //       <Loader size={ 15 } color={ units.colors.white } show={ loading } /> 
              //     </div> 

              //   </div>
              // );
            }
        };
    }
};
