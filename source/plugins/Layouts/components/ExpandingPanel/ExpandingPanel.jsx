module.exports = {
    dependencies: ['Layouts.Column','Layouts.Row'],
    get(Column, Row) {
        
        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            propsTypes: {
                id: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
                uniqOpen: PropTypes.bool,
                uniqGroup: PropTypes.string,
                
                anchor: PropTypes.object,
                anchorHeight: PropTypes.number,
                anchorClickCB: PropTypes.func,
                anchorStyle: PropTypes.object,

                panel: PropTypes.object,
                panelHeight: PropTypes.number,
                autoHeight: PropTypes.bool,
                panelStyle: PropTypes.object,
                
                startOpen: PropTypes.bool,
                transition: PropTypes.number,
                style: PropTypes.object,

            },

            getDefaultProps(){
                return {
                    id: 0,
                    uniqOpen: false,
                    uniqGroup: 'ExpandingPanel',

                    anchor: <Row> default anchor </Row>,
                    anchorClickCB: ()=>{},
                    onClose: ()=>{},
                    anchorHeight: 50,
                    anchorStyle: {},

                    panel: <Column> default panel </Column>,
                    panelHeight: 200,
                    autoHeight: true,
                    panelStyle: {},

                    showMargin: true,
                    startOpen: false,
                    transition: 0.50,
                    style: {},

                };
            },
            
            getInitialState() {
                let { startOpen } = this.props;

                return {
                    isDrawerOpen: startOpen,
                    height: 'fitContent'
                };
            },

            componentDidMount() {
                this.eventHandle( 'on' );
                setTimeout(() => {
                    this.setState({height:this.getMaxHeight()})
                }, 0);
            },

            componentWillUnmount() {
                this.eventHandle( 'off' );
            },

            eventHandle( action ) {
                core[action]('ExpandingPanel:uniqOpen', this.handleUniq);
            },

            getMaxHeight(){
                let { anchorHeight, panelHeight, autoHeight, uniqGroup, id } = this.props;
                let panel = document.getElementById(`panel-${uniqGroup}-${id}`);
                if(autoHeight) return(`calc(${panel.clientHeight}px + ${anchorHeight}px)`);

                return(`calc(${panelHeight}px + ${anchorHeight}px)`)
            },

            styles(s){

                let { transition, style, anchorStyle, panelStyle, showMargin, anchorHeight } = this.props;
                let { isDrawerOpen, height } = this.state;

                let rootMargin = showMargin && isDrawerOpen ? 15 : 0;

                let panelHeightToogle = isDrawerOpen ? height : anchorHeight;
                anchorHeight = anchorHeight < 40 ? 40 : anchorHeight;

                const styles = {
                    root: {
                        maxHeight: panelHeightToogle,
                        minHeight: anchorHeight,    
                        transition: `max-height ${transition}s linear`,
                        overflow: 'hidden',
                        ...style
                    },
                    anchor: {
                        cursor: 'pointer',
                        minHeight: anchorHeight,
                        ...anchorStyle
                    },
                    panel: {
                        width: "100%",
                        overflow: 'auto',
                        ...panelStyle
                    },
                    margin:{
                        marginBottom: rootMargin,
                        marginTop: rootMargin,
                        transition: `margin 0.15s linear`,
                    }
                }

                return(styles[s]);
            },

            handleUniq( { paramId, paramGroup } ) {
                let {id, uniqGroup} = this.props;

                let sameGroup = uniqGroup === paramGroup;
                let otherId = id !== paramId;

                if ( sameGroup && otherId ) this.handleClose();
            },

            handleOpenPanel() {
                let { id, uniqOpen, uniqGroup } = this.props;

                this.setState({isDrawerOpen: true});

                if (uniqOpen) core.emit('ExpandingPanel:uniqOpen', { paramId: id, paramGroup: uniqGroup } )
            },

            handleClose() {
                let { onClose } = this.props;
                this.setState({isDrawerOpen: false},onClose);            
            },

            handleToggle(e) {
                let { id, anchorClickCB } = this.props;
                if ( e ) {
                    e.preventDefault();
                    e.stopPropagation();
                }

                let { isDrawerOpen } = this.state;

                if ( isDrawerOpen ) this.handleClose();
                else this.handleOpenPanel();

                anchorClickCB({id: id, isDrawerOpen: !isDrawerOpen })
            },

            renderPanel() {
                let { panel, panelHeight, autoHeight, id, uniqGroup} = this.props;
                let height = autoHeight ?  'auto' : panelHeight;

                return (
                    <Column id={ `panel-${uniqGroup}-${id}` } height={height} style={ this.styles('panel') } >
                        { panel }
                    </Column>
                )
            },

            renderAnchor() {
                let { anchor, anchorHeight } = this.props;

                return (
                    <Row
                         height={ anchorHeight }   
                         onClick={ this.handleToggle }
                         style={ this.styles('anchor') }
                         padding={0}
                    >
                        { anchor }
                    </Row>
                );
            },

            render() {
                return (
                    <div style={this.styles('margin')}>
                        <Column width={'100%'} height={'auto'} boxShadow={true} style={this.styles('root')}>
                            { this.renderAnchor() }
                            { this.renderPanel() }
                        </Column>
                    </div>
                )
            } 

        }
    }
}
