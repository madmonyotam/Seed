module.exports = {
dependencies: ['Layouts.Absolute', 'Layouts.Fixed', 'Popovers.PopupHandler', 'Popovers.PopupButtons', 'Layouts.Center', 'Simple.Label',
                'Buttons.IconButton', 'Layouts.Column', 'Layouts.Row'],
get(Absolute, Fixed, PopupHandler, PopupButtons, Center, Label,
    IconButton, Column, Row) {
    var core = this;
    var { React, PropTypes, ComponentMixin, Branch } = core.imports;

    return {
        mixins: [ ComponentMixin, Branch ],

        cursors: {
            popupTree: ['plugins','Popovers','popup'],
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
            isAbsolute: PropTypes.bool
        },

        getDefaultProps() {
            return {
                id: 'mainPopup',
                isAbsolute: true,
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
        },

        componentDidMount() {
            this.eventsHandler('on');
        },

        componentWillUnmount() {
            this.eventsHandler('off');
        },

        styles(propName) {
            let {modalStyle, bodyStyle} = this.state;
            let tHeight = this.handleTitleHeight();
            let fHeight = this.handleFooterHeight();

            let styles = {
                root: {
                    minHeight: units.dims.minBodyHeight + tHeight + fHeight,
                    maxHeight: '100%',
                    ...modalStyle
                },
                title: {
                    minHeight: tHeight,
                    justifyContent:'space-between',
                },
                body: {
                    maxHeight: `calc(100% - ${tHeight + fHeight}px)`,
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
            let {id} = this.props;
            let localHeight = height;

            let tHeight = this.handleTitleHeight();
            let fHeight = this.handleFooterHeight();

            if (typeof localHeight == 'string' && localHeight.indexOf('%') === localHeight.length -1) {
                let screen = document.getElementById(id);
                let percent = Number(localHeight.slice(0,-1));
                let maxHeight = screen.offsetHeight - tHeight - fHeight;
                localHeight = maxHeight * percent/100;
            }

            return localHeight < units.dims.minBodyHeight ? units.dims.minBodyHeight : localHeight;
        },

        handleTitleHeight() {
            let {titleHeight} = this.props;
            return (titleHeight > units.dims.minTitleHeight) ? titleHeight : units.dims.minTitleHeight;
        },

        handleFooterHeight() {
            let {footerHeight} = this.props;
            return (footerHeight > units.dims.minFooterHeight) ? footerHeight : units.dims.minFooterHeight;
        },

        handleWidth() {
            let {width} = this.state;
            return (width > units.dims.minWidth) ? width : units.dims.minWidth;
        },

        renderTitle() {
            let {title} = this.state;
            let {titleColor, titleLabelColor, id} = this.props;

            let tHeight = this.handleTitleHeight();

            return(
                <Row color={titleColor} height={tHeight} style={this.styles('title')}>
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
            let {id, footerBackground} = this.props;

            let fHeight = this.handleFooterHeight();
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
                    height={fHeight}
                />
            );
        },

        renderOpen() {
            let {width, body} = this.state;
            let {isAbsolute, backdropColor, background, id} = this.props;

            let width = this.handleWidth();
            let tHeight = this.handleTitleHeight();
            let fHeight = this.handleFooterHeight();
            let bodyHeight = this.handleBodyHeight()
            let popupHeight = bodyHeight + tHeight + fHeight;

            const stopPropagation = (e) => {
                e.stopPropagation();
            };

            const setClose = (e) => {
                this.setState({allowClose: true});
            }

            const doClose = (e)=>{
                if (!!this.state.allowClose) this.handleClose(id);
            }

            const cancelClose = (e) => {
                stopPropagation(e);
                this.setState({allowClose: false});
            }

            const renderInside = () => {
              return (
                <Center color={backdropColor} onMouseDown={setClose} onMouseUp={doClose}>

                    <Column
                        width={width}
                        height={popupHeight}
                        boxShadow={true}
                        color={background}
                        style={this.styles('root')}
                        onMouseUp={cancelClose} onMouseDown={stopPropagation} onClick={stopPropagation}
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
              )
            }

            if (isAbsolute) return (
                <Absolute id={id}>
                  { renderInside() }
                </Absolute>
            );

            return (
              <Fixed id={id}>
                { renderInside() }
              </Fixed>
            )
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
