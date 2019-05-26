module.exports = {
    name: "PopupHandler",
    dependencies: [],
    get() {
        var seed = this;

        return {
            clearData(){
                seed.plugins.popovers.set(['popup','data'],{});
            },
            
            getData(){
                return seed.plugins.popovers.get(['popup','data']);
            },

            addData(data){
                seed.plugins.popovers.set(['popup','data'],data);
            },

            disableOkBtn(){
                seed.plugins.popovers.set(['popup','disable'],true);
            },

            enableOkBtn(){
                seed.plugins.popovers.set(['popup','disable'],false);
            },
        };
    }
}
