var { isNaN, toNumber } = require('lodash');

var mixin = (seed)=> {

    return ({

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
                this.cursor[key] = seed.select(path);
            }
        },
        
        serialize( data ) {
            let result;
            let errorText = seed.translate('fail to serialize oblect');

            try {
                result = JSON.parse(JSON.stringify( data ));
            } catch (error) {
                seed.emit('notify', { text: errorText, alertKind: 'error' });    
                console.error(errorText);
                return null;
            }

            return result;
        },

        safeState(state, callback){
            if(this.isUnmounted) return;
            this.setState(state, callback);
        },

        getNumberFormatted(number, format) {              //numeraljs.com/
            if(isNaN(toNumber(number))) return `${number}`;
            
            let numberString = numeral(number).format(format || "0[.]0a");          
            return (numberString);
        }

    });
}

module.exports = mixin;