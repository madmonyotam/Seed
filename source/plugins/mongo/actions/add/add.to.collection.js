
module.exports = {
    name: "Mongodb.add.to.collection",
    dependencies: [],
    get() {

        var core = this;

        return (data, promise) => {
          // console.debug('data => ', data);
            core.request.post('/add.to.collection', data)
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
