
module.exports = {
    name: "loadFile",
    dependencies: [],
    schema: [{
        key: 'name',
        type: 'string',
        value: 'unnamed'
    }],

    get() {

        var core = this;
        return ({ fileName, dir }, promise) => {
          var config = {};
          var menu = {};
          core.request.post('/loadFile', { filename: fileName, dir: dir })
              .then( ({ response, results, error }) => {
                if (error && error.data) {
                  let notify = {
                      title: 'Config files',
                      text: error.data.msg,
                      alertKind: 'error'
                  }
                  core.emit('notify',notify);
                  return;
                }
                else if (results && results.success) {
                  let newFile = results.data;
                  let fileData = newFile.data;

                  core.plugins.Settings.set(['config', dir], fileData);
                  core.tree.set(['plugins', dir], fileData);
                  promise.resolve(fileData)
                  core.tree.commit();
                }
              });
        };
    }
}
