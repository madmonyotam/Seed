import ReactDOM from 'react-dom';
require('./ripple.css')

module.exports = {
    dependencies: [],    
    get() {
        
        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            componentWillUnmount() {
            },

            propsTypes: {
                text: PropTypes.string,
            },

            getDefaultProps(){
                return {
                    text: core.translate('my first core component'),
                    text: 'my first core component',
                };
            },
            
            getInitialState() {
                return {
                    hover: false,
                    active: false,
                    backgroundColor: 'grey',
                    count:0
                };
            },

            componentDidMount() {
                let { children } = this.props;
                let { innerComponent } = this.state;

                
                let ripple = ReactDOM.findDOMNode(this);
                let backgroundColor = ripple.children[0].style.backgroundColor;
                this.setState({backgroundColor})
            },

            initUnits(){
                this.textColor =  core.theme('colors.dark');
            },

            styles(s){
                let { active, backgroundColor, hover } = this.state;


                const styles = {
                    ripple: {
                        borderRadius: "100%",
                        position: "absolute",
                        opacity: 0,
                        backgroundColor: "#ffffff",
                        animation: "ripple 750ms",
                    },
                    rippleCont: {
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0
                    },
                    wrapper: {
                        position: 'relative',
                        overflow: 'hidden'
                    }
                }
                
                return(styles[s]);
            },

            hoverOn(){
                this.setState({hover:true});
            },

            hoverOff(){
                this.setState({hover:false});
            },

            activeOn(e){
                this.setState({active:true});
                this.showRipple(e);
            },

            activeOff(e){
                this.setState({active:false});
            },

            showRipple(e,active){
                const rippleContainer = e.currentTarget;
                const size = rippleContainer.offsetWidth;
                const pos = rippleContainer.getBoundingClientRect();
                const x = e.pageX - pos.x - (size / 2);
                const y = e.pageY - pos.y - (size / 2);
                 const spanStyles = { ...this.styles('ripple') ,top: y + 'px', left: x + 'px', height: size + 'px', width: size + 'px' };
                 
                const count = this.state.count + 1;
                let sp = {...this.state.spanStyles, [count] : spanStyles}
                this.setState({
                  spanStyles: sp,
                  count: count
                });
            },
            
            renderRippleSpan() {
                const {active,spanStyles = {}} = this.state;
                const spanArray = Object.keys(spanStyles);

                if (spanArray && spanArray.length > 0) {
                  return (
                    spanArray.map((key, index) => {
                      return <span key={'spanCount_' + index} style={{ ...spanStyles[key]}}></span>
                    })
                  )
                } else {
                  return null;
                }
            },

            render() {
                let { children } = this.props

                return (
                    <div style={this.styles('wrapper')} 
                        onMouseDown={this.activeOn} 
                        onMouseUp={this.activeOff} 
                        onMouseEnter={this.hoverOn} 
                        onMouseLeave={this.hoverOff} >

                        { children }
                        <div style={this.styles('rippleCont')}>
                           { this.renderRippleSpan() }
                        </div>


                    </div>
                )
            } 

        }
    }
}
