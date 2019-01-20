
module.exports = {
    name: "camelCaseToSpace",
    dependencies: [],
    get() {
        
        var core = this;

        return (str) => {
            if(typeof str !== 'string'){
                console.warn('invalid parameter');
                return '';
            }
            var array = str.split('');
            var result = [];
            for (let i = 0; i < array.length - 1; i++) {
                const char = array[i];
                result.push(array[i]);

                // add a space if this char is a lowercase letter and the next char is an uppercase letter
                if(/[a-zA-Z]/.test(array[i]) && array[i].toLowerCase() === array[i] && array[i + 1].toUpperCase() === array[i + 1]){
                    result.push(' ');
                }
            }
            result.push(array[array.length - 1]);
            return result.join('');
        }
    }
}