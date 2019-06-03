module.exports = {
    name: "PopupHandler",
    dependencies: [],
    get() {
        var seed = this;

        const mainId = 'mainPopup';

        return {
            clearData(id){
                if (!id) id = mainId;
                this.disableOkButton(id);
                this.okButtonStopLoad(id);
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

                this.disableOkButton(id);
                this.okButtonStopLoad(id);
                seed.plugins.popovers.openPopup(id, parameters);
            },

            close(id) {
                if (!id) id = mainId;
                seed.emit('PopupClose', id);
            },

            addData(args) {
                let id = args && args.hasOwnProperty('id') ? args.id : mainId;
                let data = args && args.hasOwnProperty('data') ? args.data : {};

                let popup = seed.plugins.popovers.get('popup');

                if (!popup.hasOwnProperty(id)) {
                    seed.plugins.popovers.set(['popup', id ], {});
                }

                seed.plugins.popovers.set(['popup', id, 'data'], data);
            },

            disableOkButton(id) {
                if (!id) id = mainId;
                seed.plugins.popovers.set(['popup', id, 'disabled'],true);
            },

            enableOkButton(id) {
                if (!id) id = mainId;
                seed.plugins.popovers.set(['popup', id, 'disabled'],false);
            },

            okButtonStartLoad(id) {
                if (!id) id = mainId;
                seed.plugins.popovers.set(['popup', id, 'isLoading'],true);
            },

            okButtonStopLoad(id) {
                if (!id) id = mainId;
                seed.plugins.popovers.set(['popup', id, 'isLoading'],false);
            },
        };
    }
}
