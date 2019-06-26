// import { Link } from 'react-router-dom';
// var tinycolor = require('tinycolor2');
// import moment from 'moment';
import { find } from 'lodash';
module.exports = {
    name: 'FloatingMenu',
    dependencies: [
      'Simple.Loader',
      'Settings.MenuItem',
      'Settings.LibraryPopup',
      'Popovers.Popup',
      'Popovers.PopupHandler',
      'Layouts.Row',
      'Simple.Label',
      'Decorators.Tooltip',
      'Decorators.Popover',
      'Buttons.Button',
      'Buttons.Switch',
      'Simple.Icon'],
    get(Loader, MenuItem, LibraryPopup, Popup, PopupHandler, Row, Label, Tooltip, Popover, Button, Switch, Icon) {

        var core = this;
        var { React, PropTypes } = core.imports;
        var { Fragment } = React;
        var units = {
          colors: {
            default: core.theme('colors.default'),
            secondary: core.theme('colors.secondary'),
            primary: core.theme('colors.primary'),
            white: core.theme('colors.white'),
            icon: core.theme('buttons.primary'),
            dark: core.theme('colors.dark'),
            active: core.theme('notify.success')
          },
          texts: {
            secondary: core.theme('texts.secondary'),
            logo: core.theme('colors.grey070')
          },
          backgrounds: {
            default: core.theme('colors.dark'),
            primary: core.theme('colors.purple10')
          },
          dim: {
            height: core.dim('nav.top.height')
          },
          boxShadow: `4px -4px 10px -10px rgba(0,0,0,0.12), 4px -10px 16px -12px rgba(0,0,0,0.16)`,
          icons: {
            active: core.icons('notify.success'),
            addFolder: core.icons('general.addFolder'),
            folder: core.icons('general.folder'),
            file: core.icons('files.file'),
            upload: core.icons('general.upload'),
            save: core.icons('general.save'),
            project: core.icons('files.project'),
            more: core.icons('general.more'),
            more_horiz: core.icons('general.more_horiz'),
            error: core.icons('notify.error'),
            left: core.icons('navigate.left')
          }


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

              let translate = {
                load: core.translate('Load'),
                add: core.translate('Add'),
                project: core.translate('Project'),
                projects: core.translate('Projects'),
                library: core.translate('Library')

              }
              this.menuItems = [
                {
                  title: translate.projects,
                  icon: units.icons.folder,
                  subItems: true,
                  key: 'projects',
                  onClick: e => { this.handelSubMenu(e, { key: 'projects', title: translate.projects }) }
                },

                { divider: true },
                {
                  title: translate.add,
                  icon: units.icons.addFolder,
                  subItems: [{
                    title: translate.library,
                    icon: units.icons.file,
                    onClick: this.handleOpenLibraryPopup
                  },{
                    title: translate.project,
                    icon: units.icons.project,
                    onClick: undefined
                  }],
                  key: 'add',
                  onClick: e => { this.handelSubMenu(e, { key: 'add', title: translate.add }) }
                },

                { divider: true },

                {
                  title: core.translate('Save'),
                  icon: units.icons.save,
                  key: 'save',
                  onClick: this.save
                },
                {
                  title: translate.load,
                  icon: units.icons.upload,
                  subItems: true,
                  key: 'load',
                  onClick: e => { this.handelSubMenu(e, { key: 'load', title: translate.load }) }
                  // onClick: this.load
                },

                { divider: true },

                {
                  title: core.translate('Restore'),
                  icon: units.icons.error,
                  onClick: this.restore
                }
              ]

              this.setMenuItems(this.props.parentKey, this.menuItems, () => {

                if (this.props.currentPath && this.props.projects) {
                  this.setProjectsMenu(this.props.currentPath, this.props.projects)
                }
              })
            },

            componentWillReceiveProps(nextProps) {
              if (nextProps.parentKey !== this.props.parentKey) {
                this.setMenuItems(nextProps.parentKey, this.menuItems)
              }
            },


            componentWillUnmount() {
              core.off('file:save', this.save);
            },

            setProjectsMenu(currentPath, projects){
              let { menuItems } = this.state;
              // console.debug({currentPath, projects, menuItems});
              let dev = menuItems.map(item => {
                if (item.subItems && item.key == 'projects') {
                  let subItems = projects.map(proj => {
                    let isActive = proj.root === currentPath;
                    return {
                      ...item,
                      isActive: isActive,
                      title: proj.name,
                      icon: units.icons.project,
                      onClick: () => { this.handleSelectProject(proj) }
                    }
                  });

                  return {
                    ...item,
                    subItems: subItems
                  }
                }
                return item;
              })
              this.menuItems = dev;
              this.setState({ menuItems: dev })
            },

            handleSelectProject(project) {
              core.plugins.Settings.run('selectServerConfig', {
                configPath: project.root,
                configName: project.name
              })
              .then(()=>{
                location.reload()
              })
              .catch( console.error )
            },

            styles(s) {
              let { popupPosition, realShow, anchorEl } = this.state;
              let expanded = Boolean(anchorEl)

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
                expandingButton: {
                  width: 32,
                  borderRadius: expanded ? 2 : '50%',
                  justifyContent: expanded ? 'flex-start' : 'center',
                  transition: 'all 0.15s ease-in-out',
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
                subMenuList: {
                  height: 'calc(100% - 40px)',
                  maxHeight: '100%',
                  overflow: 'auto',
                  opacity: realShow ? 1 : 0,
                  transform: realShow ? 'translateX(0)' : 'translateX(25px)',
                  transition: 'all 0.05s ease-in'
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

            setMenuItems(dir = this.props.parentKey, items, callback){
              let { fileMenu } = core.plugins.access.get();
              // console.debug('fileMenu[dir] => ', fileMenu[dir]);
              let subItems = fileMenu[dir];
              let dev = items.map(item => {
                if (item.subItems) {
                  if (item.key == 'load') return {
                    ...item,
                    subItems: subItems.map(subItem => {
                      return {
                        ...subItem,
                        title: subItem.fileName,
                        onClick: e => { this.load(subItem) }
                     }
                   }),
                  }
                  else if (item.key == 'add') return {
                    ...item,
                    subItems: item.subItems.map(subItem => {
                      return {
                        ...subItem,
                        disabled: !subItem.onClick
                      }
                    }),
                  }
                }  return item
              })

              this.setState({ menuItems: dev }, ()=>{
                if (callback) setTimeout(callback, 150)
              })

            },

            getCachedDirName(){
              let cache = core.plugins.Settings.get(['editor', 'cache']);
              let dir = Object.keys(cache)[0];
              let fileData = Object.values(cache)[0];
              return { dir, fileData };
            },

            load(item) {
              // console.log('load -', item, this.props.parentKey)
              this.setState({ loading: true })

              let fileName = item.fileName;
              let dir = this.props.parentKey;


              core.plugins.Settings.run('LoadFile', { fileName, dir })
                  .then((newFile)=>{
                    // console.debug('newFile => ', newFile);


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
              else if (item.divider) return <MenuItem key={ key } divider />
              return (
                  <MenuItem key={ key }
                            icon={ item.icon }
                            iconColor={ units.colors.icon }
                            label={ item.title }
                            disabled={ item.disabled }
                            hasChildren={ item.subItems && item.subItems.length }
                            labelStyle={{ marginLeft: 15 }}
                            onClick={ item.onClick } />
              )
            },

            renderSubItem(item, key) {
              if (!item) return null;
              else if (item.divider) return <MenuItem key={ key } divider />
              return (
                <div key={ key } style={{ display: 'flex', alignItems: 'center' }}>

                  <MenuItem key={ key }
                            label={ item.title }
                            disabled={ item.disabled }
                            iconSize={ 14 }
                            iconColor={ units.colors.icon }
                            icon={ item.icon || units.icons.file }
                            rowPadding={ '0px 10px 0px 15px' }
                            labelStyle={{ marginLeft: 5 }}
                            onClick={ item.onClick || undefined }/>

                  { item.isActive ? <Icon size={ 16 } color={ units.colors.active } style={{ position: 'absolute', right: 5 }} icon={ units.icons.active } /> : null  }

                </div>
              )

            },

            expandMenu(e){
              this.setState({ anchorEl: e.currentTarget })
            },

            closeMenu(){
              this.closeSubMenu();
              setTimeout(() => {
                this.setState({ anchorEl: undefined })
              }, 50);
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
              // console.debug('[found] ', found)
              if (found && found.subItems) return found.subItems
              else return undefined
            },

            renderSubMenu (){
              let { showSub, subTitle, realShow } = this.state;

              if (!showSub && !realShow) return null
              let subMenuItems = this.getSubMenuItems(showSub)

              return (
                <div style={{ width: '100%', height: 210 }}>

                  <Row height={ 30 } style={{ cursor: 'pointer', backgroundColor: units.colors.white }} padding={ '0 10px' } onClick={ this.handelSubMenu }>
                    <Icon size={ 16 } icon={ units.icons.left } />
                    <Label label={ subTitle } />
                  </Row>
                  <div style={ this.styles('subMenuList') }>
                    { subMenuItems && subMenuItems.length ? subMenuItems.map(this.renderSubItem) : null }
                  </div>
                </div>
              )
            },

            closeSubMenu(){
              this.setState({
                showSub: null,
                subTitle: null,
                realShow: false
              })
            },

            handelSubMenu(e, param){
              let { showSub } = this.state;
              if (showSub) this.closeSubMenu()
              else if (param) {
                let { key, title } = param;
                this.setState({ showSub: key, subTitle: title, first: true }, ()=>{
                  setTimeout(() => {
                    this.setState({ realShow: true })
                  }, 150);
                })
              }
            },

            saveLibraryName(){
              let dir = PopupHandler.getData('addlibrarypopup');
              let name = dir.split(' ').join('_');
              
              this.setState({ loading: true })
              let params = {
                fileData: {},
                dir: name,
                notify: true
              }
              core.plugins.Settings.run('SaveSettings', params)
                  .then( () => {
                    core.emit('reload:settings');
                    this.setState({ loading: false })
                    PopupHandler.close('addlibrarypopup')
                  })
              
            },

            handleOpenLibraryPopup(e){
              PopupHandler.open({
                id: 'addlibrarypopup',
                parameters: {
                    title: seed.translate('Add Library'),
                    body: <LibraryPopup />,
                    okButton: {
                        btnTitle: seed.translate('Done'),
                        btnFunc: this.saveLibraryName
                    }
                }
              });
              // this.setState({ libraryAnchor: e.currentTarget })
            },

            render() {
              let { menuItems, loading, useMongo, showSub, first, anchorEl, libraryAnchor } = this.state;
              let expanded = Boolean(anchorEl);

              return (
                <div style={ this.styles('root') }>
                  <Button theme={ 'primary' }
                          variant={ 'raised' }
                          disabled={ false }
                          isLoading={ loading }
                          height={ 32 }
                          width={ expanded ? 280 : 32 }
                          onClick={ this.expandMenu }
                          style={ this.styles('expandingButton') }  >
                    {
                      expanded ?
                        <Fragment>
                          <Icon size={ 16 } color={ units.colors.white } icon={ units.icons.more } style={{ marginRight: 5 }} />
                          { core.translate('Menu') }
                        </Fragment>

                        : <Icon size={ 16 } color={ units.colors.white } icon={ units.icons.more_horiz } />
                    }
                  </Button>
                  <Popover  anchorEl={ anchorEl }
                            width={ 280 }
                            delay={ 250 }
                            position={ 'top' }
                            theme={ 'light' }
                            backdrop={ false }
                            elevation={ 4 }
                            padding={ '5px 0 0' }
                            offsetX={ first ? 0 : 5 }
                            offsetY={ 15 }
                            interactive={ false }
                            onClose={ this.closeMenu } >

                    { this.renderContent() }
                    { this.renderSubMenu() }

                  </Popover>

                  <Popup  id={ 'addlibrarypopup' } 
                          height={125} 
                          titleColor={units.colors.icon}
                          isAbsolute={ false } 
                          titleHeight={ 35 } 
                          footerHeight={ 35 }/>
                </div>
              )
            }
        };
    }
};
