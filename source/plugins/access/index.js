module.exports = {
    name: 'access',
    tree: {
        icons:{},
        theme:{}
    },
    extend: {

        simpleProps(path) {
            var simpleProps = this.plugins.access.select('components');
            if (!path) return simpleProps;
            if (this.isString(path)) {
                path = path.split(/[\.,\/]/);
            }
            var value = simpleProps.get(path);
            return value;
        },
        
        dim(path) {
            var dim = this.plugins.access.select('dimensions');
            if (!path) return dim.get();
            if (this.isString(path)) {
                path = path.split(/[\.,\/]/);
            }
            var value = dim.get(path);
            return value;
        },

        icons(path) {
            var icons = this.plugins.access.select('icons');
            if (!path) return icons.get();
            if (this.isString(path)) {
                path = path.split(/[\.,\/]/);
            }
            var value = icons.get(path);
            return value;
        },

        theme(path) {
            var theme = this.plugins.access.select('theme');
            if (!path) return theme;
            if (this.isString(path)) {
                path = path.split(/[\.,\/]/);
            }
            var value = theme.get(path);
            return value;
        }
    },
    init(def, done) {
        var core = this;
        done({});

    }
};
