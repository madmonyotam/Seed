module.exports = {
    name: "logIn",
    dependencies: [],
    schema: [{
        key: 'name',
        type: 'string',
        value: 'unnamed'
    }],
    
    get() {
        
        var core = this;

        return (data, promise) => {
            var { BaseApi } = core.plugins.SimpleSwitch;
            core.request.post(BaseApi+'/auth', {
                "email": data.email,
                "password": data.password
            })
            .then( ({results,error}) => {

                if(error){
                    let notify = {
                        title:this.translate(`log in fail`),
                        text:this.translate(error.data.errors[0]),
                        alertKind: 'error'
                    }

                    core.emit('notify',notify);
                    promise.reject(error);
                    return;
                }   
                          
                promise.resolve(results);
                if(results && results.token && results.user){
                    localStorage.setItem('authToken', results.token)
                    localStorage.setItem('currentUser', JSON.stringify(results.user) )
                }
            });
        };
    }
}