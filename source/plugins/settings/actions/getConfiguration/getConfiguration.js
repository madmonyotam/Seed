module.exports = {
    name: "getConfiguration",
    dependencies: [],
    schema: [{
        key: 'name',
        type: 'string',
        value: 'unnamed'
    }],

    get() {

        var core = this;

        return (data, promise) => {

            core.request.post('/getConfigFile').then( ({ response, results, error }) => {
                // if(error){
                //
                //   return;
                // }
                // console.log(results)
                // var theme = core.tree.get(['plugins', 'theme', 'theme']);
                // var str = JSON.stringify({ ...results }, null, 4);
                // var obj = { ...results, theme };
                promise.resolve(results);
            });
        };
    }
}
