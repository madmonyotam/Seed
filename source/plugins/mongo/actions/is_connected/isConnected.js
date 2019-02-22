
module.exports = {
    name: "Mongodb.is.connected",
    dependencies: ['CTI.Helpers','CTI.DataModelsEntry'],
    get(Helper, DataModelsEntry) {

        var core = this;

        return (data, promise) => {
            core.request.post('/is.connected')
                .then( ({ response, results, error }) => {
                  if (error) {
                    promise.reject(error)
                    return;
                  }
                  promise.resolve({ connected: results.data, msg: results.msg });
                });
        };
    }
}
