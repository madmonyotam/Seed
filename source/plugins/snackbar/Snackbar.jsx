var React = require('react');
import Snackbar from '@material-ui/core/Snackbar';
require('./snackbar.css');

module.exports = {
    name: 'Snackbar',
    dependencies: [],
    get(){

        return {
            
            closeSnackbar(){
                core.plugins.snackbar.close()
            },

            renderMessage() {
                var snackbar = core.plugins.snackbar; 
                let { icon, message } = snackbar;
                switch(icon) {
                    case 'info':
                        icon = <i 
                                className={ 'fas fa-info' }
                                style={{ color: '#44b', fonSize: 18, marginRight: 6 }}
                            />
                        break;
                    case 'warning':
                        icon = <i 
                                className={ 'fas fa-exclamation-triangle' }
                                style={{ color: '#b44', fonSize: 18, marginRight: 6 }}
                            />
                        break;
                    case 'success':
                        icon = <i 
                                className={ 'fas fa-check' }
                                style={{ color: '#4b4', fonSize: 18, marginRight: 6 }}
                            />
                        break;
                    default:
                        return message;
                }
                return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <div style={{'verticalAlign': 'middle', fontSize: 13, lineHeight: '18px', flex: 1 }}>
                                {message}
                            </div>
                            <div>
                                {icon}
                            </div>
                        </div>;
            },

            render() {
                var snackbar = core.plugins.snackbar;
                return snackbar.bind('isOpen', isOpen => {

                    let { icon, message } = snackbar;
                    switch(icon) {
                        case 'info':
                            icon = <i 
                                    className={ 'fas fa-info' }
                                    style={{ color: 'rgb(87, 176, 236)', fontSize: '16px', width: 20, textAlign: 'center' }}
                                />
                            break;
                        case 'warning':
                            icon = <i 
                                    className={ 'fas fa-exclamation-triangle' }
                                    style={{ color: 'rgb(241, 200, 92)', fontSize: '18px', width: 20, textAlign: 'center' }}
                                />
                            break;
                        case 'success':
                            icon = <i 
                                    className={ 'fas fa-check' }
                                    style={{ color: 'rgb(92, 185, 92)', fontSize: '18px', width: 20, textAlign: 'center' }}
                                />
                            break;
                    }

                    return (
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            open={isOpen}
                            autoHideDuration={3000}
                            onClose={this.closeSnackbar}
                            message={ message }
                            action={ icon }
                            { ...snackbar.props }
                            className={ 'snackbar' + ((snackbar.props && snackbar.props.className) ? (' ' + snackbar.props.className) : '') }
                        />
                    )
                })
            }
        }
    }
}