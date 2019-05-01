
import {
    Icon, IconButton
  } from '@material-ui/core/';


module.exports = {
    name: "TitleBar",
    description: '',
    propTypes: {},
    dependencies: ['Simple.Badge'],

    get(Badge) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                title:         PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
                titlePosition: PropTypes.oneOf([ 'left', 'middle' ]),
                style:         PropTypes.object,
                logo:          PropTypes.object,
                icon:          PropTypes.shape( 
                                {   title:  PropTypes.string, 
                                    value:  PropTypes.string, 
                                    action: PropTypes.func, 
                                    size:   PropTypes.number
                                }),
                badge:         PropTypes.shape(
                                {   counter: PropTypes.number,
                                    style:   PropTypes.object
                                }),
                leftButton:    PropTypes.array,
                buttons:       PropTypes.array,
                bgColor:       PropTypes.string,
                fgColor:       PropTypes.string,
                padding:       PropTypes.number,
                middle:        PropTypes.object,
                height:        PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
                width:         PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
                shaddow:       PropTypes.bool,
                zIndex:        PropTypes.number,
            },

            getDefaultProps(){
                return {
                    title: core.translate('Default Title'),
                    titlePosition: 'left',
                    style: {},
                    logo: undefined,
                    icon: undefined,
                    badge: undefined,
                    leftButton: [],
                    buttons: [],
                    bgColor: core.theme('backgrounds.primary'),
                    fgColor: core.theme('colors.white'),
                    padding: 5,
                    middle: undefined,
                    height: 15,
                    width: '100%',
                    shaddow: true,
                    zIndex: 10
                };
            },

            getInitialState() {
                return {};
            },

            componentWillMount() {
                this.initialUnits();
            },
            componentWillReceiveProps(nextProps){
                this.initialUnits();

            },

            componentWillReceiveProps(nextProps) {
                if (nextProps.height !== this.units.propsHeight) this.units.propsHeight = nextProps.height
                if (nextProps.width !== this.units.propsWidth) this.units.propsWidth = nextProps.width
                if (nextProps.padding !== this.units.propsPadding) this.units.propsPadding = nextProps.padding
            },

            initialUnits() {
                let { icon } = this.props;

                this.colors = {
                    white: core.theme('colors.white'),
                    b12: '#0000001F',
                    b14: "#00000024",
                    b20: "#00000033",
                };
                
                const iconSize = icon && icon.size ? icon.size : core.dim("nav.iconSize");

                this.units = {
                    navWidth: core.dim("nav.width"),
                    icon: {
                        height: iconSize * 1.5,
                        width: iconSize * 1.5,
                        fontSize: iconSize,
                    },
                };
            },

            styles(s) {
                let {shaddow, style} = this.props;
                let {bgColor, fgColor, padding, height, width, zIndex} = this.props;

                let styles = {
                    root: {
                        backgroundColor: bgColor, 
                        color: fgColor,
                        padding: padding,
                        minHeight: height,
                        maxHeight: height,
                        width: width,
                        display: 'flex',
                        justifyContent: 'space-between',
                        zIndex: zIndex,
                        position: 'relative',
                        boxShadow: (shaddow) ? `0px 2px 4px -1px ${this.colors.b12}, \
                                                0px 4px 5px  0px ${this.colors.b14}, \
                                                0px 1px 10px 0px ${this.colors.b20}` : 'unset',
                        ...style
                    },
                    left: {
                        flex: 0.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        position: 'relative',
                        color: 'inherit',
                    },
                    middle: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: 'relative',
                        color: 'inherit',
                    },
                    right: {
                        flex: 0.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        position: 'relative',
                        color: 'inherit',
                    },
                    buttonsList: {
                        display: 'flex',
                    },
                    button: {
                        padding: "0px 5px",
                    },
                    logoWrap: {
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        padding: "0px 5px",
                        marginTop: "auto",
                        marginBottom: "auto",
                    },
                    iconWrap: {
                        height: "100%",
                        width: this.units.navWidth - 5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        margin: "auto 0px",
                    },
                    buttonStyle: {
                        height: this.units.icon.height,
                        width: this.units.icon.width,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: this.colors.white,
                    },
                    iconStyle: { 
                        color: this.colors.white,
                        cursor: 'pointer',
                        fontSize: this.units.icon.fontSize,
                    },
                }
                
                return(styles[s]);
            },

            renderLogo() {
                let {logo} = this.props;

                if (!logo) return null;

                return (
                    <div id={'TitleBar.logoWrap'} style={this.styles('logoWrap')} >
                        {logo}
                    </div>
                );
            },

            renderIcon() {
                let {logo, icon} = this.props;

                if (!icon || logo) return null;

                let {title, value, action } = icon;

                if (!action) action = ()=>{console.log( 'Default icon action');}

                return (
                    <div id={'TitleBar.iconWrap'} style={this.styles('iconWrap')} >
                        <IconButton style={ this.styles('buttonStyle')} onClick={ action }>
                            <Icon key={ 'infoPanel' } title={ title } style={ this.styles('iconStyle')} >
                                { core.icons( value ) }
                            </Icon>
                        </IconButton>
                    </div>
                );
            },

            renderButton(button, key) {
                let stl = (key > 0) ? this.styles('button') : {};
                return (
                    <div id={`TitleBar.button_${key}`} key={key} style={ stl }>
                        {button}
                    </div>
                );
            },

            renderButtons(buttonsList) {
                if (!buttonsList || _.isEmpty(buttonsList)) return null;
                return (
                    <div id={'TitleBar.buttonList'} style={ this.styles('buttonsList') } >
                        { buttonsList.map( this.renderButton ) }
                    </div>
                );
            },

            renderBadge() {
                let { badge } = this.props;

                if (!badge || _.isEmpty(badge)) return null;

                let { counter, style } = badge;

                return (
                    <div id={'TitleBar.badgeWrap'} style={ this.styles('badge') } >
                        <Badge size={ 1 } count={ counter } style={ style }/>
                    </div>
                );
            },

            renderLeft() {
                let {leftButton, title, titlePosition, badge} = this.props;

                let leftTitle = (titlePosition.includes('left')) ? title : '';

                return (
                    <div id={'TitleBar.left'} style={ this.styles('left') } >
                        { this.renderButtons(leftButton) }
                        { this.renderLogo() }
                        { this.renderIcon() }
                        { leftTitle }
                        { this.renderBadge() }
                    </div>
                );
            },

            renderMiddle() {
                let {middle, title, titlePosition} = this.props;
                if (_.isEmpty(middle) && titlePosition !== 'middle') return null;
                
                let midTitle = (titlePosition.includes('middle')) ? title : '';
                
                return (
                    <div id={'TitleBar.middle'} style={ this.styles('middle') } >
                        { midTitle }
                        { middle }
                    </div>
                );
            },

            renderRight() {
                let {buttons} = this.props;
                
                return (
                    <div id={'TitleBar.right'} style={ this.styles('right') } >
                        { this.renderButtons(buttons) }
                    </div>
                );
            },
            
            render() {
                return (
                    <div id={'TitleBar.root'} style={ this.styles('root') } >
                        { this.renderLeft() }
                        { this.renderMiddle() }
                        { this.renderRight() }
                    </div>
                )
            }

        }
    }
}