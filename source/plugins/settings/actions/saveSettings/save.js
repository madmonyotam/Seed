
module.exports = {
    name: "saveSettings",
    dependencies: [],
    schema: [{
        key: 'name',
        type: 'string',
        value: 'unnamed'
    }],

    get() {

        var core = this;

        return (data, promise) => {
          let { fileData, dir, notify } = data;

          var parsed = JSON.stringify(fileData, null, 4);
          core.request.post('/saveSettings', { fileData: parsed, dir: dir }).then( ({ response, results, error }) => {
              if (results.success) {

                let notification = {
                    title: core.translate(`${dir} saved`),
                    text: results.msg,
                    alertKind: 'success'
                }
                if (notify) core.emit('notify',notification);

                core.plugins.Settings.set(['config', dir], fileData);
                core.tree.set(['plugins', 'access', dir], fileData);
                core.tree.commit();
                promise.resolve(results.success);

              }
          });
        };
    }
}
