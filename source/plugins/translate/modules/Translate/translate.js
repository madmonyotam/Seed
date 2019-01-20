module.exports = {
    name: "Translate",
    dependencies: [],
    get() {
        var core = this;

        return {
            translate(key, defaultValue, args) {
                var language = core.plugins.translate.get(['dictionary']);
                if (!core.isString(key)) {
                    return console.trace('core.translate() expects a string. got', key);  
                };
                if (core.translateKeysFlag) {
                    return key;
                };
               
                if (core.isArray(defaultValue)) {
                    var v = args;
                    args = defaultValue;
                    defaultValue = v;
                }
    
                if (!language) return defaultValue;
                var value = language[key];
                
                var stringValue;
    
                if (!value) {
                    value = (defaultValue || key.split('.').pop());
                }

                var type = core.typeOf(value);
                if (type === 'string') {
                    stringValue = value;
                } else if (type === 'object') {
                    stringValue = ((value.value === null) ? value.defaultValue : value.value);
                }
    
                if (stringValue && (stringValue.indexOf('${') > -1)) {
                    stringValue = this.parseAsTemplateString(stringValue, args);
                }
                
                return stringValue;
            },

            
            parseAsTemplateString(str, args = {}){
                var parts = [];
                var current = [];
                var result = [];
                var isVeriable = false;
                var k, i, value, part, char;

                for (i = 0; i < str.length; i++) {
                    char = str[i];

                    if((char === '$') && (str[i + 1] === '{')){
                        i++;
                        isVeriable = true;

                        if(current.length){
                            value = current.join('');

                            if(value){
                                parts.push({ type: 'string', value: value });
                            }   
                        }

                        current = [];

                    } else if(char === '}' && isVeriable){
                        isVeriable = false;

                        if(current.length){
                            value = current.join('').trim();

                            if(value){
                                parts.push({ type: 'variable', value: value });
                            }   
                        }

                        current = [];

                    } else {
                        current.push(char);
                    }
                }


                if(current.length){
                    value = current.join('');

                    if(value){
                        parts.push({ type: 'string', value: value });
                    }        
                }
                
                for (k = 0; k < parts.length; k++) {
                    part = parts[k];
                    if(part.type === 'string'){
                        result.push(part.value);
                    } else {
                        result.push(args[part.value] || '')
                    }
                }

                return result.join('');
            },

        };
    }
}