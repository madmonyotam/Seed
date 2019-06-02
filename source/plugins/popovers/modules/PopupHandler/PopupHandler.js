module.exports = {
    name: "PopupHandler",
    dependencies: [],
    get() {
        var seed = this;

        const mainId = 'mainPopup';

        return {
            clearData(id){
                if (!id) id = mainId;
                seed.plugins.popovers.set(['popup', id, 'data'],{});
            },
            
            getData(id){
                if (!id) id = mainId;
                return seed.plugins.popovers.get(['popup', id, 'data']);
            },

            open({id, parameters}) {
                if (!id) id = mainId;
                seed.plugins.popovers.openPopup(id, parameters);
            },

            close(id) {
                if (!id) id = mainId;
                seed.emit('PopupClose', id);
            },

            addData({id, data}){
                if (!id) id = mainId;
                seed.plugins.popovers.set(['popup', id, 'data'],data);
            },

            disableOkBtn(id){
                if (!id) id = mainId;
                seed.plugins.popovers.set(['popup', id, 'disable'],true);
            },

            enableOkBtn(id){
                if (!id) id = mainId;
                seed.plugins.popovers.set(['popup', id, 'disable'],false);
            },
        };
    }
}
