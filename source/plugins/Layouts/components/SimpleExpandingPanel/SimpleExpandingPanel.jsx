module.exports = {
    name: 'SimpleExpandingPanel',
    dependencies: ['SimpleSwitch.Mixin','Layouts.Column','Layouts.Row'],
    get(Mixin, Column, Row) {
        
        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ],

            propsTypes: {
                id: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
                uniqOpen: PropTypes.bool,
                uniqGroup: PropTypes.string,
                
                anchor: PropTypes.object,
                anchorHeight: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
                anchorClickCB: PropTypes.func,
                anchorStyle: PropTypes.object,

                panel: PropTypes.object,
                panelHeight: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
                panelStyle: PropTypes.object,
                
                startOpen: PropTypes.bool,
                transition: PropTypes.number,
                style: PropTypes.object,

            },

            getDefaultProps(){
                return {
                    id: 0,
                    uniqOpen: false,
                    uniqGroup: 'SimpleExpandingPanel',

                    anchor: <Row> default anchor </Row>,
                    anchorClickCB: ()=>{},
                    onClose: ()=>{},
                    anchorHeight: 50,
                    anchorStyle: {},

                    panel: <Column> default panel </Column>,
                    panelHeight: 400,
                    panelStyle: {},

                    showMargin: true,
                    startOpen: false,
                    transition: 0.25,
                    style: {},

                };
            },
            
            getInitialState() {
                let { startOpen } = this.props;

                return {
                    isDrawerOpen: startOpen
                };
            },

            componentWillMount () {
                this.initUnits();
            },

            componentDidMount() {
                this.eventHandle( 'on' );
            },

            componentWillUnmount() {
                this.eventHandle( 'off' );
            },

            componentWillReceiveProps (nextProps) {
            },

            eventHandle( action ) {
                core[action]('SimpleExpandingPanel:uniqOpen', this.handleUniq);
            },

            initUnits(){

                this.colors = {
                    white: core.theme('colors.white'),
                    border: core.theme('colors.dark')
                };

                this.dim = {
                    minWidth: core.dim('layouts.minRowWidth')
                }
            },

            styles(s){

                let { transition, style, anchorStyle, panelStyle, showMargin, anchorHeight, panelHeight } = this.props;
                let { isDrawerOpen } = this.state;

                let rootBottomMargin = showMargin && isDrawerOpen ? 15 : 0;
                let panelHeightToogle = isDrawerOpen ? panelHeight : 0;
                anchorHeight = anchorHeight < this.dim.minWidth ? this.dim.minWidth : anchorHeight;
                let height = panelHeightToogle === 0 ? anchorHeight : anchorHeight+panelHeight;

                const styles = {
                    root: {
                        height: height,
                        maxHeight: anchorHeight+panelHeight,
                        minHeight: anchorHeight,
                        marginBottom: rootBottomMargin,
                        transition: `height ${transition}s linear`,
                        ...style
                    },
                    anchor: {
                        cursor: 'pointer',
                        minHeight: anchorHeight,
                        ...anchorStyle
                    },
                    panel: {
                        width: "100%",
                        transition: `height ${transition}s linear`,
                        ...panelStyle
                    },
                }

                return(styles[s]);
            },

            handleUniq( { paramId, paramGroup } ) {
                let {id, uniqGroup} = this.props;

                let sameGroup = uniqGroup === paramGroup;
                let otherId = id !== paramId;
                console.log(id,paramId);

                if ( sameGroup && otherId ) this.handleClose();
            },

            handleOpenPanel() {
                let { id, uniqOpen, uniqGroup } = this.props;

                this.setState({isDrawerOpen: true});

                if (uniqOpen) core.emit('SimpleExpandingPanel:uniqOpen', { paramId: id, paramGroup: uniqGroup } )
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
                let { isDrawerOpen } = this.state;
                let { panel, panelHeight } = this.props;
                let height = panelHeight === 0 ? '100%' : panelHeight;
                let panelHeightToogle = isDrawerOpen ? height : 0;


                return (
                    <Column height={panelHeightToogle} style={ this.styles('panel') } >
                        { panel }
                    </Column>
                );
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
                    <Column width={'100%'} boxShadow={true} style={this.styles('root')}>
                        { this.renderAnchor() }
                        { this.renderPanel() }
                    </Column>
                )
            } 

        }
    }
}
