var numeral = require('numeral');
var _ = require("lodash");

module.exports = {
    name: "Mixin",
    dependencies: [],

    get() {
        var core = this;

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

            getNumberFormatted(number, format) {              //numeraljs.com/
                if(_.isNaN(_.toNumber(number))) return `${number}`;
                
                let numberString = numeral(number).format(format || "0[.]0a");          
                return (numberString);
            },

        };
    }
}
