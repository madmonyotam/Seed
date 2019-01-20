import Icon from '@material-ui/core/Icon';

module.exports = {
    name: "rules",
    dependencies: [],

    get() {

        var { React } = core.imports;

        return {

            verifyEmail(email) {
                let pattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
                if(email === undefined || email === '') return false;
                return Boolean(email && email.match( pattern ));
            },

            verifyURL(url) {
                let pattern = /^(http|https):\/\/[^ "]+$/;
                if(url === undefined || url === '') return false;
                return Boolean(url && url.match( pattern ));
            },

            verifyPhone(phone) {  // between 9 to 10 digits
                let pattern = /^[0-9]{9,10}$/;
                if (phone === undefined || phone === '') return false;
                return Boolean(phone && phone.match( pattern ));
            },

            minLength(value, min) { // min number of chars
                min = parseInt(min);
                return Boolean(value && value.length && (value.length >= min));
            },

            notEmpty(value) {
                return Boolean(value && value.length > 0);
            },

            notZero(value) {
                return Boolean(value && value > 0);
            },
        };
    }
}
