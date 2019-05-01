var count = 0;

module.exports = {
    name: "Basic",
    dependencies: [],
    get() {

        class Basic {
            constructor(data) {
      
                this.id = 'basic-' + count;
                this.itemId = data.id;
                this.name = data.name;
                this.type = data.type; 

                count++;
            };
        }


        return Basic;
    }
}
