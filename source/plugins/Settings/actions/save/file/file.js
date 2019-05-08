
module.exports = {
    name: "SaveFile",
    dependencies: [ ],
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
              if (error) {
                console.error('error : ', error);
                promise.reject(error)
                // Helpers.handleActionError(error, promise);
                return;
              }

              if (results.success) {
                let notify = {
                    title: results.msg,
                    text: core.translate(`${fileName} saved`),
                    alertKind: 'info'
                }
                core.emit('notify', notify);
                // if (set) core.plugins.Settings.run('saveSettings', data).then((results)=>{
                  promise.resolve(results.success);
                // });
                // else {
                //   promise.resolve(results.success);
                // }
              }
          });
        };
    }
}
