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

                this.cursor = {};
                this.setCursors();
            },
              
            componentWillUnmount(){
                this.isUnmounted = true;
            },

            setCursors(){
                if(!this.cursors) return;

                for (const key in this.cursors) {
                    var path = this.cursors[key];
                    this.cursor[key] = core.select(path);
                }
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
