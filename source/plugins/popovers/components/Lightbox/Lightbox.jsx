module.exports = {
    name: "Lightbox",
    description: '',
    dependencies: ['popovers.LightboxTitleBar', 'popovers.LightboxInfo'],    

    get(LightboxTitleBar, LightboxInfo) {
        var core = this;
        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                title:         PropTypes.object,
                info:          PropTypes.object,
                rootStyle:     PropTypes.object,
                innerStyle:    PropTypes.object,
                bodyStyle:     PropTypes.object,
                childrenStyle: PropTypes.object,
            },

            getDefaultProps(){
                return {};
            },

            componentWillReceiveProps(nextProps) {
                let nextData = {};
                if (nextProps.title)         nextData['title']         = nextProps.title;
                if (nextProps.info)          nextData['info']          = nextProps.info;
                if (nextProps.children)      nextData['children']      = nextProps.children;
                if (nextProps.rootStyle)     nextData['rootStyle']     = nextProps.rootStyle;
                if (nextProps.innerStyle)    nextData['innerStyle']    = nextProps.innerStyle;
                if (nextProps.bodyStyle)     nextData['bodyStyle']     = nextProps.bodyStyle;
                if (nextProps.childrenStyle) nextData['childrenStyle'] = nextProps.childrenStyle;
                if (nextProps.showLightbox)  nextData['showLightbox']  = nextProps.showLightbox;
                
                this.setState(nextData);
            },
            
            getInitialState() {
                return {
                    title: <LightboxTitleBar hasInfo={true}/>,
                    info: <LightboxInfo />,
                    children: <div>Lightbox default children</div>,
                    rootStyle: {},
                    innerStyle: {},
                    bodyStyle: {},
                    childrenStyle: {},
                    showLightbox: false,
                };
            },
            
            getInitialState() {
                return {
                    showLightbox: false,
                };
            },

            componentDidMount() {
                core.on('Lightbox.open', this.openLightbox);
                core.on('Lightbox.close', this.closeLightbox);
                document.addEventListener("keydown", this.handleKeyPress);
            },
            
            componentWillUnmount() {
                core.off('Lightbox.open', this.openLightbox);
                core.off('Lightbox.close', this.closeLightbox);
                document.removeEventListener("keydown", this.handleKeyPress);
            },

            styles(s) {
                let {rootStyle, innerStyle, bodyStyle, childrenStyle} = this.state;
                
                let styles = {
                    root: {
                        position: 'absolute',
                        zIndex:  1500,
                        width:  '100%', 
                        height: '100%',
                        background: "#000000bf",
                        overflow: 'hidden',
                        ...rootStyle
                    },
                    inner: {
                        position: 'relative',
                        width: '100%', 
                        height: 'calc(100% - 15px)',
                        overflow: 'hidden',
                        ...innerStyle
                    },
                    bodyStyle: {
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%', 
                        height: '100%',
                        color: core.theme('colors.white'),
                        ...bodyStyle
                    },
                    children: {
                        width: '100%',
                        margin: 15,
                        position: 'relative',
                        ...childrenStyle
                    },
                }
                return(styles[s]);
            },

            handleKeyPress(event) {

                let {showLightbox} = this.state;

                if (!showLightbox) return;

                if (event.keyCode === 27 ) {
                    core.emit('Lightbox.close');
                }

            },

            getTitle(title) {

                if (!title || _.isEmpty(title)) return <LightboxTitleBar hasInfo={true}/>;
                else if (title === 'none') return null;
                else if (title && !_.isEmpty(title) ) {
                    return (
                        <LightboxTitleBar 
                            hasInfo={        title.hasInfo        }
                            title={          title.title          }
                            buttons={        title.buttons        }
                            titleRootStyle={ title.titleRootStyle }
                            toolbarStyle={   title.toolbarStyle   }
                        />
                    );
                }
            },

            getInfo(info) {
                if (!info || _.isEmpty(info)) return (<LightboxInfo />);
                else if (info === 'none') return null; 
                else if (info && !_.isEmpty(info) ) {
                    return (
                        <LightboxInfo 
                            hasTitle={       info.hasTitle       }
                            infoWrapStyle={  info.infoWrapStyle  }
                            infoInnerStyle={ info.infoInnerStyle }
                            infoChildren={   info.infoChildren   }
                        />
                    );
                }
            },

            openLightbox(data) {
                
                let newState = {};
                
                if (!data || _.isEmpty(data)) {
                    newState = {
                        title: <LightboxTitleBar hasInfo={true}/>,
                        info: <LightboxInfo />,
                        children: <div>Lightbox default children</div>,
                        rootStyle: {},
                        innerStyle: {},
                        bodyStyle: {},
                        childrenStyle: {},
                        showLightbox: true,
                    };
                    
                } else {
                    let {lightBody, lightTitle, lightInfo} = data;
                    let { children, rootStyle, innerStyle, bodyStyle, childrenStyle } = lightBody;
                    
                    let title = this.getTitle(lightTitle);
                    let info = this.getInfo(lightInfo);
                    
                    if (!children      || _.isEmpty(children))      children      = this.state.children;
                    if (!rootStyle     || _.isEmpty(rootStyle))     rootStyle     = this.state.rootStyle;
                    if (!innerStyle    || _.isEmpty(innerStyle))    innerStyle    = this.state.innerStyle;
                    if (!bodyStyle     || _.isEmpty(bodyStyle))     bodyStyle     = this.state.bodyStyle;
                    if (!childrenStyle || _.isEmpty(childrenStyle)) childrenStyle = this.state.childrenStyle;

                    newState = { title, info, children, rootStyle, innerStyle, bodyStyle, childrenStyle, showLightbox: true };
                }

                this.setState( newState, ()=>{
                    core.tree.set(['plugins', 'popovers','lightboxOpen'], true);
                } );
            },

            closeLightbox() {
                let emptyState = {
                    title: <LightboxTitleBar hasInfo={true}/>,
                    info: <LightboxInfo hasTitle={true} />,
                    children: <div>Lightbox default children</div>,
                    rootStyle: {},
                    innerStyle: {},
                    bodyStyle: {},
                    childrenStyle: {},
                    showLightbox: false,
                }
                
                this.setState( emptyState, ()=>{
                    core.tree.set(['plugins', 'popovers','lightboxOpen'], false);
                } );
            },
            
            render() {
                let { showLightbox, children, title, info } = this.state;

                if (!showLightbox) return null;

                return (
                    <div id={'Lightbox.root'} style={ this.styles('root') }>
                        <div id={'Lightbox.inner'} style={ this.styles('inner') }>
                            <div id={'Lightbox.title'} >
                                { title }
                            </div>
                            <div id={'Lightbox.body'} style={ this.styles('bodyStyle') } >
                                <div id={'Lightbox.children'} style={ this.styles('children') }>
                                    { children }
                                </div>
                                { info }
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
};