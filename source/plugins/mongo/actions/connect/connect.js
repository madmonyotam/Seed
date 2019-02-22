
module.exports = {
    name: "Mongodb.connect",
    dependencies: [],
    get() {

        var core = this;

        return (data, promise) => {
            core.request.post('/connect')
                .then( ({ response, results, error }) => {

                  if (error) {
                    promise.reject(error)
                    return;
                  }
                  promise.resolve({ connected: results.data, msg: results.msg });

                })
                .catch(err => {console.error(err)});
        };
    }
}
