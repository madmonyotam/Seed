module.exports = {
    name: "Helper",
    dependencies: [],

    get() {

        var core = this;


        return {

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

            capitalizeFirstLetter(string) {
                if(!string) return '';
                else if(!isNaN(string) ) return string;
                else return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
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
                return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g,
                    function(match, index) {
                        if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
                        return index == 0 ? match.toLowerCase() : match.toUpperCase();
                    }
                );
            },

            cutString(str, num){
                if(str.length > num) return(str.substring(0,num-3)+'...');
                return str;
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

            handleActionError (error, promise) {
                let err = '';

                if(error.status === 500){
                    err = core.translate(error.statusText);
                }

                let notify = {
                    text: err,
                    alertKind: 'error'
                }

                core.emit('notify',notify);
                promise.reject({error: error, message: err});
            },

        };
    }
}
