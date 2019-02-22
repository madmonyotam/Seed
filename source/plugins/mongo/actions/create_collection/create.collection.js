
module.exports = {
    name: "Mongodb.create.collection",
    dependencies: ['CTI.Helpers','CTI.DataModelsEntry'],
    get(Helper, DataModelsEntry) {

        var core = this;

        return (data, promise) => {
            core.request.post('/create.collection', { collectionName: data.name })
                .then( ({ response, results, error }) => {

                  if (error) {
                    promise.reject(error.data)
                    return;
                  }

                  promise.resolve(results);

                });
        };
    }
}
