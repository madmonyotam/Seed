var Baobab = require('baobab');

module.exports = {
    name: 'Tree',

    extend: {
        tree: new Baobab({}),

        set(path, value) {
            var seed = this;

            return seed.tree.set.apply(this.tree, arguments);
        },
        get(path) {
            var seed = this;
            
            return seed.tree.get.apply(this.tree, arguments);
        },
        select(path) {
            var seed = this;

            return seed.tree.select.apply(this.tree, arguments);
        }

    }

}


