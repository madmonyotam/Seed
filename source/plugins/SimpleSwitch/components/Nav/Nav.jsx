import { List, Icon, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Link } from "react-router-dom";

module.exports = {
    name: 'Nav',
    dependencies: [],
    get() {

        var core = this;
        var { React, PropTypes } = core.imports;
        const units = {
          colors : {
            border: core.theme('borders.default'),
            secondary: core.theme('texts.primary'),
            gray: core.theme('colors.grey027'),
            white: core.theme('colors.white'),
          },
          backgrounds: {
            blue: core.theme('backgrounds.primary'),
            nav: core.theme('colors.primary'),
          },
          dim: {
            zIndex: core.dim('nav.zIndex'),
            iconSize: core.dim('nav.iconSize'),
            fontSize: core.dim('nav.fontSize'),
            topBarHeight: core.dim('appBar.height')
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
                    activeView: 'home',
                };
            },

            getInitialState(){
                return {
                    isStatic: false,
                    navWidth: undefined,
                }
            },

            componentWillMount() {
                let isStatic = core.plugins.access.get(['general','staticNavBar']);
                this.initialUnits(isStatic);
            },

            initialUnits(isStatic) {


                this.backgrounds = {
                    blue: core.theme("colors.blue1"),
                    nav: core.theme("backgrounds.nav"),
                };

                this.icons = {
                    home: core.icons('nav.home'),
                    examples: core.icons('nav.examples'),
                    settings: core.icons('nav.settings'),
                };

                const MIN = core.dim('nav.width');
                const MAX = core.dim('nav.maxWidth');

                this.units = {
                    nav: { 
                        minWidth: MIN,
                        maxWidth: isStatic ? MIN : MAX,
                        zIndex: units.dim.zIndex,
                    },
                    iconSize:     core.dim("nav.iconSize"),
                    fontSize:     core.dim("nav.fontSize"),
                    topBarHeight: core.dim("appBar.height"),
                };
                this.setState({ isStatic })
            },

            styles(s) {
                let {navWidth} = this.state;

                let styles = {
                    container: {
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transition: 'all .25s ease-out',
                        overflow: 'hidden',
                        position: 'absolute',
                        background: units.backgrounds.nav,
                        width: navWidth || this.units.nav.minWidth,
                        boxShadow: `0px 2px 4px -1px 0.12, 
                                    0px 4px 5px  0px 0.14, 
                                    0px 1px 10px 0px 0.20`,
                    },
                    placeHolderContainer: {
                        transition: 'all .25s ease-out',
                        position: 'relative',
                        height:'100%',
                        zIndex: this.units.nav.zIndex,
                        width: navWidth || this.units.nav.minWidth,
                    },
                    navList: {
                        padding: 0
                    },
                    rowContainer: {
                        width: this.units.nav.maxWidth,
                        padding: '0',
                        height: 40,
                        cursor: 'pointer',
                        zIndex: 1,
                    },
                    rowInner: {
                        display: 'flex',
                        flex: 1,
                        padding: '12px 16px 12px 21px',
                        alignItems: 'center',
                    },
                    rowLabel: {
                        display: 'block',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize: this.units.fontSize,
                        color: units.colors.gray,
                    },
                    rowIcon: {
                        marginRight: 6,
                        fontSize: this.units.iconSize,
                    }
                
                }
                
                return(styles[s]);
            },

            getListData(listPosition){
                switch(listPosition) {
                    case 'top':
                        return [
                            {
                                label: core.translate('Home'),
                                icon: this.icons.home,
                                view: '/home'
                            },
                            {
                                label: core.translate('Examples'),
                                icon: this.icons.examples,
                                view: '/examples'
                            },
                        ];

                    case 'bottom':
                        return [
                            {
                                label: core.translate('Settings'),
                                icon: this.icons.settings,
                                renderTopBorder: true,
                                view: '/settings'
                            },
                        ];
                    default:
                        return [];
                }
            },

            setActiveItem(view){
               this.props.handleViews(view);
            },

            handleTabNavigation(state) {
                let { navWidth } = this.state;
                if(state === 'focus') {
                    if(navWidth === this.units.nav.maxWidth) return;
                    this.setState({navWidth: this.units.nav.maxWidth});
                }
                else if(state === 'blur') {
                    if(navWidth === this.units.nav.minWidth) return;
                    this.setState({navWidth: this.units.nav.minWidth});
                }
            },

            getWrapperMouseEvents(){
                let {isStatic} = this.state;

                if (!isStatic) return {
                    onMouseEnter: () => this.setState({navWidth: this.units.nav.maxWidth}),
                    onMouseLeave: () => this.setState({navWidth: this.units.nav.minWidth})
                };

                return {};
            },

            renderItemText(item, isActive) {
                
                let textStyle = { ...this.styles('rowLabel'), 
                    color: isActive ? units.colors.secondary : units.colors.gray
                };

                return (
                    <span style={ textStyle }>
                        {item.label}
                    </span>
                );
            },

            renderItemIcon(icon, isActive) {
                
                let listStyle = { ...this.styles('rowIcon'), 
                    color: isActive ? units.colors.white : units.colors.gray
                };

                return (
                    <ListItemIcon id={'Nav.row.icon'}>
                        <Icon style={ listStyle } >
                            {icon}
                        </Icon>
                    </ListItemIcon>
                );
            },

            renderItemMap(item, key, position) {
                let { activeView } = this.props;

                let view = item.view || null;
                if ( item.disabled ) return null;
                
                let isActive = (activeView === item.view);

                let itemStyle = {
                    ...this.styles('rowContainer'), 
                    borderTop: item.renderTopBorder ? `1px solid ${units.colors.borderDark}` : 'none'
                }
                let innerStyle = {
                    ...this.styles('rowInner'), 
                    background: item.disabled ? 'none' : isActive ? units.backgrounds.blue : 'none'
                }

                return (
                    <Link key={key} to={`${view}`} style={{textDecoration: 'unset' }} >
                        <ListItem
                            id={`Nav.row.${position}.wrap.item_${key}`}
                            title={item.label}
                            button={true}
                            onClick={this.setActiveItem.bind(this,view)}
                            disabled={item.disabled}
                            style={ itemStyle } >

                            <div id={`Nav.row.${position}.inner.item_${key}`} style={ innerStyle }>
                                { this.renderItemIcon(item.icon, isActive) }
                                <ListItemText 
                                    id={`Nav.row.${position}.item_${key}.Text`}
                                    primary={ this.renderItemText(item, isActive) }
                                />
                            </div>

                        </ListItem>
                    </Link>

                );
            },

            renderNavRow(items, position){

                return (
                    <List component="nav" id={`Nav.row.${position}`} style={this.styles('navList')}>
                        { items.map( (item, key)=>{ return this.renderItemMap(item, key, position) } ) }
                    </List>
                )
            },

            render() {
                let wrapperMouseEvents = this.getWrapperMouseEvents();
                return (
                    <div onBlur={() => this.handleTabNavigation('blur')} onFocus={() => this.handleTabNavigation('focus')} style={ this.styles('placeHolderContainer') }>
                        <div {...wrapperMouseEvents} style={ this.styles('container') } >
                            {this.renderNavRow(this.getListData('top'), 'top')}
                            {this.renderNavRow(this.getListData('bottom'), 'bottom')}
                        </div>
                    </div>
                );
            }
        };
    }
};
