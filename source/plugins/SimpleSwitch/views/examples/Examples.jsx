import { MenuItem,Button  } from '@material-ui/core/';


module.exports = {
    name: "Examples",
    description: '',

    dependencies: [
        'SimpleSwitch.Helper',
        'SimpleSwitch.FullscreenSectionsExample',
        'SimpleSwitch.PerfectlyFittingText',
        'componentsCollection.ExpandingPanel',
        'SimpleSwitch.EasilyCenterYourElements',
        'SimpleSwitch.ScrollbarsAndVw',
        'SimpleSwitch.EasyFullscreenPageScrollWithBackgroundReveal',
        'SimpleSwitch.FluidHeader',
        'SimpleSwitch.OpenPopupExample',
        'SimpleSwitch.OpenLightboxExample',
        'SimpleSwitch.OpenLightboxGalleryExample',
        'SimpleSwitch.LocalGalleryExample',
        'SimpleSwitch.OneItemGalleryExample',
        'SimpleSwitch.GridManagerExample',
        'SimpleSwitch.LoaderEx',
        'SimpleSwitch.TitleBarExample'
    ],

    get(
        Helper,
        FullscreenSectionsExample,
        PerfectlyFittingText,
        ExpandingPanel,
        EasilyCenterYourElements,
        ScrollbarsAndVw,
        EasyFullscreenPageScrollWithBackgroundReveal,
        FluidHeader,
        OpenPopupExample,
        OpenLightboxExample,
        OpenLightboxGalleryExample,
        LocalGalleryExample,
        OneItemGalleryExample,
        GridManagerExample
    ) {

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
                    currentDisplay: null,
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
                    light_gray: core.theme('backgrounds.light_gray'),
                }
                this.colors = {
                    gray: core.theme('colors.gray'),
                    dark: core.theme('colors.dark')
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
                        height: 'calc( 100vh - 48px )',
                        display: 'flex',
                        flexDirection: 'row',
                    },
                    menuBar:{
                        width: '256px',
                        minWidth: '256px',
                        borderRight: `solid 1px ${this.backgrounds.light_gray}`,
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
                    },
                    exampleView:{
                        width: '100%',
                        overflowY: "auto",
                        padding: 15,
                        backgroundColor: this.backgrounds.light_gray,
                    },
                }

                return(styles[s]);
            },

            handleClick(item){

              var Component = item[1];

              this.setState({
                selectedMenuItem: item[0],
                currentDisplay: <Component/>
              });
            },

            renderInnerList(list){
                var innerList = Object.entries(list.innerList);

                return (
                    <div style={this.styles('innerListCont')}>
                        {
                            innerList.map((item,i)=>{
                                let {selectedMenuItem} = this.state;
                                let selected = false;
                                if(selectedMenuItem===item[0] ){
                                    selected = true
                                }
                                return (
                                    <MenuItem key={i} title={item[0]} id={i} selected={selected} style={this.styles('innerListItem')} onClick={(e)=>{this.handleClick(item)}}>{item[0]}</MenuItem>
                                );
                            })
                        }
                    </div>
                )
            },

            renderPanel(menuItem,idx){

                var name = Helper.openCamelCase(menuItem.name);

                return (
                    <ExpandingPanel
                            children={menuItem.innerList}
                            key={idx}
                            name={name}
                            id={idx}
                            childRender={  this.renderInnerList.bind(this, menuItem)  }
                            style={this.styles('menuItem')}>
                    </ExpandingPanel>
                )
            },

            renderMenuBar(){
            //     let menuList =  [
            //         {
            //             name: 'CSS Units',
            //             innerList:[
            //                 {listItem: 'Fullscreen Sections',display: <FullscreenSectionsExample/>},
            //                 {listItem: 'Perfectly Fitting text',display: <PerfectlyFittingText/>},
            //                 {listItem: 'Easily Center Your Elements',display: <EasilyCenterYourElements/>},
            //                 {listItem: 'Scrollbars and vw',display: <ScrollbarsAndVw/>},
            //                 {listItem: 'Easy Fullscreen Page Scroll With Background Reveal',display: <EasyFullscreenPageScrollWithBackgroundReveal/>},
            //                 {listItem: 'Fluid Header',display: <FluidHeader/>},
            //             ]
            //         },
            //         {
            //             name: 'Gallery',
            //             innerList:[
            //                 {listItem: 'OpenPopupExample',display: <OpenPopupExample/>},
            //                 {listItem: 'Lightbox',display: <OpenLightboxExample/>},
            //                 {listItem: 'Lightbox Gallery',display: <OpenLightboxGalleryExample/>},
            //                 {listItem: 'Local Gallery',display: <LocalGalleryExample/>},
            //             ]
            //         },
            //         {
            //             name: 'Grid',
            //             innerList:[
            //                 {listItem: 'Grid Manager',display: <GridManagerExample/>},
            //             ]
            //         }
            // ];

            let menuList = [];
            let plugins = core.getExamples();

            for (const key in plugins) {   
                let examples = plugins[key];
                menuList.push({ name: key, innerList: examples });
            }

            return(
                <div style={this.styles('menuBar')}>
                    {
                        _.map(menuList, this.renderPanel)
                    }
                </div>
            )
            },


            render() {
                let {currentDisplay} = this.state;
                return (
                    <div style={ this.styles('root') }>
                        { this.renderMenuBar() }

                        <div style={this.styles('exampleView')}>
                            {currentDisplay}
                        </div>

                    </div>
                )


            }
        }
    }
}
