
import { 
    Icon,
    IconButton,
    Paper,
    Popper,
    ClickAwayListener,
  } from '@material-ui/core/';


module.exports = {
    name: "IconPopover",
    description: '',
    dependencies: [],    
    

    get() {
        
        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                icon: PropTypes.string,
                title: PropTypes.string,
                iconStyle: PropTypes.object,
                popoverStyle: PropTypes.object,
                iconColor: PropTypes.string,
            },

            getDefaultProps(){
                return {
                    icon: core.icons('home'),
                    iconColor: core.theme('colors.actionIcons'), 
                    title: '',
                    iconStyle: {},
                    popoverStyle: {},
                };
            },
            
            getInitialState() {
                return {
                    isOpen: false,
                    anchorEl: null
                };
            },

            componentDidMount () {
                core.on('closePopover', this.handleCloseMenu);
            },

            componentWillUnmount () {
                core.off('closePopover', this.handleCloseMenu);
            },

            handleOpenMenu(e){
                this.setState({ 
                    isOpen: true ,
                    anchorEl: e.currentTarget,
                })
            },

            handleCloseMenu(){
                this.setState({ 
                    isOpen: false,
                    anchorEl: null,
                })
            },

            handleSwitchMenu(e) {
                if (this.state.isOpen) this.handleCloseMenu();
                else this.handleOpenMenu(e);
            },

            onClickAway(){
                setTimeout(() => {
                    if(this.state.isOpen){
                        this.handleCloseMenu();
                    }
                }, 100);
            },

            render() {
                let { anchorEl } = this.state;
                let { children, icon, title, iconStyle, popoverStyle, iconColor } = this.props;
                let open = Boolean(anchorEl);
                const id = open ? 'icon-Poper' : null;

                return (
                    <div style={ styles(core).popover }>
                        <IconButton
                            aria-owns={ anchorEl ? 'icon-fade-menu' : null}
                            aria-haspopup={ true }
                            style={ styles(core).button }
                            onClick={ this.handleSwitchMenu }
                        >
                            <Icon title={ title } style={ {...styles(core).buttonsIcon, color: iconColor, ...iconStyle } }>
                                { icon }
                            </Icon>
                        </IconButton>
                        
                        <Popper id={id} 
                                open={open} 
                                anchorEl={anchorEl} 
                                placement={ 'bottom-end' }
                                style={ { ...styles(core).container, ...popoverStyle } }
                                modifiers={{ flip: { enabled: true } }}
                        >
                            <ClickAwayListener onClickAway={this.onClickAway}>
                                <Paper>
                                { children }
                                </Paper>
                            </ClickAwayListener>
                        </Popper>
                    </div>
                )
            }
        }
    }
}

let styles = (core) => {
    return {
        popover: {
            position: 'relative',
        },
        container: {
            minWidth: 200, 
            background: core.theme('colors.white'),
            zIndex: 1001, // to be above the map widget
        },
        button: {
            height: 30,
            width: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        buttonsIcon: {
            fontSize: 18,
        },
    };
}

