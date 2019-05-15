import { 
    isEmpty as _isEmpty,
    map as _map,
} from 'lodash';

module.exports = {
    name: "Helpers",
    dependencies: [],

    get() {
        var { ComponentMixin } = core.imports;
        return {
            mixins: [ ComponentMixin],

            CopyToClipboard(textToCopy){

                const handleError = (err) => {

                    let notify = {
                        title: 'Could not copy text',
                        text: err,
                        alertKind: 'error'
                    }

                    core.emit('notify',notify);
                };
                if (!textToCopy) return handleError('missing text to copy...')
                const handleSuccess = () => {
                    var text = core.translate('Copied to clipboard successfully!');

                    let notify = {
                        title: textToCopy,
                        text: text,
                        alertKind: 'info'
                    }

                    core.emit('notify',notify);
                };

                if (navigator.clipboard) {
                    navigator.clipboard.writeText(textToCopy).then( handleSuccess, handleError );
                } else {
                  const el = document.createElement('textarea');
                  el.value = textToCopy;
                  el.style.display = 'none';
                  document.body.appendChild(el);
                  el.select();
                  document.execCommand('copy');
                  document.body.removeChild(el);
                  handleSuccess()
                }

            },

            makeAcronym(text) {
                var words = text.split(' ');
                var acronym = '';
                var index = 0;
                var nextWord;
                while (index < words.length) {
                        nextWord = words[index];
                        acronym = acronym + nextWord.charAt(0);
                        index = index + 1 ;
                }
                return acronym;
            },
            
            capitalizeFirstLetter( string ) { // for retro compatibility :)
                this.capitalizeFristLetter( string );
            },

            capitalizeWords(string) {
                if(!string) return '';
                else if(!isNaN(string) ) return string;
                else { // found online
                  var text = string.toLowerCase();
                  var splitted = text.split(' ');
                  splitted = splitted.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                  var complete = splitted.join(' ');
                  return complete;
                }
            },

            openCamelCase(str) {
                if (!str) return '';
                if (typeof(str) === 'string' && !!str.length) {
                    return str.replace(/([a-z](?=[A-Z]))/g, '$1 ').replace(/\b[a-z](?=[a-z]{2})/g,
                        function(letter) {
                          return letter.toUpperCase();
                        }
                    );
                }
                return str;
            },

            makeCamelCase(str) {
                if (!str) return '';
                let newStr = str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g,
                    function(match, index) {
                        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
                        return index == 0 ? match.toLowerCase() : match.toUpperCase();
                    }
                );
                return newStr.charAt(0).toUpperCase() + newStr.slice(1);
            },

            underscoreToCamelCase(str){
                if (!str) return '';
                let newStr = str.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); });
                
                return newStr.charAt(0).toUpperCase() + newStr.slice(1);
            },

            scrollTopAnimation(element, speed=5) {

                let currentScrollTop = element.scrollTop;
                let initScrollTop = currentScrollTop;

                var intervalId = setInterval(() => {

                currentScrollTop = currentScrollTop - initScrollTop*0.01*speed;
                element.scrollTop = currentScrollTop ;

                  if(currentScrollTop == 0){
                    clearInterval(intervalId);
                  }
                }, 20);

                setTimeout(() => {
                    clearInterval(intervalId);
                }, 3000);

            },

            getRoute(url, query) {
                if(!url){
                    return '#';
                }
                if(url.indexOf('/') !== 0){
                    url = '/' + url;
                }
                if(url.lastIndexOf('/') !== (url.length - 1)){
                    url = url + '/';
                }
                url = '#' + url;
                if(query){
                    try{
                        var s = JSON.stringify(query);
                        url = url + s;
                    }
                    catch(err){
                        console.error(`cannot stringify query from ${query}`)
                    }
                }
                return url;
            },

            handleActionError (error, promise) {
                let err;

                if(error && (error.statusText == 'Network Authentication Required' || error.statusText == "Unauthorized")){
                    core.plugins.Settings.set(['isLoggedIn'], false);
                    localStorage.clear("authToken");
                    core.plugins.Settings.run('resetTree');             
                };

                if(error.data instanceof Object){
                    err =  error.data.defaultMessage || error.data.error.defaultMessage || error.data.error;
                } else {
                    err = error.data || error.statusText;
                }

                if(core.plugins.Settings.get('isLoggedIn')){
                    core.emit('notify', { text: err, alertKind: 'error' });
                }

                promise.reject({error: error, message: err});
            },

        };
    }
}
