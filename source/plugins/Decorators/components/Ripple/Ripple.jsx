import ReactDOM from 'react-dom';
require('./ripple.css')

module.exports = {
    dependencies: [],    
    get() {
        
        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            propsTypes: {
                color: PropTypes.string,
            },

            getDefaultProps(){
                return {
                    color: "#ffffff",
                    animationSpeed: 750
                };
            },
            
            getInitialState() {
                return {
                    active: false,
                    count:0,
                    spanStyles: {}
                };
            },

            componentDidMount() {
                this.clean = false;
            },

            styles(s){
                let { color, animationSpeed } = this.props;


                const styles = {
                    ripple: {
                        borderRadius: "100%",
                        position: "absolute",
                        opacity: 0,
                        backgroundColor: color,
                        animation: `ripple ${animationSpeed}ms`,
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

            activeOn(e){
                this.clean = Math.random();
                this.setState({active:true});
                this.showRipple(e);
            },

            activeOff(e){
                var clean = this.clean;
                this.setState({active:false});
                setTimeout(() => {
                    if(clean === this.clean){
                        this.setState({spanStyles:{}});
                    }
                }, 2000);
            },

            showRipple(e){
                const rippleContainer = e.currentTarget;
                const wSize = rippleContainer.offsetWidth;
                const hSize = rippleContainer.offsetHeight;
                const size = hSize > wSize ? hSize : wSize;
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
                const {spanStyles} = this.state;
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
                        onMouseUp={this.activeOff}>

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
