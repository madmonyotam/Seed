import { MenuList, MenuItem  } from '@material-ui/core/';
import {isEmpty} from 'lodash';

module.exports = {
dependencies: ['Simple.Label', 'Layouts.Row', 'Layouts.Center', 'Simple.Icon', 'Inputs.IconButton', 'Inputs.Button', 'Decorators.Popover'],
get( Label, Row, Center, Icon, IconButton, Button, Popover) {

    var core = this;
    var { React, PropTypes, ComponentMixin } = core.imports;

    return {
        mixins: [ ComponentMixin ],

        propsTypes: {
            style: PropTypes.object,
            menuTitle: PropTypes.string,
            menuWidth: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
            menuItemStyle: PropTypes.object,
            menuStyle: PropTypes.object,
            menuItems: PropTypes.shape({
                text: PropTypes.string,
                value: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
                iconProps: PropTypes.shape({
                    icon: PropTypes.string,
                    color: PropTypes.string,
                }),
                onClick: PropTypes.func,
            }).isRequired,

            icon: PropTypes.string,
            iconColor: PropTypes.string,
            iconSize: PropTypes.number,
            iconStyle: PropTypes.object,
            iconButtonStyle: PropTypes.object,
            
            selected: PropTypes.any,
            background: PropTypes.string,
            active: PropTypes.bool,
            dropDown: PropTypes.bool,
        },

        getDefaultProps() {
            return {
                style: {},
                menuTitle: null,
                menuWidth: 135,
                menuItemStyle: {},
                menuStyle: {},
                menuItems: [],
                menuIconSize: 20,

                icon: core.icons('general.info'),
                iconColor: core.theme('texts.default'),
                iconSize: 20,
                iconStyle: {},
                iconButtonStyle: {},
                
                selected: undefined,
                background: core.theme('backgrounds.default'),
                active: false,
                dropDown: false,
            }
        },

        getInitialState() {
            return {
                anchorEl: null,
            };
        },

        componentWillMount() {
            this.initialUnits();
        },

        initialUnits() {
            this.colors = {
                active: core.theme('texts.selected'),
                selected: core.theme('texts.selected'),
                dark: core.theme('texts.default'),
                border: core.theme('borders.default')
            };
            this.backgrounds = {
                secondary: core.theme('backgrounds.secondary'),
            };
            this.icons = {
                dropDown: core.icons('navigate.arrow_down'),
            };
        },


        styles(s) {
            let {style, menuStyle, menuItemStyle, background,
                iconStyle, iconSize, iconButtonStyle, active, iconColor} = this.props;

            let menuItem = {
                padding: '0 10px',
                fontWeight: 400,
                fontSize: 12,
                height: 35,
                display: 'flex',
                alignItems: 'center',
                ...menuItemStyle
            };

            let styles = {
                root: {
                    ...style
                },
                menu: {
                    ...menuStyle
                },
                menuList:{
                    width: '100%',
                    borderRadius: 0,
                },
                menuItem: menuItem,
                selectedItem: {
                    ...menuItem,
                    backgroundColor: this.backgrounds.secondary,
                    color: this.colors.selected,
                },
                titleItem: {
                    ...menuItem,
                    fontSize: 12,
                    borderBottom: `1px solid ${this.colors.border}`,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                },
                buttons: {
                    ...menuItem,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    margin: 15,
                },
                typo: {
                    fontSize: 12,
                    color: this.colors.dark,
                },
                listIcon: { 
                    marginRight: 10,
                },
                dropIcon: {
                    width: 20,
                    height: '100%',
                },
                icon: {
                    color: active ? this.colors.active : iconColor,
                    minWidth: iconSize,
                    minHeight: iconSize,
                    background: background,
                    transition: 'color 0.15s ease-in-out',
                    ...iconStyle
                },
                iconButton: {
                    minWidth: iconSize + 10,
                    minHeight: iconSize + 10,
                    position: 'relative',
                    ...iconButtonStyle
                },
                sideIcon: {
                    padding:'0 5px', 
                    minWidth: iconSize
                }
            }

            return(styles[s]);
        },

        prevent(e){
            if (e && e.preventDefault && e.stopPropagation) {
              e.preventDefault();
              e.stopPropagation();
            }
          },

        handleOpen(e) {
            this.prevent(e);
            this.safeState({anchorEl: e.currentTarget});
        },

        handleClose(e){
            this.prevent(e)
            this.setState({ anchorEl: null })
        },

        renderIconButton() {
            let {icon, iconSize, active, iconColor, dropDown, background} = this.props;
            let color = active ? active : iconColor;

            if (dropDown) {
                return (
                    <Button 
                        padding={0}
                        onClick={this.handleOpen}
                        background={background}
                        width={'fit-content'}
                        height={iconSize+10}>

                        <Row padding={0} height={iconSize+10}>
                            <Center width={'50%'} style={this.styles('sideIcon')}>
                                <Icon style={ this.styles('icon') } icon={icon} size={iconSize} color={ color }/>
                            </Center>
                            <Center width={'50%'}>
                                <Icon
                                    style={this.styles('dropIcon')}
                                    icon={this.icons.dropDown}
                                    size={ 18 }
                                    color={ iconColor }/>
                            </Center>

                        </Row>

                    </Button>
                );
            }

            return (
                <IconButton 
                    icon={icon}
                    iconSize={iconSize}
                    iconColor={color}
                    background={background}
                    onClick={this.handleOpen}
                    style={ this.styles('iconButton') }
                />
            );
        },

        renderMenuItem(item, idx){
            let { multiple, selected } = this.props; 

            let isSelected = item.value === selected;
            let id = typeof item.value === 'boolean' ? idx : item.value

            if (multiple) isSelected = selected.indexOf(item.value) > -1;

            const handleItemClick = (e, item)=>{
                let {onClick, multiple} = this.props;
                this.prevent(e);

                let value = null;

                if (typeof item.value === 'boolean') { value = item.value; } 
                else { value = item && item.value ? item.value : item; }

                if (item.onClick) { item.onClick(value); }
                else if (onClick) { onClick(value); }

                if (!multiple) { this.handleClose(e); }
            };

            const renderText = (item)=>{
                if (!item.hasOwnProperty('text') || isEmpty(item.text)) return null;
                return (
                    <Label label={item.text} style={this.styles('typo')}/>
                );
            };

            const renderItemIcon = (iconProps)=>{
                let { menuIconSize  } = this.props;
                if (!iconProps || !iconProps.icon) return null;

                let style = {  ...this.styles('listIcon'), ...iconProps.style };
                let color = iconProps && iconProps.color ? iconProps.color : this.colors.dark;

                return (
                    <Icon icon={iconProps.icon} size={menuIconSize} color={color} style={ style } />
                )
            };

            let style = (isSelected) ? this.styles('selectedItem') : this.styles('menuItem');

            return (
                <MenuItem key={ idx } id={ id } dense={ true } onClick={ e => { handleItemClick(e, item) } } style={ style } >
                    { renderItemIcon(item.iconProps) }
                    { renderText(item) }
                </MenuItem>
            )
        },

        renderPopper() {
            let {menuItems, menuWidth} = this.props;
            let {anchorEl} = this.state;

            const renderMenuTitle = ()=>{
                let {menuTitle} = this.props;

                if (!menuTitle) return null;

                return (
                    <Row padding={0} height={35} style={this.styles('titleItem')}>
                        <Label label={menuTitle}/>
                    </Row>
                );
            };

            const renderButtons = ()=>{
                let {buttons} = this.props;

                if (!buttons) return null;

                return (
                    <Row padding={0} height={35} style={this.styles('buttons')}>
                        { buttons }
                    </Row>
                )
            };

            return (
                <Popover
                    anchorEl={anchorEl}
                    onClose={this.handleClose}
                    elevation={6}
                    padding={0}
                    theme={'light'}
                    width={menuWidth}
                    style={this.styles('menu')}
                >

                    { renderMenuTitle() }

                    <MenuList dense={ true } style={this.styles('menuList')}>
                        { menuItems.map(this.renderMenuItem) }
                    </MenuList>

                    { renderButtons() }
                </Popover>
            );
        },

        render() {
            return (
                <div style={this.styles('root')} >
                    {this.renderIconButton()}
                    {this.renderPopper()}
                </div>
            );
        }
    }
}};