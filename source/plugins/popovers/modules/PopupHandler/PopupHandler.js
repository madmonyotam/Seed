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

            open(args) {
                let id = args && args.hasOwnProperty('id') ? args.id : mainId;
                let parameters = args && args.hasOwnProperty('parameters') ? args.parameters : {};
                if (!id) id = mainId;
                seed.plugins.popovers.openPopup(id, parameters);
            },

            close(id) {
                if (!id) id = mainId;
                seed.emit('PopupClose', id);
            },

            addData(args){
                let id = args && args.hasOwnProperty('id') ? args.id : mainId;
                let data = args && args.hasOwnProperty('data') ? args.data : {};

                let popup = seed.plugins.popovers.get('popup');

                if (!popup.hasOwnProperty(id)) {
                    seed.plugins.popovers.set(['popup', id ], {});
                }
                this.disableOkBtn(id);

                seed.plugins.popovers.set(['popup', id, 'data'], data);
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
