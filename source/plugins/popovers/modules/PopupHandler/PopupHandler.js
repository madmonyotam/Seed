module.exports = {
    name: "PopupHandler",
    dependencies: [],
    get() {
        var seed = this;

        return {
            clearData(id){
                seed.plugins.popovers.set(['popup', id, 'data'],{});
            },
            
            getData(id){
                return seed.plugins.popovers.get(['popup', id, 'data']);
            },

            open(id, params) {
                seed.plugins.popovers.openPopup(id, params);
            },

            close(id) {
                seed.emit('PopupClose', id);
            },

            addData(id, data){
                seed.plugins.popovers.set(['popup', id, 'data'],data);
            },

            disableOkBtn(id){
                seed.plugins.popovers.set(['popup', id, 'disable'],true);
            },

            enableOkBtn(id){
                seed.plugins.popovers.set(['popup', id, 'disable'],false);
            },
        };
    }
}
