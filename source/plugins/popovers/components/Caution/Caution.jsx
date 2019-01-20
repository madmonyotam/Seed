import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';

module.exports = {
    name: 'Caution',
    description: '',
    propTypes: {},
    dependencies: [],
    get() {

        var core = this;
        var { React, PropTypes } = core.imports;

        return {

            getInitialState() {
                return {
                    title: 'Caution',
                    text: 'text',
                    func: ()=>{},
                    open: false,
                };
            },

            componentDidMount() {
                core.on('Caution',this.handleClickOpen);
            },

            componentWillUnmount() {
                core.off('Caution',this.handleClickOpen);
            },

            handleClickOpen({text,title, func}) {
                if(text) this.setState({text});
                if(title) this.setState({title});
                if(func) this.setState({func});


                this.setState({ open: true });

            },

            handleClose() {
                this.state.func(false);
                this.setState({ open: false });
            },

            handleYes() {
                this.state.func(true);
                this.setState({ open: false });
            },

            render() {

                let { text, title } = this.state;
            

                return (
                    <Dialog
                        open={this.state.open || false}
                        style={{ borderRadius: 2 }}
                        PaperProps={{ square: true, style: { borderRadius: 2, minHeight: 168 } }}
                        onClose={()=>{this.handleClose()}}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">

                        <DialogTitle  
                            disableTypography={ true }
                            style={{ padding: '13px 15px' }} id="alert-dialog-title">
                            <Typography style={{ fontSize: 13, textTransform: 'uppercase', margin: 0, fontWeight: 600 }} >
                            { title }
                            </Typography>
                        </DialogTitle>
                        <DialogContent style={{ ...styles.root, color: core.theme('colors.subheader') }}>
                                <Typography style={{ fontSize: 13, textTransform: 'capitalize', }}>
                                    { text }
                                </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={ this.handleClose } style={{ ...styles.button, color: core.theme('colors.dark') } } autoFocus>
                                { core.translate('cancel') }
                            </Button>
                            <Button onClick={ this.handleYes } color="primary" style={ styles.button } variant="contained" size="small">
                                { core.translate('confirm') }
                            </Button>
                        </DialogActions>
                    </Dialog>
                );
            }
        };
    }
};

const styles = {
    button: {
        minHeight:30,
        height: 30,
        minWidth: 72,
        maxWidth: 72,
        fontSize: 12,
    },
    root: {
        minWidth: 300,
        maxWidth: 500,
        minHeight: 20,
        padding: "0 15px 21px",
        fontSize: 13,
        borderRadius: 2,
    },
};