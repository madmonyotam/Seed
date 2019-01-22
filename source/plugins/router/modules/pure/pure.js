module.exports = {
    name: "pure",
    dependencies: [],

    get() {

        return {
            lookup(object, name, caseSensitive) {
                if (!object || !name) return null;
                var defaultive = object['*'];
                name = name.toLowerCase();
                for (var m in object) {
                    if (m.toLowerCase() === name) return object[m];
                }
                if (defaultive) { // default route
                    if (object[defaultive]) return object[defaultive];
                }
                return null;
            },
            
            parseObjectToUrl(object) {
                if (typeof object === 'string') return object;
                if (!object) return '';
                return JSON.stringify(object);
            },
            
            routeToString(route) {
                if (!route || !route.component) return '';
                var string = [route.name];
                var child = this.routeToString(route.children[0]);
                if (child) string.push('/', child);
                return string.join('');
            },
            
            routeToUrl(route) {
                var url = this.routeToString(route);
                var path = ['/', url];
                if (route.query) {
                    if (Object.keys(route.query).length) {
                        path.push('/', JSON.stringify(route.query));
                    }
                }
                return path.join('');
            },
            
            equals(a, b) {
                if(!a || !b){ return a === b; }
                var ta = typeof a;
                var tb = typeof b;
                if (ta !== tb) return false;
                if (ta === 'object') {
                    if (Array.isArray(a)) {
                        if (a.length !== b.length) return false;
                        if (!a.length) return true;
                        for (var i = 0; i < a.length; i++) {
                            if (!equals(a[i], b[i])) return false;
                        }
                        return true;
                    } else {
                        if (Object.keys(a).length !== Object.keys(b).length) return false;
                        for (var m in a) {
                            if (!equals(a[m], b[m])) return false;
                        }
                        return true;
                    }
                } else {
                    return a === b;
                }

            },
    
        }
    }   
}