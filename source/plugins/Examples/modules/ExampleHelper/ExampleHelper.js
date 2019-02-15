module.exports = {
    name: "ExampleHelper",
    dependencies: [],

    get() {
        var core = this;

        return {

            ifNumber_Convert(arg, delimiters){
                delimiters = delimiters || ['%','px','vh','vw','em','rem'];
                if(core.isString(delimiters)) delimiters = [delimiters];

                let isValid = false;

                delimiters.forEach((delimiter) => {
                    if(core.isString(arg) && arg.includes(delimiter)){
                        isValid = true;
                    }
                });

                if(isValid) return arg;  
                return Number(arg);
            },

        };
    }
}
