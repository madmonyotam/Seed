module.exports = {
    name: "getDataEx",
    dependencies: ['SimpleSwitch.Helper','SimpleSwitch.DataModelsEntry'],
    get(Helper, DataModelsEntry) {
        
        var core = this;

        return (data, promise) => {
            var { BaseApi } = core.plugins.SimpleSwitch;
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