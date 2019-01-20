
module.exports = {
    name: "saveFile",
    dependencies: [],
    schema: [{
        key: 'name',
        type: 'string',
        value: 'unnamed'
    }],

    get() {

        var core = this;

        return (data, promise) => {
          let { fileName, fileData, dir, set, notify } = data;
          var parsed = JSON.stringify(fileData, null, 4);

          core.request.post('/saveFile', {
            fileName: fileName,
            fileData: parsed,
            dir: dir
          }).then( ({ response, results, error }) => {
              if (results.success) {
                let notify = {
                    title: results.msg,
                    text: core.translate(`${fileName} saved`),
                    alertKind: 'info'
                }
                core.emit('notify', notify);
                if (set) core.plugins.Settings.run('saveSettings', data).then((results)=>{
                  promise.resolve(results.success);
                });
                else {
                  promise.resolve(results.success);
                }
              }
          });
        };
    }
}
