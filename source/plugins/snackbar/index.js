var React = require('react');

module.exports = {
    name: 'snackbar',
    tree: {
        isOpen: false
    },
    components: [
        require('./Snackbar.jsx')
    ],
    extend: {
        snack(message, type){
            this.plugins.snackbar.open.apply(this.plugins.snackbar, arguments);
        }
    },
    init(def, done) {

        var core = this;

        function setProps(props){
            var snackbar = core.plugins.snackbar;

            snackbar.icon = props.icon;
            snackbar.props = props.props;
            
            if(typeof props.message === "string") {
                snackbar.message = props.message;
            } else if(typeof props.message === "object" && props.message.message) {
                snackbar.message = props.message.message;
            } else {
                console.warn(`The "snackbar" was opened without a message`);
                snackbar.message = core.translate("snackbar.errorOccurred", "An error has occurred");
                snackbar.icon = 'warning';
            }
        }

        done({
            messages: [],
            open(message, icon, props) {
                var snackbar = core.plugins.snackbar;
                snackbar.set('isOpen', false);
                setTimeout(() => {
                    var snackbarProps = {
                        message,
                        icon,
                        props
                    }
                    
                    if(snackbar.get('isOpen')){
                        snackbar.messages.push(snackbarProps);
                    }
                    else{
                        setProps(snackbarProps);
                        snackbar.set('isOpen', true);
                    }
                }, 150)
            },
            close() {
                var snackbar = core.plugins.snackbar;
                snackbar.message = null;
                snackbar.icon = null;
                snackbar.set('isOpen', false);
                if(snackbar.messages.length){
                    setTimeout(() => {
                        setProps(snackbar.messages.shift());
                        snackbar.set('isOpen', true);
                    }, 0);
                }
            }
        });
    }
};