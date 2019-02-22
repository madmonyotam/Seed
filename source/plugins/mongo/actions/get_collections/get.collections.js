
module.exports = {
    name: "Mongodb.get.collections",
    dependencies: [],
    get() {

        var core = this;

        return (data, promise) => {
            core.request.post('/get.collections', { collectionName: data.name })
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
