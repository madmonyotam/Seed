
module.exports = {
    name: 'utils',
    components: [
    ],
    modules: [
        require('./modules/camelCaseToSpace')
    ],
    init(definition, done){
        
        var core = this;

        done({
        });

    }
};