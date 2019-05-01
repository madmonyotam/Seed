var count = 0;

module.exports = {
    name: "ExtandBasic",
    dependencies: ['Project.Basic'],
    get(Basic) {

        class ExtandBasic extends Basic {
            constructor(data) {
                super(data);

                this.id = 'ExtandBasic-' + count;

                count++;
            };
        }


        return ExtandBasic;
    }
}
