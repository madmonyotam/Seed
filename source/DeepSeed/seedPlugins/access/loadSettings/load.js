var { groupBy } = require('lodash');

module.exports = {
    name: "loadSettings",
    dependencies: [ ],

    get( ) {

        var core = this;

        return (data, promise) => {
          var config = {};
          var menu = {};
          core.request.post('/loadSettings').then( ({ response, results, error }) => {

            if (error && error.data) {
              console.error('error : ', error);
              return;
            }
            else if (results && results.success) {
              let { data } = results; 

              menu = groupBy(data, 'key');
              for (let i in menu) {
                for (let x = 0; x < menu[i].length; x++) {
                  if (menu[i][x].modified) config[i] = menu[i][x].data;
                  else if (menu[i][x].fileName.indexOf('default') > -1) config[i] = menu[i][x].data;
                }
              }
              
              promise.resolve({ config, menu })
            }
          });
        };
    }
}
