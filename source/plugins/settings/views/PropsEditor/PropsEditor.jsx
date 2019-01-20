import { MenuItem, Paper } from '@material-ui/core/';

module.exports = {
    name: "PropsEditor",
    description: '',

    dependencies: [ 'componentsCollection.ExpandingPanel','Settings.StemCell'],

    get( ExpandingPanel, StemCell ) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {

            },

            getDefaultProps(){
                return {
                };
            },

            getInitialState() {
                return {
                    selectedMenuItem: null,
                };
            },

            componentWillMount() {
                this.initialUnits();
            },

            componentDidMount() {
            },

            componentWillUnmount() {
            },

            initialUnits() {
                this.backgrounds = {
                    menu: core.theme('backgrounds.menu'),
                    default: core.theme('backgrounds.default'),
                    boxShadow: core.theme('backgrounds.boxShadow'),
                }
                this.colors = {
                    gray: core.theme('colors.gray'),
                    dark: core.theme('colors.dark'),
                    borderRight: core.theme('colors.gray'),
                }
                this.icons = {}
                this.units = {
                    gridWidth: (document.getElementById('GridManager.root')) ? document.getElementById('GridManager.root').offsetWidth : 1500,
                }
            },

            styles(s) {
                let styles = {
                    root: {
                        width: '100%',
                        height: `calc( 100vh - ${core.dim("appBar.height") + core.dim("blackBar.height")}px )`,
                        display: 'flex',
                        flexDirection: 'row',
                    },
                    mainCont: {
                        display: 'flex',
                        position:'relative', 
                        flex:1
                    },
                    menuBar:{
                        width: '230px',
                        minWidth: '230px',
                        borderRight: `solid 1px ${this.colors.borderRight}`,
                    },
                    menuItem:{
                        margin: 0,
                    },
                    innerListCont:{
                        borderTop: `1px solid ${this.backgrounds.light_gray}`,
                        borderBottom: `1px solid ${this.backgrounds.light_gray}`,
                        maxHeight: 'calc( ( 100vh - 48px ) / 3 - 40px )',
                        overflow: 'auto',
                    },
                    innerListItem:{
                        padding: "5px 15px",
                        margin: 0,
                        fontSize: 13,
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        display: "block",
                        overflow: "hidden",
                    }
                }

                return(styles[s]);
            },

            createInnerItem(itemSettings){
                let item = {
                    listItem: itemSettings.title,
                    props: {
                        settingsId: itemSettings.key
                    }
                }

                return item;
            },

            handleMenuItemClick(item){
              this.setState({
                compProps: item.props
              });
            },

            onClickExpand(menuItem){
                this.setState({
                    selectedMenuItem:menuItem.display,
                    compProps: {}
                });
            },

            renderEX(){
                let {selectedMenuItem, compProps} = this.state;
                if(!selectedMenuItem) return null;

                return <StemCell componentName={selectedMenuItem} settingsId={compProps.settingsId} />
            },

            renderInnerList(list){
                return (
                    <div style={this.styles('innerListCont')}>
                        {
                            list.innerList.map((item,i)=>{
                                let {selectedMenuItem} = this.state;
                                let selected = false;

                                if(selectedMenuItem===item.listItem){
                                    selected = true
                                }
                                return (
                                    <MenuItem key={i} title={item.listItem} id={i} selected={selected} style={this.styles('innerListItem')} 
                                    onClick={(e)=>{this.handleMenuItemClick(item)}}>{item.listItem}</MenuItem>
                                );
                            })
                        }
                    </div>
                )
            },

            renderPanel(menuItem,idx){
                return (
                    <ExpandingPanel
                            onClick={ this.onClickExpand.bind(this, menuItem) }                        
                            children={menuItem.innerList}
                            key={idx}
                            name={`${menuItem.name}`}
                            id={idx}
                            childRender={  this.renderInnerList.bind(this, menuItem)  }
                            style={this.styles('menuItem')}>
                    </ExpandingPanel>
                )
            },

            createMenuList(data){
                return data.map((settingObj)=>{
                   return ({
                        name: settingObj.key,
                        display: settingObj.key,
                        innerList: settingObj.data.map(this.createInnerItem)
                    })
                })
            },

            renderMenuBar(){
                let { data } = this.props;
                let menuList = this.createMenuList(data);
 
                return(
                    <div style={this.styles('menuBar')}>
                        {   
                            _.map(menuList, this.renderPanel)
                        }
                    </div>
                )
            },

            render() {

                return (
                    <div style={ this.styles('root') }>
                        { this.renderMenuBar() }                           

                        <Paper elevation={ 2 } style={ this.styles('mainCont') }>
                            { this.renderEX() }
                        </Paper>

                    </div>
                )


            }
        }
    }
}
