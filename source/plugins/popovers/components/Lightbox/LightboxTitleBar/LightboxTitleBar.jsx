import { AppBar, Toolbar, Icon, IconButton } from '@material-ui/core/';

module.exports = {
    name: "LightboxTitleBar",
    description: '',
    dependencies: ['componentsCollection.TitleBar'],

    get(TitleBar) {
        var core = this;
        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                hasInfo:      PropTypes.bool,
                title:        PropTypes.string,
                buttons:      PropTypes.array,
                style: PropTypes.object,
            },

            getDefaultProps(){
                return {
                    hasInfo: false,
                    title: core.translate('Lightbox Default Title'),
                    buttons: [],
                    titleRootStyle: {},
                    toolbarStyle: {},
                };
            },

            
            componentWillMount() {
                this.initialUnits();
            },

            initialUnits() {

                this.colors = {
                    white: core.theme('colors.white'),
                };

                this.backgrounds = {
                    primary: core.theme('backgrounds.primary'),
                };

                this.units = {
                    iconSize: 24,
                    buttonSize: 30,
                    appBarHeight: core.dim("appBar.height"),
                    appBarZindex: core.dim("appBar.zIndex"),
                };
            },

            
            styles(s) {
                let {style} = this.props;

                let styles = {
                    root: {
                        ...style,
                    },
                    buttonStyle: {
                        height: this.units.buttonSize,
                        width: this.units.buttonSize,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: this.colors.white,
                    },
                    iconStyle: { 
                        color: this.colors.white,
                        cursor: 'pointer',
                        fontSize: this.units.iconSize,
                    },
                }
                return(styles[s]);
            },

            buttonToggleInfo() {
                let {hasInfo} = this.props;
                let title = core.translate('Info Panel');

                if (!hasInfo) return [];

                return [
                    <IconButton style={ this.styles('buttonStyle')} onClick={ ()=>{core.emit('LightboxInfo.toggle')} }>
                        <Icon key={ 'infoPanel' } title={ title } style={ this.styles('iconStyle')}>{ core.icons('notify.info') }</Icon>
                    </IconButton>
                ];
            },

            closeButton() {
                let title = core.translate('Close Lightbox');

                return [
                    <IconButton style={ this.styles('buttonStyle')} onClick={ ()=>{core.emit('Lightbox.close')} }>
                        <Icon key={ 'close' } title={ title } style={ this.styles('iconStyle')}>{ core.icons('navigate.close') }</Icon>
                    </IconButton>
                ];
            },

            actionButtons() {
                let { buttons } = this.props;

                return [
                    ...buttons,
                    ...this.buttonToggleInfo()
                ];
            },

            render() {
                let {title} = this.props;
                
                return (
                    <TitleBar 
                        style={ this.styles('root') }
                        title={ title }
                        leftButton={ this.closeButton() }
                        buttons={ this.actionButtons() }
                        bgColor={ this.backgrounds.primary }
                        height={ this.units.appBarHeight }
                        zIndex={ this.units.appBarZindex }
                    />
                )
            }
        }
    }
};