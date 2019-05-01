module.exports = {
    name: "getLanguage",
    dependencies: [],
    schema: [{
        key: 'name',
        type: 'string',
        value: 'unnamed'
    }],
    
    get() {
        
        var core = this;

        return (data, promise) => {
           
            core.request.get('/languages/en.json').then( ({results,error}) => {

                if(error){
                    let notify = {
                        title: core.translate('missing language file'),
                        text: core.translate(`en.json is missing`),
                        alertKind: 'error'
                    }
                
                    core.emit('notify',notify);
                    promise.reject(error);
                    return;
                }  

                core.plugins.translate.set(['dictionary'],results);


                          
                promise.resolve(results);
            });
        };
    }
}