module.exports = {
dependencies: ['Layouts.Absolute', 'popovers.PopupHandler'],
get(Absolute, PopupHandler) {
    var core = this;
    var { React, PropTypes, ComponentMixin } = core.imports;

    return {
        mixins: [ ComponentMixin ],

        propsTypes: {
        },

        getDefaultProps() {
            return {};
        },

        getInitialState() {
            return {
                open: false,
            };
        },

        componentWillMount() {
            this.initUnits();
        },

        componentDidMount() {
            this.eventsHandler('on');
        },

        componentWillUnmount() {
            this.eventsHandler('off');
        },

        componentWillReceiveProps(nextProps) {},

        initUnits(){
            this.dims = {};
            this.colors = {};
            this.backgrounds = {};
            this.icons = {};
        },

        styles(propName) {
            let styles = {
                root: {},
            };
            return styles[propName]
        },

        eventsHandler(action) {
            core[action]('Popup', this.handleClickOpen);
            core[action]('PopupClose',this.handleClose);
        },

        handleClickOpen(popupData) {
            if(!popupData) {
                this.setState({ open: true });
                return
            }

            let {title, body, bodyStyle, btnTitle, btnFunc, showButtons, buttons, modalStyle } = popupData;
            this.setState({ title, body, bodyStyle, btnTitle, btnFunc, showButtons, buttons , modalStyle, open: true });
        },

        handleClose() {
            PopupHandler.clearData();
            this.setState({ open: false, isLoading: false });
        },


        renderOpen() {
            let {children} = this.propsTypes;
            return (
                <Absolute id={'Popup'} color={'#ff000080'} onClick={this.handleClose}>
                    {children}
                </Absolute>
            );
        },

        renderClosed() {
            return null;
        },

        render() {
            let {open} = this.state;
            return open ? this.renderOpen() : this.renderClosed();
        }
    }
}}
