import { Card, CardActions, CardContent, CardMedia, Button, Typography, TextField, FormControl, FormHelperText, CircularProgress,
       } from '@material-ui/core';

module.exports = {
    name: "Login",
    description: '',
    bindings: {
        selectedItem: ['selectedItem'],
        selectedFrom: ['selectedFrom'],
    },

    dependencies: [],

    get(ForgotPassword) {

        var core = this;

        var { React } = core.imports;

        return {

            getInitialState() {
                return {
                    email: '',
                    password: '',
                    error: false,
                    isWaiting: false,
                };
            },

            componentDidMount() {

            },

            clearFields() {
                document.getElementById('login_password').value = '';
                document.getElementById('login_password').focus();

                this.setState({error: true})
            },

            logIn() {
                let {email, password } = this.state;

                this.setState({isWaiting: true});
                //
                // core.plugins.SimpleSwitch.run('logIn',{email: email, password: password})
                // .then( (result) => {
                //
                //     core.plugins.SimpleSwitch.set(['currentUser'], result.user);
                    setTimeout(()=>{
                      core.plugins.SimpleSwitch.set(['isLoggedIn'], true);
                      this.setState({isWaiting: false});
                      if (this.props.onLoggedIn) this.props.onLoggedIn()

                    }, 1500)
                //
                // }).catch( (err) => {
                //
                //     this.clearFields();
                //     core.plugins.SimpleSwitch.set(['isLoggedIn'], false);
                //     this.setState({isWaiting: false});
                //
                // } )
            },

            handleChange(stateValue) {
                return (event) => {
                    this.setState({ [stateValue]: event.target.value, error: false });
                }
            },

            emailField() {
                let label = core.translate('email', 'Email');

                const pressEnter = (e) => {
                    if (e.charCode === 13 || e.key === 'Enter' ) {
                        this.logIn()
                    }
                };

                return (
                    <FormControl style={ styles.formControl} >
                        <FormHelperText id={'login_email'}>{ label }</FormHelperText>
                        <TextField
                            required
                            autoComplete={ 'off' }
                            id={ 'login_email' }
                            value={ this.state.email }
                            style={ styles.textField }
                            onChange={ this.handleChange('email') }
                            margin="normal"
                            type={ 'text' }
                            autoFocus={ true }
                            onKeyPress={ pressEnter }
                        />
                    </FormControl>
                );
            },

            passwordField() {
                let label = core.translate('password', 'Password');

                const pressEnter = (e) => {
                    if (e.charCode === 13 || e.key === 'Enter' ) {
                        this.logIn()
                    }
                };

                return (
                    <FormControl style={ styles.formControl} >
                        <FormHelperText id={'login_password'}>{ label }</FormHelperText>
                        <TextField
                            required
                            autoComplete={ 'off' }
                            id={ 'login_password' }
                            value={ this.state.password }
                            style={ styles.textField }
                            onChange={ this.handleChange('password') }
                            margin="normal"
                            type={ 'password' }
                            onKeyPress={ pressEnter }
                        />
                    </FormControl>
                );
            },

            errorWarning() {
                let {error} = this.state;

                let errorMsg = core.translate('usernameOrPasswordAreIncorrect', 'Username or Password are incorrect')

                if (error) return (
                    <Typography
                        variant={ "body1" }
                        component={ "div" }
                        color={ 'error' }
                        noWrap={ true }
                        style={ styles.errorMsg }
                    >
                        { errorMsg }
                    </Typography>
                );

                return null;
            },

            forgotPwd() {
                core.plugins.popovers.openPopup({
                    title: core.translate('forgotPassword', 'Forgot Password'),
                    body: <ForgotPassword/>,
                    bodyStyle: { minWidth: 530, minHeight: 'unset', padding: '0px 22px' },
                    okButton: {
                        btnTitle: core.translate('send', 'Send'),
                        btnFunc: (data)=>{
                            core.emit('ForgotPassword.action.play', data );
                        }
                    }
                });
            },

            renderLoginButton() {
                let {isWaiting} = this.state;

                if(isWaiting){
                    return(
                        <CircularProgress
                            size={ 20 }
                            thickness={ 4 }
                            color={ 'primary' }
                        />
                    )
                }

                return ( core.translate('Sign in') )
            },

            clear() {
                this.setState({email: '', password: ''});
            },

            renderLogo() {
                return(
                    <CardMedia
                        style={ {...styles.media, backgroundColor: core.theme('backgrounds.primary')} }
                        title="Simple Switch"
                        src="/resources/images/simpleSwitchLogo.png"
                    >
                        <Typography variant="body1" component="span" style={ {...styles.mediaHeader, color: core.theme('colors.white')} }>
                            { core.translate('SimpleSwitch', 'Simple Switch') }
                        </Typography>
                    </CardMedia>
                );
            },

            renderButtons() {
                let { email, password, error, isWaiting } = this.state;
                let disabled = isWaiting || email.length < 1 || password.length < 1;

                const pressEnter = (e) => {
                    if (e.charCode === 13 || e.key === 'Enter' ) {
                        this.logIn()
                    }
                };

                return(
                    <CardActions style={ styles.buttonsLine }>
                        <Button
                            size="small"
                            variant="flat"
                            color="primary"
                            style={ {...styles.button, color: core.theme('colors.secondary') } }
                            onClick={ this.clear }
                            onKeyPress={ pressEnter }
                        >
                            { core.translate('Clear') }
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            // color="primary"
                            style={ {...styles.button, color: core.theme('colors.white'),  backgroundColor: core.theme('colors.secondary')} }
                            onClick={ this.logIn }
                            onKeyPress={ pressEnter }
                            disabled={ disabled }
                        >
                            { this.renderLoginButton() }
                        </Button>
                    </CardActions>
                );
            },

            renderForgotPwd() {
                return(
                    <CardActions style={ styles.forgetPwdLine }>
                        <Button size="small" variant="flat" color="primary" onClick={ this.forgotPwd } style={ styles.ForgotPasswordButton } >
                            <span style={ {...styles.forgetPwdText, color: core.theme('colors.secondary') } } >
                                { core.translate('forgotYourPassword', 'Forgot your password?') }
                            </span>
                        </Button>
                    </CardActions>
                );
            },

            renderContent() {
                return(
                    <CardContent style={ styles.content }>
                        { this.emailField() }
                        { this.passwordField() }
                        { this.errorWarning() }
                    </CardContent>
                );
            },

            loginCard() {
                return(
                    <form>
                        <Card style={ styles.card }>
                            { this.renderLogo()      }
                            { this.renderContent()   }
                            { this.renderButtons()   }
                            { this.renderForgotPwd() }
                        </Card>
                    </form>
                );
            },

            render() {

                return (
                    <div className={'loginBackground'} style={ styles.root }>
                        { this.loginCard() }
                    </div>
                )
            }
        }
    }
}

const styles = {
    root: {
        height: '100%',
        width: '100%',
        overflow: "hidden",
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'column',
    },
    card: {
        width: 290,
    },
    content: {
        padding: '22px 22px 0px 22px',
    },
    formControl: {
        width: '100%',
    },
    media: {
        height: 80,
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    mediaHeader: {
        fontSize: 14,
        fontFamily: "Roboto, sans-serif !important",
        fontStyle: "italic",
        marginTop: 5,
    },
    buttonsLine: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      margin: '6px',
    },
    button: {
        width: 85,
        height: 36,
    },
    forgetPwdLine: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      margin: '0px 6px 22px',
    },
    ForgotPasswordButton: {
        // padding: '7px 0px',
    },
    forgetPwdText: {
        fontSize: 10,
    },
    textField: {
        flex: 1,
        width: '100%',
        marginTop: 5,
        marginBottom: 15,
    },
    errorMsg: {
        color: 'red',
        display: 'flex',
        alignItems: 'center',
        height: 36,
    },
};
