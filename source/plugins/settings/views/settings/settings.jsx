
import { AppBar, Tabs, Tab,  Button } from '@material-ui/core';

module.exports = {
    name: "Settings",
    description: '',
    propTypes: {},
    bindings: {
      config: ['config'],
      fileMenu: ['fileMenu'],
    },
    dependencies: ['SimpleSwitch.Helper', 'SimpleSwitch.NestedMenu', 'Settings.SavePopup', 'Settings.CategoryPopup', 'Settings.CodeEditor', 'componentsCollection.NoResults',],

    get(Helper, NestedMenu, SavePopup, CategoryPopup, CodeEditor, NoResults) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                config: PropTypes.object,
                fileMenu: PropTypes.object,
            },

            getInitialState() {

                return {
                    error: null,
                    anchorEl: null,
                    menuAnchorEl: null,
                    fileNameToSave: null,
                    catNameToSave: null,
                    tabValue: 0,

                    viewType: 'ui', // code || ui

                    activeTab: null,

                    tabs: [{
                        label: '',
                        key: '',
                        data: null,
                    }],

                    menuList: [
                    {
                      onClick: null,
                      label: core.translate('View')+'...',
                      key: 'view',
                      suffix: core.translate('ToggleView', 'Toggle Ctrl+U'),
                      nested: [{
                        label: core.translate('UI'),
                        key: 'view_ui',
                        onClick: () => { this.toggleView('ui') }
                      },{
                        label: core.translate('Code'),
                        key: 'view_code',
                        onClick: () => { this.toggleView('code') }
                      }]
                    },
                    { divider: true  },
                    {
                      onClick: null,
                      label: core.translate('New'),
                      key: 'new'
                    },
                    {
                      onClick: this.handleSave,
                      label: core.translate('Save'),
                      suffix: core.translate('Ctrl+S'),
                      key: 'save'
                    },{
                      onClick: this.openSavePopup,
                      label: core.translate('Save as')+'...',
                      suffix: core.translate('Ctrl+Shift+S'),
                      key: 'save_as'
                    },
                    { divider: true  },
                    {
                      onClick: null,
                      label: core.translate('Load file'),
                      nested: true,
                      key: 'load_file'
                    },
                    { divider: true  },
                    {
                      onClick: this.handleRestore,
                      label: '',
                      suffix: core.translate('Ctrl+Shift+R'),
                      key: 'restore'
                    }]
                };
            },

            componentWillMount () {
              this.initUnits();
            },

            componentDidMount() {
                this.isUnmounted = false;
                core.on('config:changed', this.handleSave);
                core.on('config:restore', this.handleRestore);
                core.on('settings:changeView', this.handleChangeView);

                document.addEventListener('keydown', this.handleKeyDown);

                if (this.props.config) this.setTabs(this.props.config, tabs => {
                  // this.setActiveTab(this.state.tabValue, tabs);
                  if (this.props.fileMenu) this.setMenu(this.props.fileMenu, this.state.tabValue);

                });
                // if (this.props.config) this.setActiveTab(this.state.activeTab, this.props.config)
                // if (this.props.fileMenu) this.setMenu(this.props.fileMenu, this.state.tabValue);

            },

            componentWillUnmount() {
                this.isUnmounted = true;
                core.off('config:changed', this.handleSave);
                core.off('config:restore', this.handleRestore);
                core.off('settings:changeView', this.handleChangeView);

                document.removeEventListener('keydown', this.handleKeyDown);

            },

            componentWillReceiveProps(nextProps) {
                if (nextProps.config && (!_.isEqual(nextProps.config, this.props.config))) {
                  this.setTabs(nextProps.config, tabs => {
                    if (nextProps.fileMenu && (!_.isEqual(nextProps.fileMenu, this.props.fileMenu))) {
                      this.setMenu(nextProps.fileMenu, this.state.tabValue)
                    }
                  });
                }

            },

            initUnits(){
              this.rootBackground =  core.theme('backgrounds.light_gray');
            },

            getUIbyKey(key){

              switch (key) {
                case 'theme':
                  return 'Settings.ThemeEditor';

                case 'icons':
                  return 'Settings.IconEditor';

                case 'general':
                  return 'Settings.GeneralUi';

                case 'components':
                  return 'Settings.PropsEditor'; 

                default:
                  return null;

              }
            },

            setTabs(config, callback){
              var newconfig = Helper.mapObject(config);
              var { activeTab, tabValue } = this.state;
              var tabs = _.map(newconfig, tab => {
                return {
                  ...tab,
                  label: tab.key,
                  ui: this.getUIbyKey(tab.key),
                }
              });

              var tabIndex = activeTab && tabs.indexOf(activeTab) > -1 ? tabs.indexOf(activeTab)  : tabValue;
              let { general } = config;
              if (general && !general.showSystemConfig) {
                tabs = _.filter(tabs, tab => { return tab.key == 'general' });
                tabIndex = 0;
              } else if (activeTab && activeTab.key == 'general') tabIndex = 1;

              this.setState({ tabs, activeTab: tabs[tabIndex], tabValue: tabIndex }, ()=>{
                if (callback) callback(tabs)
              });
            },

            setActiveTab(tabValue, tabs){
                let activeTab = tabs[tabValue];
                this.setState({ activeTab });
            },

            setMenu(fileMenu, tabValue){
              let { menuList, tabs } = this.state;
              menuList = _.map(menuList, (item)=>{
                if (item.key == 'new') {
                    item = {
                      ...item,
                      label: core.translate('New')+'...',
                      nested: [{
                        label: core.translate('Category'),
                        key: 'new_cat',
                        suffix: core.translate('Ctrl+Shift+P'),
                        onClick: this.openCategoryPopup
                      }]
                    }
                }
                if (item.key == 'restore') {
                    item = {
                      ...item,
                      label: `${core.translate('Restore')} ${ tabs[tabValue].label }`
                    }
                }
                return item
              });

              if (fileMenu) {
                let items = fileMenu[tabs[tabValue].label];
                let newMenuList = _.map(menuList, (item)=>{
                  if (item.key == 'load_file' && item.nested) {
                    return {
                      ...item,
                      nested: _.map(items, (nestedItem)=>{
                        if (nestedItem.fileName.indexOf('modified')>-1) return null;
                        return {
                          label: nestedItem.fileName,
                          onClick: () => { this.handleLoadFile(nestedItem.fileName) }
                        }
                      })
                    }
                  } else return item
                });

                this.setState({ menuList: newMenuList })
              }

            },

            styles(propName) {
              let styles = {
                root: { height: '100%', width: '100%', display: 'flex',  flexDirection: 'column', background: this.rootBackground },
                content: {
                  display: 'flex',
                  flex:1
                },
                tabs: { minHeight: 40, maxHeight: 40, height: '100%', width: '100%' },
                tab: { minHeight: 40, maxHeight: 40, height: 40,
                  minWidth: 160,
                 maxWidth: 160
                },
                button: {
                  minHeight: 30,
                  maxHeight: 30,
                  width: 'auto',
                  pedding: 0,
                  fontSize: 12,
                  borderRadius: 2
                },
                popupBody: { minWidth: 400, minHeight: 'unset', padding: '0px 22px', overflow: 'hidden' }
              }
              return styles[propName]
            },

            toggleView(view){
              this.setState({ viewType: view });
            },

            handleKeyDown(event){

              var eventCode = event.code.replace('Key','');
              eventCode = eventCode.toLowerCase()
              if ((event.ctrlKey || event.metaKey) && event.shiftKey) { // ctrl+shift+key
                switch (eventCode) {
                  case 's':
                    event.preventDefault();
                    this.openSavePopup();
                    break;

                  case 'p':
                    event.preventDefault();
                    event.stopPropagation();
                    this.openCategoryPopup();
                    break;

                  case 'r':
                    event.preventDefault();
                    this.handleRestore();
                    break;
                }

              }
              else if (event.ctrlKey || event.metaKey) {
                switch (eventCode) { // ctrl+key
                  case 's':
                    event.preventDefault();
                    this.handleSave()
                    break;

                  case 'u':
                    event.preventDefault();
                    this.handleChangeView()
                    break;
                }
              } else {
                switch (event.keyCode) {
                  case 27: //esc

                    break;

                  case 13: // enter
                    break;
                }
              }

            },

            handleChangeView(){
              if (this.state.viewType == 'ui') this.toggleView('code')
              else this.toggleView('ui');
            },

            handleRestore(){
              this.handleLoadFile('default.json');
            },

            handleLoadFile(fileName){
              let { activeTab } = this.state;
              core.plugins.Settings.run('loadFile', { fileName, dir: activeTab.key })
                  .then((newFile)=>{
                    let data = {
                      fileData: newFile,
                      dir: activeTab.key,
                      notify: false
                    }
                    core.plugins.Settings.run('saveSettings', data);
                  });

            },

            handleChange(event, tabValue) {
                this.setState({ tabValue });
                this.setActiveTab(tabValue, this.state.tabs);
                this.setMenu(this.props.fileMenu, tabValue)
            },

            handleSave(tab){
              let activeTab, fileData;

              if (tab) activeTab = tab;
              else activeTab = this.state.activeTab;

              if (tab && tab.code) fileData = JSON.parse(tab.data);
              else fileData = Helper.arrayToObject(activeTab.data, 'key', 'data');


              let data = {
                fileData: fileData,
                dir: activeTab.key,
                notify: true
              }

              // console.debug('data => ', data);
              core.plugins.Settings.run('saveSettings', data);
            },

            handleSaveAs(set){
              let { activeTab, fileNameToSave } = this.state;
              var fileData = Helper.arrayToObject(activeTab.data, 'key', 'data');
              let fname = fileNameToSave && fileNameToSave.length ? fileNameToSave.trim() : null;
              if (fname) {
                fname = fname.split(' ').join('_');
                let saveData = {
                  fileName: fname,
                  fileData: fileData,
                  dir: activeTab.key,
                  set: set
                }
                core.plugins.Settings.run('saveFile', saveData).then(()=>{
                  core.plugins.Settings.run('loadSettings').then(( data )=>{
                    let { menu } = data;
                    if (menu) core.plugins.Settings.set(['fileMenu'], menu)
                  });
                  core.emit('Popup.close');
                });

              } else {
                let notify = {
                    title: 'File Name Error ',
                    text: 'Invalid file name',
                    alertKind: 'error'
                }
                core.emit('notify',notify);
                return;
              }
            },

            handleAddNewCategory(){
              let { catNameToSave, activeTab } = this.state;

              let catName = catNameToSave && catNameToSave.length ? catNameToSave.trim() : null;
              if (catName) {
                catName = Helper.makeCamelCase(catName);
                let activeTabData = Helper.arrayToObject(activeTab.data, 'key', 'data');

                let newData = { ...activeTabData, [ catName ]: {} }

                let data = {
                  fileData: newData,
                  dir: activeTab.key,
                  notify: false
                }

                core.plugins.Settings.run('saveSettings', data)
                    .then(()=>{
                        core.emit('Popup.close');
                    });

              } else {
                let notify = {
                    title: 'Category Name Error ',
                    text: 'Invalid category name',
                    alertKind: 'error'
                }
                core.emit('notify',notify);
                return;
              }
            },

            handleFileName(fileName){
              this.setState({ fileNameToSave: fileName })
            },

            handleCategoryName(catName){
              this.setState({ catNameToSave: catName })
            },

            openSavePopup(){
              core.plugins.popovers.openPopup({
                  title: core.translate('Save new file'),
                  body: <SavePopup handleFileName={ this.handleFileName } />,
                  modalStyle: { height: 200 },
                  bodyStyle: this.styles('popupBody'),
                  buttons:[
                    <Button key={ 'set' } onClick={ () => { this.handleSaveAs(true) } } style={{ ...this.styles('button')  }} >
                      { core.translate('Save file and set') }
                    </Button>,
                    <Button key={ 'save' } onClick={ () => { this.handleSaveAs(false) } } style={{ ...this.styles('button')  }} >
                      { core.translate('Save file') }
                    </Button>
                  ],
                  okButton: {
                      btnTitle: null,
                      btnFunc: null
                  }
              });
            },

            openCategoryPopup(){
              core.plugins.popovers.openPopup({
                  title: core.translate('Add new category'),
                  body: <CategoryPopup handleCatName={ this.handleCategoryName } />,
                  modalStyle: { height: 200 },
                  bodyStyle: this.styles('popupBody'),
                  buttons:[
                    <Button key={ 'add' }  style={{ ...this.styles('button')  }} onClick={ this.handleAddNewCategory } >
                      { core.translate('Add') }
                    </Button>,
                  ],
                  okButton: {
                      btnTitle: null,
                      btnFunc: null
                  }
              });
            },

            renderTab(tab, i){
                return (<Tab key={ i } label={ tab.label } style={ this.styles('tab') }/>);
            },

            renderTabContent(){
              let { activeTab, viewType } = this.state;
              if (!activeTab) return null;
              let { data, ui } = activeTab;
              var Ui = core.views[ui];
              if (viewType == 'ui') {
                if (Ui) return ( <Ui data={ data } onChange={ this.handleConfigChange }/> );
                else return <div><NoResults size={7} text={core.translate('Missing UI')}/></div>
              }
              else if (viewType == 'code') {
                return (
                  <CodeEditor data={ data } parentKey={ activeTab.key }/>
                )
              }
            },

            render() {

                let { tabValue, viewType, tabs, menuList } = this.state;
                if (viewType == 'code') menuList = _.filter(menuList, item => { return item.key !== 'new' })

                return (

                    <div id={'root.settings'} style={ this.styles('root') }>

                        <AppBar position="static" color="default" style={{ flexDirection : 'row', height: 40 }}>
                            <Tabs
                                style={ this.styles('tabs') }
                                value={tabValue}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                fullWidth={ true }
                                scrollable
                                scrollButtons="auto" >
                                { _.map(tabs, this.renderTab) }
                            </Tabs>
                            <NestedMenu list={ menuList } />
                        </AppBar>

                        <div style={ this.styles('content') }>
                            { this.renderTabContent() }
                        </div>

                    </div>
                )


            }
        }
    }
}
