module.exports = {
    dependencies: ['SimpleSwitch.Mixin'],    
    get(Mixin) {
        
        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ],

            componentWillUnmount() {
            },


            propsTypes: {
                drawerId: PropTypes.string.isRequired,
                size: PropTypes.number,   // the height/width of the drawer
                offset: PropTypes.number, // the length that the drawer opens from
                openFrom: PropTypes.string, // top/right/bottom/left - direction the drawer open fromd
                transition: PropTypes.number,
                initialSize: PropTypes.number,
            },

            getDefaultProps(){
                return {
                    size: 50,
                    offset: 0,
                    openFrom: 'top',
                    transition: 0.25,
                    initialSize: 0,
                };
            },
            
            getInitialState() {
                return {
                    isDrawerOpen: false,
                };
            },

            componentWillMount () {
                this.initUnits();
            },

            componentDidMount() {
                core.on('openSimpleDrawer',this.openSimpleDrawer)
                core.on('closeSimpleDrawer',this.closeSimpleDrawer)
            },

            componentWillUnmount () {
                core.off('openSimpleDrawer',this.openSimpleDrawer)
                core.off('closeSimpleDrawer',this.closeSimpleDrawer)
            },

            initUnits(){
            },

            styles(s){
                let {style} = this.props;
                let styleFromProperties = this.calcProps();

                const styles = {
                    root: {
                        position: "absolute",
                        background: "#ecf4fd",
                        zIndex: core.dim('blackBar.zIndex'),
                        overflow: 'hidden',
                        ...style,
                        ...styleFromProperties
                    },
                
                }
                
                return(styles[s]);
            },

            calcProps(){
                let { offset, size, openFrom, transition, initialSize} = this.props;
                let {isDrawerOpen} = this.state;

                switch (openFrom) {
                    case 'top':
                        return {
                            height: isDrawerOpen? size : initialSize,
                            top: offset,
                            width: '100%',
                             transition: `height ${transition}s linear`,
                        }
                    case 'bottom':
                        return {
                            height: isDrawerOpen? size : initialSize,
                            bottom: offset,
                            width: '100%',
                             transition: `height ${transition}s linear`,
                        }
                    case 'right':
                        return {
                            width: isDrawerOpen? size : initialSize,
                            right: offset,
                            height: '100%',
                            transition: `width ${transition}s linear`,
                        }
                    case 'left':
                        return {
                            width: isDrawerOpen? size : initialSize,
                            left: offset,
                            height: '100%',
                            transition: `width ${transition}s linear`,
                        }
                }

            },

            openSimpleDrawer({id}){
                let {drawerId} = this.props;
                let {isDrawerOpen} = this.state;

                if(drawerId===id && !isDrawerOpen){
                    this.setState({isDrawerOpen: true})
                }

            },

            closeSimpleDrawer({id}){
                let {drawerId} = this.props;
                let {isDrawerOpen} = this.state;

                if(drawerId===id && isDrawerOpen){
                    this.setState({isDrawerOpen: false})
                }
            },

            render() {
                let {children} = this.props;

                return (
                    <div style={this.styles('root')}>
                        {children}
                    </div>
                )
            } 

        }
    }
}