const axios = require('axios');

function request(method, url , data){
    var authToken = localStorage.getItem('authToken');

    let headers = {
        'Accept': 'application/json',
 //       'Content-Type': 'application/json',
    };

    if(authToken!==null){
        headers.Authorization = authToken;
    }

    let req;

    switch (method) {
        case 'PUT':
            headers['Content-Type'] = 'application/json';
        case 'POST':
			headers['Content-Type'] = 'application/json';
        case 'DELETE':

            let options = {
                method: method,
                headers: headers,
                data: JSON.stringify(data),
                url: url,
            };

            req = axios(options);
            break;

        case 'GET':

            req = axios.get(url, {
                params: data,
                headers: headers
            });
            break;
    }


   return req.then((res)=>{
        return({ response: res, results:res.data, error:null });
    }).catch((err)=>{
        return({ results:null, error: err.response });
    })

}

module.exports = {
    name: 'request',
    extend: {
        request: {
            get(url, data){
                return request('GET', url, data);
            },
            post(url, data){
                return request('POST', url, data);
            },
            update(url, data){
                return request('PUT', url, data);
            },
            delete(url, data){
                return request('DELETE', url, data);
            }
        }
    },
    init(definition, done){

        var core = this;

        done({
            go(){
                alert('request is ready to go');
            }
        });
    }
};
