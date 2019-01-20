
module.exports = {
    name: "SlideOpen",
    description: '',
    propTypes: {
        // name: 'string',
        // title: { type: 'string' },
        // isOpen: false,
        // onChange(){}
    },
    dependencies: [],    
    get() {
        
        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            propTypes: {
                style: PropTypes.object,
                isOpen: PropTypes.bool,
                transition: PropTypes.string,
            },

            getInitialState(){
                var { isOpen } = this.props;
                // this.watcher = core.plugins.widgets.watch(type, id, this.update);
                return {
                    height: isOpen ? 'auto' : 0
                };
            },

            componentDidMount(){
                if(this.props.isOpen){
                    this.setState({
                        height: this.getHeight()
                    });
                }
            },

            componentWillReceiveProps(nextProps){
                if(nextProps.isOpen !== this.props.isOpen){
                    nextProps.isOpen ? this.open() : this.close();
                }
            },

            componentWillUnmout(){
                this.clearTimeout();
                // this.watcher.kill();
            },

            clearTimeout(){
                if(this.heightTimeout){
                    clearTimeout(this.heightTimeout);
                    this.heightTimeout = null;
                }
            },

            getHeight(){
                return (this.content ? (this.content.clientHeight) : 240);
            },

            getDefaultProps(){
                return {
                  isOpen: false
                }
            },

            setHeightAuto(){
                this.setState({
                    height: 'auto'
                });
            },

            setHeightZero(){
                this.setState({
                    height: 0
                });
            },

            open(){
                this.clearTimeout();
                this.setState({
                    isOpen: true,
                    height: this.getHeight()
                });
                this.heightTimeout = setTimeout(this.setHeightAuto, 300);
            },

            close(){
                this.clearTimeout();
                this.setState({
                    isOpen: false,
                    height: this.getHeight()
                });
                this.heightTimeout = setTimeout(this.setHeightZero, 40);
            },

            render(){
                var { isOpen, renderHeader, children, transition = '0.2s ease' } = this.props;
                var { height } = this.state;

                return (
                    <div style={{
                            position: 'relative',
                        }}>
                        <div>
                            { children[0] || null }
                        </div>

                        <div style={{
                                position: 'relative',
                                height: height,
                                MsTransition: transition,
                                OTransition: transition,
                                MozTransition: transition,
                                WebkitTransition: transition,
                                transition: transition,
                                overflowY: 'hidden',
                            }}>

                            <div ref={ el => this.content = el }>
                                { children[1] || null }
                            </div>

                        </div>

                    </div>
                );
            }           
        }
    }
}