module.exports = {
    name: "getDataEx",
    dependencies: ['Simple.Helper','Project.DataModelsEntry'],
    get(Helper, DataModelsEntry) {
        
        var core = this;

        return (data, promise) => {
            core.request.post(BaseApi+'/getDataEx', { "pram": data.id })
            .then( ({results,error}) => {

                if(error){
                  Helper.handleActionError(error,promise);
                  return;
                }   
                    
                
                let exampleResults = [{
                    id: 'ex1',
                    name: 'ex1',
                    type: 'person'
                },{
                    id: 'ex2',
                    name: 'ex2',
                    type: 'ExtandBasic'
                }];

                res = DataModelsEntry.navigateDataToConstructor(exampleResults);

                promise.resolve(res);  // results replace by res for example
            });
        };
    }
}