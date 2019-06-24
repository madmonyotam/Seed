var NotificationSystem = require('react-notification-system');
import { Icon } from '@material-ui/core';

module.exports = {
    dependencies: [],    
    get() {
        
        const seed = this;

        const { React, PropTypes } = seed.imports;

        return {
            propsTypes: {
                position: PropTypes.oneOf([
                    'topLeft',
                    'topCenter',
                    'topRight',
                    'bottomRight',
                    'bottomCenter',
                    'bottomLeft',
                ]),
                autoDismiss: PropTypes.number,
                distance: PropTypes.number,
            },

            getDefaultProps(){
                return {
                    position: 'bottomLeft',
                    autoDismiss: 4,
                    distance: 10,
                };
            },

            getInitialState() {

                return {
                    error: null,
                    distance: 10,
                };
            },

            componentDidMount() {
                seed.on('notify',this.addNotification)
            },

            componentWillUnmount() {
                seed.off('notify')
            },

            componentDidCatch(err){
                this.setState({ error: err && err.toString() })
            },

            styles(s,alertKind){

                const styles = {
                    icon: {
                        fontSize: 17,
                        color: this.getColor(alertKind),
                        marginRight: 10
                    },

                    textCont: {
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        borderRadius: 4
                    },

                    text: {
                        width: 220,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        fontWeight:'400',
                        fontSize: 16, 
                        fontFamily: 'Roboto, sans-serif',
                    }

                }
                
                return(styles[s]);
            },

            getPosition(position) {
                switch (position) {
                    case 'topLeft'     : return 'tl';
                    case 'topCenter'   : return 'tc';
                    case 'topRight'    : return 'tr';
                    case 'bottomRight' : return 'br';
                    case 'bottomCenter': return 'bc';
                    case 'bottomLeft'  : default : return 'bl';
                }
            },

            getColor(alertKind){
                switch (alertKind) {  
                    case 'error':
                        return('rgb(207, 60, 62)');
                    case 'success':
                        return('rgb(86, 182, 49)');
                    case 'warning':
                        return('rgb(243,156,18)');
                    case 'info':
                        return('rgb(0, 133, 194)');
                }
            },

            getIcon(alertKind){
                switch (alertKind) {  
                    case 'error':
                        return(seed.icons('notify.error'));
                    case 'success':
                        return(seed.icons('notify.success'));
                    case 'warning':
                        return(seed.icons('notify.warning'));
                    case 'info':
                        return(seed.icons('notify.info'));
                }
            },

            getText(text){
                if(text.length > 38) return(text.substring(0,35)+'...');
                return text;
            },

            renderMessage(alertKind,text){
                let icon = this.getIcon(alertKind);

                return(
                    <div title={text} style={this.styles('textCont')}> 
                         <Icon style={this.styles('icon',alertKind)}>{ icon }</Icon>
                         <div style={this.styles('text')}>{text}</div>
                    </div>
                )
            },

            addNotification({text, alertKind, position, autoDismiss}){
                let pos = position || this.props.position;
                let aut = autoDismiss || this.props.autoDismiss;

                this.refs.notificationSystem.addNotification({
                  position: this.getPosition(pos),
                  message: this.renderMessage(alertKind, text),
                  level: alertKind,
                  autoDismiss: aut
                });
            },

            getNotificationsStyle(){
                let {distance} = this.props;
                return {
                    Containers: {
                      tr: { top:    `${distance}px`, right: `${distance}px` },
                      tc: { top:    `${distance}px`                         },
                      tl: { top:    `${distance}px`, left:  `${distance}px` },
                      br: { bottom: `${distance}px`, right: `${distance}px` },
                      bc: { bottom: `${distance}px`                         },
                      bl: { bottom: `${distance}px`, left:  `${distance}px` },
                    },
                    Title: {
                      DefaultStyle: { // Applied to every notification, regardless of the notification level
                        color:'#fff',
                        margin: '0 0 15px 0',
                        fontWeight:'400',
                        fontSize: 18, 
                        fontFamily: 'Roboto, sans-serif',
                        letterSpacing: '0.5px'
                      }
                    },
                    MessageWrapper: {
                      DefaultStyle: {
                        display: 'flex',
                        alignItems: 'center' ,
                        overflowY: 'auto',
                        height: '100%',
                        maxHeight: 275,
                      }
                    },
                    NotificationItem: { // Override the notification item
                        // success: {
                        //     backgroundColor: 'rgb(86, 182, 49)',
                        // },
                    
                        // error: {
                        //     backgroundColor: 'rgb(207, 60, 62)',
                        // },
                    
                        // warning: {
                        //     backgroundColor: 'rgb(243,156,18)',
                        //     // backgroundColor: 'rgb(42, 54, 64)',
                        // },
                    
                        // info: {
                        //     backgroundColor: 'rgb(0, 133, 194)',
                        // },
                
                        DefaultStyle: { // Applied to every notification, regardless of the notification level
                            color:'#fff',
                            width: 300,
                            border:0,
                            fontWeight:'400',
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: 14,
                            height: 60,
                            overflowWrap: 'break-word',
                            wordWrap: 'break-word',
                            overflow: 'hidden' ,
                            backgroundColor: '#313131',
                            boxShadow: '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
                            display: 'flex',
                            alignItems: 'baseline',
                            justifyContent: 'space-between'
                        }
                    },
                    Dismiss: {
                      DefaultStyle: {
                        backgroundColor: 'none',
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight:300,
                        fontSize: 32,
                        position: 'inherit',
                        margin: 8,
                        top: 0,
                        right: 0
                      }
                    }
                  };
            },   

            render() {
                return (
                    <NotificationSystem ref="notificationSystem" style={this.getNotificationsStyle()} />
                )

            }
        }
    }
}