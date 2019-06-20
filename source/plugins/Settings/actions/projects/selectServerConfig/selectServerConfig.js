import { isEmpty } from 'lodash';

module.exports = {
    name: "selectServerConfig",
    dependencies: [ ],

    get(   ) {

        var core = this;

        return (params, promise) => {

          core.request.post('/selectServerConfig', {
            configPath: params.configPath,
            configName: params.configName
          }).then( ({ response, results, error }) => {

            // console.debug({ response, results, error });

            if (error) {
              console.error(':: ', error);
              // Helpers.handleActionError(error, promise);
              promise.reject(undefined)
              return;
            }
            else if (results && results.success && !isEmpty(results.data)) {

              core.getInitialFiles( DefaultFiles => {
                let merged = core.mergeConfig(DefaultFiles.config, { serverConfig: results.data })

                core.setConfiguration(merged);

                if (results.successPath) {
                  core.plugins.Settings.set(['currentProjectPath'], results.successPath);
                }

                // core.plugins.Settings.setAccessToSettings();
                core.plugins.Settings.setProjects(DefaultFiles)

                promise.resolve(null);
              })
            }
          });
        };
    }
}
