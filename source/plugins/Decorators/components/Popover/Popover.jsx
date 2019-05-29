var ReactDOM = require('react-dom');

module.exports = {
    dependencies: ['Simple.Icon'],
    get(Icon) {

        var core = this;
        var { React, PropTypes, ComponentMixin } = core.imports;
        const elevationsBoxShadows = {
          1: '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20)',
          2: '0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20)',
          3: '0 3px 4px 0 rgba(0,0,0,0.14), 0 3px 3px -2px rgba(0,0,0,0.12), 0 1px 8px 0 rgba(0,0,0,0.20)',
          4: '0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.20)',
          5: '0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12), 0 3px 5px -1px rgba(0,0,0,0.20)',
          6: '0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.20)',
          7: '0 9px 12px 1px rgba(0,0,0,0.14), 0 3px 16px 2px rgba(0,0,0,0.12), 0 5px 6px -3px rgba(0,0,0,0.20)',
          8: '0 12px 17px 2px rgba(0,0,0,0.14), 0 5px 22px 4px rgba(0,0,0,0.12), 0 7px 8px -4px rgba(0,0,0,0.20)',
          9: '0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px -5px rgba(0,0,0,0.20)',
          10: '0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.20)',
        }
        const units = {
          colors: {
            dark: core.theme('colors.dark'),
            white: core.theme('colors.white')
          }
        }

        return {
            mixins: [ ComponentMixin ],

            propsTypes: {
              position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
              theme: PropTypes.oneOf['dark', 'light'],
              animation: PropTypes.oneOf['slide', 'pop'],
              anchorEl: PropTypes.object, // any DOM event - e.currentTarget
              width: PropTypes.number,
              height: PropTypes.number,
              offsetX: PropTypes.number,
              offsetY: PropTypes.number,
              elevation: PropTypes.oneOf([1,2,3,4,5,6,7,8,9,10]),
              interactive: PropTypes.bool,
              backdrop: PropTypes.bool,
            },

            getDefaultProps(){
              return {
                theme: 'dark',
                position: 'bottom',
                animation: 'pop',
                offsetX: 0,
                offsetY: 0, 
                anchorEl: undefined,
                elevation: 4,
                width: 150,
                height: undefined,
                interactive: false,
                backdrop: false
              };
            },

            getInitialState() {
              return {
                visible: false,
                disableEvents: false,
              };
            },

            componentDidMount() {
              let { anchorEl } = this.props;
              if (anchorEl) this.setState({ anchorEl: anchorEl }, this.handleShow)
            }, 

            componentWillReceiveProps(nextProps) { 
              if (nextProps.anchorEl ) this.setState({ anchorEl: nextProps.anchorEl }, this.handleShow)
              if (nextProps.children != this.props.children || this.props.position !== nextProps.position ) this.calcPosition();
            },

            getAnimation(show){
              let { position, animation } = this.props;
              let isX = position === 'left' || position === 'right';

              const oppo = {
                top: 'bottom',
                bottom: 'top',
                left: 'right',
                right: 'left',
              } 

              let anim = {
                transformOrigin: oppo[position]
              }

              switch (animation) {
                case 'slide':
                  if (isX) {
                    anim.transform = show ? 'translateX(0)' : position === 'right' ? 'translateX(5%)' : 'translateX(-5%)'
                  }
                  else {
                    anim.transform = show ? 'translateY(0)' : position === 'bottom' ? 'translateY(5%)' : 'translateY(-5%)'
                  }
                  break;
              
                default:
                  anim.transform = show ? 'scale(1)' : 'scale(1.1)'
                  break;
              }
              return anim;

            },

            styles(s){
              let { style, theme, width, height, elevation, backdrop  } = this.props;
              let { showTp, visible } = this.state;
              let isDark = theme === 'dark'; 

              const darkStyle = {
                background: 'rgba(4, 4, 4, 1)',
                color: units.colors.white
              };

              const lightStyle = {
                background: 'rgba(255, 255, 255, 1)',
                color: units.colors.dark
              }; 

              let styles = {
                root: {
                  position: visible ? 'fixed' : 'unset',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  background: backdrop && visible ? 'rgba(3, 3, 3, 0.25)' : 'transparent',
                  zIndex: visible ? 100 : -100,
                  ...style
                },
                container: {
                  opacity: showTp ? 1 : 0,
                  transition: `opacity 0.25s linear`,
                  width: 'fit-content',
                  height: 'fit-content',
                  position: 'fixed',
                  zIndex: 1,
                  ...this.measure,
                },
                inner: {
                  height: height || 'auto',
                  width: width || this.defaultWidth || '100%',
                  padding: 15,
                  boxShadow: elevationsBoxShadows[elevation],
                  borderRadius: 3,
                  fontSize: 12,
                  ...this.getAnimation(showTp),
                  // transformOrigin: oppo[position],
                  // transform: showTp ? 'translateY(0)' : 'translateY(5%)',
                  // transform: showTp ? 'scale(1)' : 'scale(1.1)',
                  transition: `transform 0.10s linear 0.05s`,

                  ...isDark ? darkStyle : lightStyle
                },
                icon: {
                  cursor: 'pointer',
                  position: 'absolute',
                  right: 5,
                  top: 5,  
                }
              }

              return(styles[s]);
            },

            calcPosition(){
              let { offsetX, offsetY, width } = this.props;
              let ttNode = ReactDOM.findDOMNode(this.tooltipRef);
              if (!this.anchorEl || !ttNode) return;
              let hoverRect = this.anchorEl.getBoundingClientRect();
              let wWidth =  window.innerWidth;
              let wHeight =  window.innerHeight;
              
              this.measure = {}
              this.defaultWidth = width || hoverRect.width;
              let position = this.position;

              if(ttNode != null) {
                let ttRect = ttNode.getBoundingClientRect();
                let ttWidth = ttRect.width;
                let ttHeight = ttRect.height;

                let hrLeft = hoverRect.left; 
                let ttLeft = hoverRect.left - ttWidth;
                let hrRight = hoverRect.right - ttWidth;
                let hrBottom = hoverRect.bottom;
                let ttTop = hoverRect.top - hoverRect.height - (ttHeight - hoverRect.height);

                const setMeasures = (direction, cb) => {
                    if (direction === 'bottom' || direction === 'top') {
                      if (direction === 'bottom') {
                        if ((hoverRect.bottom + ttRect.height > wHeight )) {
                          this.measure['top'] = ttTop + offsetY;
                        } else this.measure['top'] = hrBottom + offsetY;

                      } else if (direction === 'top') {
                        if ((hoverRect.top - hoverRect.height < 0)) this.measure['top'] = hrBottom - offsetY;
                        else this.measure['top'] = ttTop - offsetY;
                      }

                      if (hrLeft + ttWidth > wWidth) {
                        this.measure['left'] = ttLeft + hoverRect.width;
                      }
                      else if (hrLeft < 0) {
                        this.measure['left'] = ttLeft// hrRight + offsetX;
                      }
                    }

                    if (direction === 'left' || direction === 'right') {
                        if (direction === 'left') {
                          if (hoverRect.left + hoverRect.width - ttWidth < 0)  this.measure['left'] = hrRight + offsetX;
                          else this.measure['left'] = hoverRect.left - ttWidth - offsetX;

                        } else if (direction === 'right') {
                          if ((hoverRect.right + ttRect.width) > wWidth)  this.measure['left'] = ttLeft + offsetX;
                          else this.measure['left'] = hoverRect.right + offsetX ;
                        }
                    }
                    if (cb) cb()
                }
                if (position === 'left' || position === 'right' ) {
                  this.measure['top'] = hoverRect.top + offsetY;
                }
                else if (position === 'bottom' || position === 'top' ) {
                  this.measure['left'] = hrLeft + offsetX;
                }

                setMeasures(position, ()=>{
                  this.setState({ showTp: true })
                });
              }

            },

            handleShow(event){
              let { position, interactive  } = this.props;
              let { anchorEl } = this.state;
              let el = undefined; 
              if (!anchorEl && event) el = event.currentTarget; 
              else if (anchorEl)  el = anchorEl; 

              this.position = position;
              this.anchorEl = el;
              if (el && el !== null) {
                this.setState({ visible: true }, ()=>{
                  this.calcPosition();
                  if (!interactive) document.addEventListener('click', this.handleHide)
                  document.addEventListener('keyup', this.handleKeyUp)
                })
              }
            }, 

            handleKeyUp(e){
              if(e.key === "Escape") this.safeState({ disableEvents: false }, () => { this.handleHide(e) })
            },

            handleHide(e){ 
              if (!e || core.isUndefined(e) || this.state.disableEvents) return;
              let { onClose } = this.props;
              this.safeState({ 
                showTp: false, 
                disableEvents: false, 
                visible: false, 
                anchorEl: undefined, 
              })
              document.removeEventListener('click', this.handleHide)
              document.removeEventListener('keyup', this.handleKeyUp)
              if (onClose) onClose(e) 
            },  

            renderTtContainer(visible){
              let { interactive , theme } = this.props;
              const disable = () => { this.setState({ disableEvents: true }) }
              const enable = () => { this.setState({ disableEvents: false }) }
              if (!visible) return null;
              return (
                <div id={ 'simple_popover-ref_container' } 
                     ref={ ref => { this.tooltipRef = ref } } 
                     onMouseEnter={ interactive ? null : disable } 
                     onMouseLeave={ interactive ? null : enable } 
                     style={ this.styles('container') }>

                  <div id={ 'simple_popover-inner' } style ={ this.styles('inner') } >
                    { interactive ?
                      <Icon
                          size={ 16 }
                          onClick={ this.handleHide }
                          icon={ core.icons('navigate.close') }
                          color={ theme === 'dark' ? units.colors.white : units.colors.dark  }
                          style={this.styles('icon')} /> : null }
                    { this.props.children }
                  </div>

                </div>
              )
            },


            render() {
              let { visible } = this.state;

              let {
                theme,
                children,
                style,
                width,
                height,
                position,
                offsetX,
                offsetY,
                anchorEl,
                elevation,
                interactive,
                backdrop,
                animation,
                ...props } = this.props 

              return (
                  <div  { ...props }
                        id={ 'simple_popover' }
                        style={this.styles('root')}
                        className={'simple_popover'} >

                    { this.renderTtContainer(visible) }

                  </div>
              )
            }

        }
    }
}
