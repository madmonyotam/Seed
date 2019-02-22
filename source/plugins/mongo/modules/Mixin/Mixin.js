var numeral = require('numeral');
var _ = require("lodash");
var moment = require('moment');

module.exports = {
    name: "Mixin",
    dependencies: [],

    get() {

        var { React } = core.imports;

        return {

            componentDidMount() {
                this.isUnmounted = false;
            },
              
            componentWillUnmount(){
                this.isUnmounted = true;
            },

            safeState(state, callback){
                if(this.isUnmounted) return;
                this.setState(state, callback);
            },

            prevent( e ) {
                if (e.preventDefault) e.preventDefault();
                if (e.stopPropagation) e.stopPropagation();
            },

            serialize( data ) {
                let result;
                let errorText = core.translate('fail to serialize oblect');

                try {
                    result = JSON.parse(JSON.stringify( data ));
                } catch (error) {
                    core.emit('notify', { text: errorText, alertKind: 'error' });    
                    console.error(errorText);               
                    return null;
                }

                return result;
            },

            capitalizeFrist(string) {
                if(!string) return '';
                else if(!isNaN(string) ) return string;
                else return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
            },

            getNumberFormatted(number, format) {              //numeraljs.com/
                if(_.isNaN(_.toNumber(number))) return `${number}`;
                
                let numberString = numeral(number).format(format || "0[.]0 a");
                return (numberString);
            },

            getDateFormatted(date, format){
                return moment(date).format(core.general(format))
            }
        };
    }
}
