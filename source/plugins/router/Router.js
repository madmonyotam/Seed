var _ = require("lodash");
var _isEqual = require('lodash').isEqual;

module.exports = {
    name: 'router',
    route: null,
    
    channels: ['router.navigation'],

    modules: [
        require('./modules/pure')
    ],

    components: [
        require('./components/Router'),
    ],

    init(definition, done) {

        var core = this;

        /**
         * @module router
         */
        var router = {
             /**
             * The route object
             */
            route: null,

            /**
             * The query object
             */
            query: null,

            get() {
                if (!router.route) return null;
                
                return router.route.get.apply(router.route, arguments)
            },

            set() {
                if (!router.route) return null;
                return router.route.set.apply(router.route, arguments)
            },

            remove() {
                if (!router.route) return null;
                return router.route.remove.apply(router.route, arguments)
            },

            push(path, value) {
                if (!router.route) return null;
                var existing = router.route.get(path);
                if(!existing) existing = [];
                existing.push(value);
                router.route.set(path, existing);
                return existing;
            },

            pop(path, value) {
                if (!router.route) return null;
                var existing = router.route.get(path);
                if(!existing) return [];
                if(!core.isArray(existing)){
                    return console.warn(`router - cannot pop from non array, route property '${ path.toString() }' is of type ${ core.typeOf(existing) }`)
                }
                existing = existing.filter(function(v){
                    if(v === value) return false;
                    if(core.isObject(v) && core.isObject(value)){
                        if(_isEqual(v, value)) return false;
                    }
                    return true;
                });
                router.route.set(path, existing);
                return existing;
            },

            update(path, selector, data) {
                if (!router.route) return null;
                var existing = router.route.get(path);
                if(!existing) {
                    existing = [];
                }
                if(!core.isArray(existing)){
                    return console.warn(`router - cannot update in a non array, route property '${ path.toString() }' is of type ${ core.typeOf(existing) }`)
                }
                var assigned = false;
                existing = existing.map(function(v){
                    if(v === selector) {
                        assigned = true;
                        return core.assign({}, v, data);
                    }
                    if(core.isObject(v) && core.isObject(selector)){
                        for(var m in selector){
                            if(selector[m] !== v[m]){ return v; }
                        }
                        assigned = true;
                        return core.assign({}, v, data);
                    }
                    return v;
                });
                if(!assigned){
                    existing.push(core.assign({}, selector, data))
                }
                router.route.set(path, existing);
                return existing;
            },

            to() {
                if (!router.route) return null;
                return router.route.to.apply(router.route, arguments)
            },

            getParams(url) {
                let u = url;
                if(typeof url === "undefined") {
                    u = location.hash;
                }

                try {
                    return JSON.parse(decodeURIComponent(u.substring(u.lastIndexOf("/") + 1)));
                }
                catch(e) {
                    return {};
                }
            },

            link(url, query) {
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
                        var s = encodeURIComponent(JSON.stringify(query));
                        url = url + s;
                    }
                    catch(err){
                        console.error(`cannot stringify query from ${ core.typeOf(query) }`)
                    }
                }
                return url;
            },

            keyHasChanged(key){
                var a = router.lastQuery && router.lastQuery[key];
                var b = router.query && router.query[key];
                if(a === b){ return false; }
                return !pure.equals(a, b);
            },

            hasOnlyChanged(keys){
                if(!Array.isArray(keys)){
                    keys = [keys];
                }
                var lastKeys = router.lastQuery && Object.keys(router.lastQuery);
                var currentKeys = router.query && Object.keys(router.query);
                if(!lastKeys || !currentKeys){
                    return false;
                }
                lastKeys.map(key => {
                    if(currentKeys.indexOf(key) === -1){
                        currentKeys.push(key);
                    }
                })
                for(var i = 0; i < currentKeys.langth; i++){
                    if(router.keyHasChanged(currentKeys[i])){
                        if(keys.indexOf(currentKeys[i]) === -1){
                            return false;
                        }
                    }
                }
                return true;
            },

            getUrlQuery(url){
                return router.parseUrl(url).query;
            },

            parseUrl(url){
                let result = { path: [], query: {} };
                if(!url){ return result; }
                let queryStart = url.indexOf('{');
                if((queryStart === -1) && (url.indexOf('%7B') > -1)){  // '%7B' = encoded '{'
                    url = decodeURIComponent(url);
                    queryStart = url.indexOf('{');
                }
                if(queryStart > -1){
                    try {
                        let urlString = url.slice(0, queryStart);
                        let queryString = url.slice(queryStart);
                        result.path = urlString.split('/').filter(t => t);
                        result.query = JSON.parse(queryString) || {};
                    } catch (err) {
                        console.error(err);
                        result.error = err;
                        return result;
                    }
                }
                else{
                    result.path = url.split('/').filter(t => t);
                }
                return result;
            },

            navigationCount: 0
        };

        done(router);
    }
};