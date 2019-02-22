
module.exports = {
    name: "Mongodb.find.in.collection",
    dependencies: ['CTI.Helpers','CTI.DataModelsEntry'],
    get(Helper, DataModelsEntry) {

        var core = this;

        return (data, promise) => {
            // console.debug('data => ', data);
            core.request.post('/find.in.collection', data)
                .then( ({ response, results, error }) => {

                  if (error) {
                    promise.reject(error)
                    return;
                  }
                  promise.resolve( results );

                });
        };
    }
}
