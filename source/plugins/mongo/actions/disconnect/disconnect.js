
module.exports = {
    name: "Mongodb.disconnect",
    dependencies: ['CTI.Helpers','CTI.DataModelsEntry'],
    get(Helper, DataModelsEntry) {

        var core = this;

        return (data, promise) => {
            core.request.post('/disconnect')
                .then( ({ response, results, error }) => {

                  if (error) {
                    promise.reject()
                    return;
                  }
                  console.debug('[dis] ', { response, results, error })
                  promise.resolve({ connected: results.data, msg: results.msg });

                });
        };
    }
}
