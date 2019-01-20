module.exports = {
    name: "PopupHandler",
    dependencies: [],
    get() {
        var core = this;

        return {

            clearData(){
                core.plugins.popovers.set(['popup','data'],{});
            },
            
            getData(){
                return core.plugins.popovers.get(['popup','data']);
            },

            addData(data){
                core.plugins.popovers.set(['popup','data'],data);
            },

            disableOkBtn(){
                core.plugins.popovers.set(['popup','disable'],true);
            },

            enableOkBtn(){
                core.plugins.popovers.set(['popup','disable'],false);
            },

        };
    }
}
