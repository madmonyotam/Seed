module.exports = {
dependencies: ['Layouts.Absolute', 'popovers.PopupHandler', 'popovers.PopupButtons', 'Layouts.Center', 'Simple.Label',
                'Inputs.IconButton', 'Layouts.Column', 'Layouts.Row'],
get(Absolute, PopupHandler, PopupButtons, Center, Label,
    IconButton, Column, Row) {
    var core = this;
    var { React, PropTypes, ComponentMixin } = core.imports;

    return {
        mixins: [ ComponentMixin ],

        propsTypes: {
            id: PropTypes.string,
            titleHeight: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
            footerHeight: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
            width: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
            height: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
            titleLabelColor: PropTypes.string,
            titleColor: PropTypes.string,
            paneColor: PropTypes.string,
            background: PropTypes.string,
            buttonsBackground: PropTypes.string,
        },

        getDefaultProps() {
            return {
                id: 'mainPopup',
                width: 800,
                height: 500,
                titleHeight: 50,
                footerHeight: 50,
                titleLabelColor: core.theme('texts.popupTitle'),
                titleColor: core.theme('backgrounds.primary'),
                paneColor: core.theme('backgrounds.popupPane'),
                background: core.theme('backgrounds.default'),
                buttonsBackground: core.theme('backgrounds.default'),
            };
        },

        getInitialState() {
            return {
                open: false,
                width: undefined,
                height: undefined,
                btnTitle: core.translate('Save'),
                btnFunc: ()=>{},
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
            let {height, titleHeight} = this.props;
            let {modalStyle, bodyStyle} = this.state;

            let styles = {
                root: {
                    maxHeight: height,
                    ...modalStyle
                },
                title: {
                    minHeight: titleHeight,
                    justifyContent:'space-between',
                },
                body: {
                    ...bodyStyle,
                },
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

            let {id} = this.props;
            let {title, body, bodyStyle, btnTitle, btnFunc, showButtons, buttons, modalStyle } = popupData;

            if (popupData.id && popupData.id !== id) {
                this.setState({ open: false });
            } else {
                this.setState({ title, body, bodyStyle, btnTitle, btnFunc, showButtons, buttons , modalStyle, open: true });
            }
        },

        handleClose(paramsId) {
            let {id} = this.props;
            if (id === paramsId) {
                PopupHandler.clearData(id);
                this.setState({ open: false, isLoading: false });
            }
        },

        renderTitle() {
            let {title} = this.state;
            let {titleColor, titleLabelColor, titleHeight, id} = this.props;

            return(
                <Row color={titleColor} height={titleHeight} style={this.styles('title')}>
                    <Label labe={title} color={titleLabelColor} transform={'uppercase'}/>
                    <IconButton 
                        iconSize={18}
                        iconColor={titleLabelColor}
                        onClick={()=>{this.handleClose(id)}}
                        background={titleColor}
                        icon={core.icons('genie.close')}
                    />
                </Row>
            );
        },

        renderFooter() {
            let {btnTitle, btnFunc, buttons} = this.state;
            let {footerHeight, id, buttonsBackground} = this.props;

            return (
                <PopupButtons
                    okLabel={btnTitle}
                    okCB={btnFunc}
                    okDisabled={false}
                    okLoading={false}
                    cancelCB={()=>{this.handleClose(id)}}
                    children={buttons}
                    background={buttonsBackground}
                    height={footerHeight}
                />
            );
        },

        renderOpen() {
            let {width}  = (this.state && this.state.width) ? this.state : this.props;
            let {height} = (this.state && this.state.height) ? this.state : this.props;
            let {body} = this.state;
            let {paneColor, background, titleHeight, footerHeight, id} = this.props;

            let bodyHeight = height - titleHeight - footerHeight;

            return (
                <Absolute id={id}>
                    <Center color={paneColor} onClick={()=>{this.handleClose(id)}}>

                        <Column 
                            width={width}
                            height={height}
                            boxShadow={true}
                            color={background}
                            style={this.styles('root')}
                            onClick={(e)=>{e.stopPropagation()}}
                        >
                            {this.renderTitle()}
                            <Column width={width} height={bodyHeight} style={this.styles('bodyStyle')}>
                                {body}
                            </Column>
                            {this.renderFooter()}
                        </Column>

                    </Center>
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
