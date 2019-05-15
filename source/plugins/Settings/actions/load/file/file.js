
module.exports = {
    name: "LoadFile",
    dependencies: [],
    schema: [{
        key: 'name',
        type: 'string',
        value: 'unnamed'
    }],

    get() {

        var core = this; 
        return ({ fileName, dir }, promise) => {
          core.request.post('/loadFile', { filename: fileName, dir: dir })
              .then( ({ response, results, error }) => {
                if (error) {
                  console.error('error : ', error);
                  promise.reject(error)
                  return;
                }
                else if (results && results.success) {
                  let newFile = results.data;
                  let fileData = newFile.data;
                  // console.debug('results => ', results);
                  // core.plugins.Settings.set(['config', dir], fileData);
                  // core.tree.set(['plugins', dir], fileData);
                  promise.resolve(fileData)
                  core.tree.commit();
                }
              });
        };
    }
}
