module.exports = {
    name: "loadServerConfig",
    dependencies: [ ],
    schema: [{
        key: 'name',
        type: 'string',
        value: 'unnamed'
    }],

    get( ) {

        var core = this;

        return (params, promise) => {
          var config = {};
          var menu = {};

          core.request.post('/loadServerConfig').then( ({ response, results, error }) => {
            // console.debug({ response, results, error });

            if (error) {
              console.error(':: ', error);
              // Helpers.handleActionError(error, promise);
              promise.reject(undefined)
              return;
            }
            else if (results && results.success) {
              
              let { data, successPath } = results, projects = [];
              for (let key in data.projects) {
                if (key.toLowerCase() !== 'default') {
                  projects.push({
                    name: key,
                    root: data.projects[key].root,
                    mongo: data.projects[key].mongo
                  })
                }
              } 
              let projectPath = successPath;
              promise.resolve({ projects, data, projectPath })
            }
          });
        };
    }
}
