module.exports = {
dependencies: ['Layouts.Absolute', 'popovers.PopupHandler', 'popovers.PopupButtons', 'Layouts.Center', 'Simple.Label',
                'Inputs.IconButton', 'Layouts.Column', 'Layouts.Row'],
get(Absolute, PopupHandler, PopupButtons, Center, Label,
    IconButton, Column, Row) {
    var core = this;
    var { React, PropTypes, ComponentMixin, Branch } = core.imports;

    return {
        mixins: [ ComponentMixin, Branch ],

        cursors: {
            popupTree: ['plugins','popovers','popup'],
        },

        propsTypes: {
            id: PropTypes.string,
            titleHeight: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
            footerHeight: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
            width: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
            height: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
            titleLabelColor: PropTypes.string,
            titleColor: PropTypes.string,
            backdropColor: PropTypes.string,
            background: PropTypes.string,
            footerBackground: PropTypes.string,
        },

        getDefaultProps() {
            return {
                id: 'mainPopup',
                width: 700,
                height: 400,
                titleHeight: 50,
                footerHeight: 50,
                titleLabelColor: core.theme('texts.popupTitle'),
                titleColor: core.theme('backgrounds.primary'),
                backdropColor: core.theme('backgrounds.popupPane'),
                background: core.theme('backgrounds.default'),
                footerBackground: core.theme('backgrounds.default'),
            };
        },

        getInitialState() {
            return {
                open: false,
                width: this.props.width,
                height: this.props.height,
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

        initUnits(){
            this.dims = {
                minHeight: 50,
            };
            this.colors = {};
            this.backgrounds = {};
            this.icons = {};
        },

        styles(propName) {
            let {titleHeight, footerHeight} = this.props;
            let {modalStyle, bodyStyle} = this.state;

            let styles = {
                root: {
                    minHeight: 50 + titleHeight + footerHeight,
                    maxHeight: '100%',
                    ...modalStyle
                },
                title: {
                    minHeight: titleHeight,
                    justifyContent:'space-between',
                },
                body: {
                    maxHeight: `calc(100% - ${titleHeight + footerHeight}px)`,
                    ...bodyStyle,
                },
            };
            return styles[propName]
        },

        eventsHandler(action) {
            core[action]('Popup', this.handleClickOpen);
            core[action]('PopupClose',this.handleClose);
        },

        handleClickOpen(params) {
            if(!params) {
                this.setState({ open: true });
                return
            }

            let {id} = this.props;
            let {title, body, bodyStyle, btnTitle, btnFunc, showButtons, buttons, modalStyle, width, height } = params;

            if (params.id && params.id !== id) {
                this.setState({ open: false });
            } else {
                this.setState((state, props)=>{
                    state = {
                        ...state,
                        title: title,
                        body: body,
                        bodyStyle: bodyStyle,
                        btnTitle: btnTitle,
                        btnFunc: btnFunc,
                        showButtons: showButtons,
                        buttons: buttons,
                        modalStyle: modalStyle,
                        open: true
                    };
                    state.width = (!!width) ? width : props.width;
                    state.height = (!!height) ? height : props.height;

                    return state;
                });
            }
        },

        handleClose(paramsId) {
            let {id} = this.props;
            if (id === paramsId) {
                PopupHandler.clearData(id);
                this.setState({ open: false, isLoading: false });
            }
        },

        handleBodyHeight() {
            let {height} = this.state;
            let {titleHeight, footerHeight, id} = this.props;
            let localHeight = height;

            if (typeof localHeight == 'string' && localHeight.indexOf('%') === localHeight.length -1) {
                let screen = document.getElementById(id);
                let percent = Number(localHeight.slice(0,-1));
                let maxHeight = screen.offsetHeight - titleHeight - footerHeight;
                localHeight = maxHeight * percent/100;
            }

            return localHeight < this.dims.minHeight ? this.dims.minHeight : localHeight;
        },

        renderTitle() {
            let {title} = this.state;
            let {titleColor, titleLabelColor, titleHeight, id} = this.props;

            return(
                <Row color={titleColor} height={titleHeight} style={this.styles('title')}>
                    <Label label={title} color={titleLabelColor} transform={'uppercase'}/>
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
            let {btnTitle, btnFunc, buttons, popupTree} = this.state;
            let {footerHeight, id, footerBackground} = this.props;

            let disabledOk = (popupTree && popupTree[id]) ? popupTree[id].disabled : true;
            let isLoading = (popupTree && popupTree[id]) ? popupTree[id].isLoading : false;

            return (
                <PopupButtons
                    okLabel={btnTitle}
                    okCB={btnFunc}
                    okDisabled={disabledOk}
                    okLoading={isLoading}
                    cancelCB={()=>{this.handleClose(id)}}
                    children={buttons}
                    background={footerBackground}
                    height={footerHeight}
                />
            );
        },

        renderOpen() {
            let {width, body} = this.state;
            let {backdropColor, background, titleHeight, footerHeight, id} = this.props;

            let bodyHeight = this.handleBodyHeight()
            let popupHeight = bodyHeight + titleHeight + footerHeight;

            return (
                <Absolute id={id}>
                    <Center color={backdropColor} onClick={()=>{this.handleClose(id)}}>

                        <Column 
                            width={width}
                            height={popupHeight}
                            boxShadow={true}
                            color={background}
                            style={this.styles('root')}
                            onClick={(e)=>{e.stopPropagation()}}
                        >
                            {this.renderTitle()}
                            <Column width={width} 
                                height={bodyHeight}
                                style={this.styles('bodyStyle')}>
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
