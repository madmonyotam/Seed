
module.exports = {
    name: "SaveSettings",
    dependencies: [],
    get() {

        var core = this;

        return (data, promise) => {
          let { fileData, dir, notify } = data;

          var parsed = JSON.stringify(fileData, null, 4);
          
          core.request.post('/saveSettings', { fileData: parsed, dir: dir }).then( ({ response, results, error }) => {
            if (error) {
                console.error('error : ', error);
                promise.reject(error)
                return;
            }

            if (results.success) {

                let notification = {
                    text: core.translate(`${dir} saved`)+' - '+results.msg,
                    alertKind: 'success'
                }
                if (notify) core.emit('notify',notification);

                // core.plugins.Settings.set(['config', dir], fileData);
                core.tree.set(['plugins', 'access', dir], fileData);
                core.tree.commit();
                promise.resolve(results.success);

              }
          });
        };
    }
}
