var ReactDOM = require('react-dom');

module.exports = {
    dependencies: [],    
    get() {
        
        var core = this;
        var { React, PropTypes, ComponentMixin } = core.imports;

        const units = {
          boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0,0.12)',
          colors: {
            dark: core.theme('colors.dark'),
            white: core.theme('colors.white')
          }
        }

        return {
            mixins: [ ComponentMixin ],

            propsTypes: {
              position: PropTypes.oneOf(['top', 'top-right', 'top-left', 'bottom', 'bottom-right', 'bottom-left', 'left', 'right']),
              theme: PropTypes.oneOf['dark', 'light'],
              delay: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
              ]),
              content: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.object,
                PropTypes.func,
              ])
            },

            getDefaultProps(){
              return {
                theme: 'dark',
                position: 'bottom',
                content: 'tooltip content',
                delay: 250
              };
            },
            
            getInitialState() {
              return {
                visible: false,
                position: '',
                content: '',  
              };
            },

            componentDidMount() { 
              this.setState({ 
                content: this.props.content,
                position: this.props.position 
              }) 

            }, 

            componentWillReceiveProps(nextProps) {
              if (nextProps.position != this.props.position) {
                this.setState({ position: nextProps.position }) 
              }
              if (nextProps.content != this.props.content) {
                this.setState({ content: nextProps.content }, this.calcPosition); 
              }
            }, 

            styles(s){
              let { style, theme, delay } = this.props;
              let { showTp } = this.state;
              let isDark = theme === 'dark';
              let darkStyle = {
                background: 'rgba(4, 4, 4, 0.85)',
                color: units.colors.white
              };
              let lightStyle = {
                background: 'rgba(255, 255, 255, 0.9)',
                color: units.colors.dark
              };

              const styles = { 
                root: { 
                  position: 'relative',
                  ...style ,
                },
                container: { 
                  // ...position.container,  
                  opacity: showTp ? 1 : 0, 
                  transition: `opacity ${delay}ms linear`, 
                  width: 'fit-content', 
                  height: 'fit-content', 
                  position: 'fixed',
                  zIndex: 1,
                  ...this.measure,
                  // ...getPosition()
                },
                inner: {
                  height: 'auto', 
                  // background: 'rgba(4, 4, 4, 0.85)',
                  padding: 5,
                  boxShadow: units.boxShadow,
                  borderRadius: 3,
                  // color: "#fff",
                  fontSize: 12,    
                  ...isDark ? darkStyle : lightStyle 
                  // ...position.inner 
                }
              }
                
              return(styles[s]);
            },

            calcPosition(){
            
              let ttNode = ReactDOM.findDOMNode(this.tooltipRef);
              if (!this.hoverEl || !ttNode) return;
              let hoverRect = this.hoverEl.getBoundingClientRect();
              let wWidth =  window.innerWidth;
              let wHeight =  window.innerHeight;
              
              this.measure = {}
              let position = this.position;
              
              if(ttNode != null) {
                let ttRect = ttNode.getBoundingClientRect(); 
                let ttWidth = ttRect.width;
                let ttHeight = ttRect.height;
                
                let middleX = (hoverRect.left + hoverRect.width / 2) - (ttWidth / 2);
                let middleY = (hoverRect.top + hoverRect.height / 2) - (ttHeight / 2);

                let ttLeft = hoverRect.left - ttWidth;
                let ttRight = hoverRect.right;
                let ttBottom = hoverRect.bottom;
                let ttTop = hoverRect.top - hoverRect.height - (ttHeight - hoverRect.height);

                const setMeasures = (direction, cb) => {
                    if (direction === 'bottom' || direction === 'top') {
                      if (direction === 'bottom') {
                        if ((hoverRect.bottom + ttRect.height > wHeight )) { 
                          this.measure['top'] = ttTop;
                        } else this.measure['top'] = ttBottom;

                      } else if (direction === 'top') {
                        if ((hoverRect.top - hoverRect.height < 0)) this.measure['top'] = ttBottom;
                        else this.measure['top'] = ttTop;
                      } 

                      if (middleX + ttWidth > wWidth) this.measure['left'] = ttLeft;
                      else if (middleX < 0) this.measure['left'] = ttRight;
                    }

                    if (direction === 'left' || direction === 'right') {
                        if (direction === 'left') { 
                          if (hoverRect.left + hoverRect.width - ttWidth < 0) this.measure['left'] = ttRight;
                          else this.measure['left'] = ttLeft;
                        } else if (direction === 'right') {
                          if ((hoverRect.right + ttRect.width) > wWidth) this.measure['left'] = ttLeft;
                          else this.measure['left'] = ttRight;
                        }
                    }
                    if (cb) cb()
                } 

                let split = position.split('-');
                let firstPosition = split[0];
                let lastPosition = split[1]; 

                if (!lastPosition){ 
                  if (firstPosition === 'left' || firstPosition === 'right' ) {
                    this.measure['top'] = middleY;
                  }
                  else if (firstPosition === 'bottom' || firstPosition === 'top' ) {
                    this.measure['left'] = middleX;
                  }

                  setMeasures(firstPosition);
                }

                else setMeasures(firstPosition, ()=>{
                  setMeasures(lastPosition)
                })
                   
                this.setState({ showTp: true });
                    
              }

            }, 

            isInView(elem) {  
              if (!(elem instanceof Element)) throw Error('DomUtil: elem is not an element.');
              // const style = window.getComputedStyle(elem);
             
              // if (style.display === 'none'){ 
              //   return false;
              // }
              // if (style.visibility !== 'visible'){ 
              //   return false;
              // }
              // if (style.opacity < 0.1){ 
                
              //   return false;
              // }
              if (elem.offsetWidth + elem.offsetHeight + elem.getBoundingClientRect().height + elem.getBoundingClientRect().width === 0) {
                return false;
              }

              const elemCenter = {
                x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
                y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
              };

              if (elemCenter.x < 0) {
                return false;
              }
              if (elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)) {
                return false;
              }
              if (elemCenter.y < 0) {
                return false;
              }
              if (elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)) {
                return false;
              }
              
              let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
              
              do {
                if (pointContainer === elem) return true;
              } while (pointContainer = pointContainer.parentNode);
              
              return false
            },
            
            handleShow(event){
              let el = event.currentTarget;
              let { position } = this.props;
              this.position = position;
              this.hoverEl = el;
              if (el && el !== null) {
                el.addEventListener('mouseleave', this.handleHide)
                this.setState({ visible: true }, ()=>{
                  this.calcPosition();
                })
              }
            },

            handleHide(e){
              this.setState({ visible: false, showTp: false })
            },

            renderTtContainer(visible){
              if (!visible) return null;
              return (
                <div ref={ ref => { this.tooltipRef = ref } } className={ this.state.position } style={ this.styles('container') }>
                  <div style ={ this.styles('inner') }>
                    { this.state.content }
                  </div>
                </div>
              )
            },


            render() {
              let { content, theme, children, style, delay, position, ...props } = this.props
              let { visible } = this.state;

              return (
                  <div  { ...props } 
                        style={this.styles('root')} 
                        className={'simple_tooltip'}
                        onMouseEnter={ this.handleShow } >

                    { children }

                    { this.renderTtContainer(visible) } 

                  </div>
              )
            } 

        }
    }
}
