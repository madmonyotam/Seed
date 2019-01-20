module.exports = {
    name: "DataModelsEntry",
    dependencies: ['SimpleSwitch.Basic','SimpleSwitch.ExtandBasic'],
    get(Basic,ExtandBasic) {

        return {

            navigateDataToConstructor (data){
                let modifyData;

                if(Array.isArray(data)){
                    modifyData = data.map(this.findConstructor)
                } else {
                    modifyData = [this.findConstructor(data)];
                }

                return modifyData;
            },

            findConstructor(item){
                let constractors = [ExtandBasic];
                let types = ['ExtandBasic'];
                let constructor = Basic;
                
                let place = types.indexOf(item.type);

                if( place > -1 ){ 
                    constructor = constractors[place];
                };
                
                var entity = new constructor(item);
                return(entity)
            },

        };
    }
}
