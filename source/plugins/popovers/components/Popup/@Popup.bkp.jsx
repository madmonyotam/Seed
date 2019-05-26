import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { CircularProgress } from '@material-ui/core';

module.exports = {
    name: 'Popup_bkp',
    description: '',
    propTypes: {},
    dependencies: ['Simple.TitleBar', 'popovers.PopupHandler'],

    get(TitleBar, popupHandler) {

        var core = this;
        var { React, PropTypes, Branch, ComponentMixin } = core.imports;

        const units = {
            colors: {
                okTextDisabled: core.theme('colors.dark'),
                okText: core.theme('colors.white'),
                cancel: core.theme('texts.default')
            },
            backgrounds: {
                buttonDisabled: core.theme('colors.disabled'),
                button: core.theme('backgrounds.default'),

            }
        }

        return {

            mixins: [ComponentMixin,Branch],

            cursors: {
                popup: ['plugins', 'popovers', 'popup'],
            },

            getInitialState() {
                return {
                    open: false,
                    title: core.translate('noTitle', 'No Title'),
                    body: (
                        <div>{core.translate('noContent', 'No Content')}</div>
                    ),
                    bodyStyle: {},
                    btnTitle: core.translate('ok','Ok'),
                    btnFunc: ()=>{console.log('No action')},
                    showButtons: true,
                    isLoading: false,
                    buttons: []
                };
            },

            componentDidMount() {
                core.on('Popup',this.handleClickOpen);
                core.on('Popup.close',this.handleClose);
            },

            componentWillUnmount() {
                core.off('Popup',this.handleClickOpen);
                core.off('Popup.close',this.handleClose);
            },

            handleClickOpen(popupData) {
                if(!popupData) {
                    this.setState({ open: true });
                    return
                }

                let {title, body, bodyStyle, btnTitle, btnFunc, showButtons, buttons, modalStyle } = popupData;

                this.setState({ title, body, bodyStyle, btnTitle, btnFunc, showButtons, buttons , modalStyle });
                this.setState({ open: true });
            },

            handleClose() {
                popupHandler.clearData();
                this.setState({ open: false, isLoading: false });
            },

            okFunc(data){
                let { btnFunc } = this.state;

                this.setState({isLoading: true})
                btnFunc(data);
            },

            styles(s, isDisabled) {
                let {bodyStyle, btnTitle} = this.state;
                let { colors, backgrounds } = units;
                
                let styles = {
                    root: {
                        minWidth: 500,
                        minHeight: 250,
                        position: 'relative',
                        ...bodyStyle
                    },

                    okButton: {
                        background: isDisabled ? backgrounds.buttonDisabled : backgrounds.button,
                        minHeight: 30,
                        maxHeight: 30,
                        width: 72,
                        color: isDisabled ? colors.okTextDisabled : colors.okText,
                        pedding: 0,
                        fontSize: 12,
                        borderRadius: 2

                    },

                    cancelButton: {
                        background: backgrounds.button,
                        minHeight: 30,
                        maxHeight: 30,
                        width: 72,
                        color: colors.cancel,
                        pedding: 0,
                        fontSize: 12,
                        borderRadius: 2
                    },

                    buttonsCont: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row-reverse',
                        alignItems: 'center',
                        margin: 20,
                    },
                    
                    popHeader: {
                        padding: '0 15px',
                    }

                }
                return(styles[s]);
            },

            renderButtons(){
                let { btnTitle, isLoading, buttons, popup } = this.state;
                return (
                    <div style={this.styles('buttonsCont')} >
                        <div style={{ display: 'flex', alignItems: 'center' }}>

                        { (buttons) ? buttons : null }
                        {
                            (!btnTitle) ? null :
                            <Button onClick={ ()=>{ this.okFunc(popup.data) } } style={this.styles('okButton', popup.disable)} disabled={popup.disable} autoFocus>
                                { (isLoading) ? <CircularProgress  size={20}/> : btnTitle }
                            </Button>
                        }
                        </div>
                        <Button onClick={ this.handleClose } style={this.styles('cancelButton')} color="secondary">
                            { core.translate('Cancel') }
                        </Button>
                    </div>
                );
            },

            render() {
                let {title, body, modalStyle} = this.state;

                const closeButton = ()=>{
                    return [
                        <Icon 
                            style={{ color: core.theme('colors.white'), cursor: 'pointer' }} 
                            onClick={this.handleClose} title={core.translate('close')}>
                            { core.icons('navigate.close') }
                        </Icon>
                    ];
                };

                const dialogtitle = ()=>{
                    return (
                        <Typography 
                            style={
                                { fontWeight: 500, 
                                    fontSize: 13, 
                                    color: core.theme('colors.white'), 
                                    textTransform: 'uppercase', 
                                    margin: 0, 
                                    fontWeight: 600 
                                }
                            }
                        >
                            { title }
                        </Typography>
                    );
                };

                return (
                    <Dialog
                        open={this.state.open || false}
                        onClose={this.handleClose}
                        maxWidth={false}
                        PaperProps={{ square: true, style: { borderRadius: 2, height: 360, overflowY: 'visible', ...modalStyle } }}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">

                        <TitleBar
                            style={ this.styles('popHeader') }
                            title={ dialogtitle() }
                            buttons={ closeButton() }
                            bgColor={ core.theme("backgrounds.nav") }
                            fgColor={ core.theme('colors.white') }
                            height={ 40 }
                        />
                        <div style={ this.styles('root') }>
                            { body }
                        </div>

                            { this.renderButtons() }

                    </Dialog>
                );

            }
        };
    }
};
