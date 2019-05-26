import { uniqueId } from 'lodash';
var tinycolor = require('tinycolor2');
window.tinycolor = tinycolor;

const colorTheme =  { 
  default: '#D8D8D8',
  primary: '#6B7ADD',
  secondary: '#DD6A6A',
}

module.exports = {
    name: 'Button',
    description: '',
    propTypes: {},
    dependencies: ['Decorators.Ripple', 'Simple.Loader' ],
    get(Ripple, Loader) {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        var units = {
          text: {
            white: core.theme('colors.white'),
            dark: core.theme('colors.dark')
          },
          theme : colorTheme,
          hover: {
            default: tinycolor( colorTheme.default ).darken(7),
            primary: tinycolor( colorTheme.primary ).darken(7),
            secondary: tinycolor( colorTheme.secondary ).darken(7),
          }
        }

        return {
            mixins: [ ComponentMixin ],

            propsTypes: {
              onClick: PropTypes.func,
              style: PropTypes.object,
              ripple: PropTypes.bool,
              round: PropTypes.bool,
              active: PropTypes.bool,
              textColor: PropTypes.string,
              backgroundColor: PropTypes.string,
              onMouseEnter: PropTypes.func,
              padding: PropTypes.number,
              isLoading: PropTypes.bool,
              onMouseLeave: PropTypes.func,
              disabled: PropTypes.bool,
              width: PropTypes.oneOf([ 
                PropTypes.string, // '70px'
                PropTypes.number // 70
              ]),
              height: PropTypes.oneOf([ 
                PropTypes.string, // '32px'
                PropTypes.number // 32
              ]),
              variant: PropTypes.oneOf([ 'raised', 'outlined', 'flat' ]),
              theme: PropTypes.oneOf([ 'default', 'primary', 'secondary' ])
            },

            getDefaultProps(){
              return {
                onClick: (event) => { /* do something with the event  */ },
                style: {},
                ripple: true,
                round: true,
                active: false,
                disabled: false,
                variant: 'outlined',
                theme: 'default',
                padding: 5,
                isLoading: false,
                onMouseEnter: ()=>{},
                onMouseLeave: ()=>{},
                textColor: undefined,
                width: 70,
                height: 32
              };
            },

            getInitialState() {
              return {
                rippleColor: undefined,
                uniqueName: uniqueId('button_')
              };
            },

            componentDidMount() {
              this.setRippleColor(this.props)
            },

            componentWillReceiveProps(nextProps) {
              if (nextProps !== this.props) this.setRippleColor(nextProps)
            },

            componentWillMount() {
                // this.initialUnits();
            },  

            setRippleColor({ variant, theme, backgroundColor }){
              let isOutlined = variant === 'outlined';
              let color = tinycolor(backgroundColor ||  units.theme[theme] ) 
              
              if ( color.darken(20).isDark() ) {
                this.setState({ rippleColor: isOutlined ? color.lighten(20) : color.lighten(60) })
              } else {
                this.setState({ rippleColor: color.darken(20) })
              }
            },

            getIsFocused(){
              return this.state.focused === this.state.uniqueName;
            }, 


            styles(s) {
              let { variant, active, backgroundColor, textColor, style, theme, ripple, round, height, width, padding, disabled } = this.props;
              let isFocused = this.getIsFocused();

              let isOutlined = variant === 'outlined';
              let isRaised = variant === 'raised';

              let tColor, color = tinycolor(backgroundColor ||  units.theme[theme] );
              if (textColor) tColor = textColor;
              else if (isOutlined || color.darken(10).isLight() ) tColor = units.text.dark;
              else tColor = units.text.white ;

              const getStyle = () => {
                let ops = {
                  backgroundColor: backgroundColor ? backgroundColor : units.theme[theme],
                  color: tColor
                }
                if (isOutlined) {
                  ops = {
                    ...ops, 
                    borderStyle:'solid',
                    borderWidth: 1,
                    borderColor: tinycolor(backgroundColor ||  units.theme[theme] ),
                    backgroundColor: 'transparent' 
                  }
                } 
                if (isRaised) {
                  ops = {
                    ...ops, 
                    boxShadow: `0px 1px 5px 0px rgba(0,0,0,0.2), 
                                0px 2px 2px 0px rgba(0,0,0,0.14), 
                                0px 3px 1px -2px rgba(0,0,0,0.12)`
                  }
                } 

                if (!ripple) {
                  ops = {
                    ...ops,
                    padding: padding,
                  }
                }
                return ops 
              }

              const getRippleMargin = () => {
                if (style) {
                  let set, fixedStyle;
                  if (style.hasOwnProperty('padding') && seed.isString(style.padding)) {
                    set = (style.padding.includes(' ')) ? style.padding.split(' ') : style.padding;
                    for (let i = 0; i < set.length; i++) {
                      set[i] = `-${set[i]}`
                    }
                    return { margin: set.join(' '), padding: style.padding }
                  }

                  else if (style.hasOwnProperty('paddingLeft')) {
                    fixedStyle = { marginLeft: `-${style.paddingLeft}`, paddingLeft: style.paddingLeft }
                  }
                  else if (style.hasOwnProperty('paddingRight')) {
                    fixedStyle = { ...fixedStyle, marginLeft: `-${style.paddingRight}`, paddingRight: style.paddingRight }
                  }
                  return fixedStyle;
                }
              }

              let styles = { 
                root: {
                  fontSize: 14,
                  fontFamily: 'Roboto, Helvetica, Arial',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  borderRadius: round ? 4 : 0,
                  height: height,
                  minWidth: width,
                  letterSpacing: '.025em',
                  cursor: disabled ? 'default' : 'pointer',
                  transition: 'background 0.15s ease-in-out, color 0.15s ease-in-out, border 0.15s ease-in-out',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: textColor,
                  ...getStyle(),
                  ...style
                },
                rippleWrapper:{
                  width: '-webkit-fill-available', 
                  height: '-webkit-fill-available',
                  display: 'inherit',
                  alignItems: 'inherit',
                  justifyContent: 'inherit',
                  borderRadius: 'inherit',
                  ...getRippleMargin()
                },
                label: { 
                  display: 'inherit',
                  alignItems: 'inherit',
                  justifyContent: 'inherit',
                  padding: padding,
                  /** not selectable text */
                  WebkitTouchCallout: "none", /* iOS Safari */
                  WebkitUserSelect: "none", /* Safari */
                  KhtmlUserSelect: "none", /* Konqueror HTML */
                  MozUserSelect: "none", /* Firefox */
                  MsUserSelect: "none", /* Internet Explorer/Edge */
                  userSelect: "none",/* Non-prefixed version, currently supported by Chrome and Opera */
                }
              }

              const focused = () => {
                if (isOutlined) {
                  return { 
                    backgroundColor : tinycolor(backgroundColor ||  units.theme[theme] ).lighten(100)  ,  
                    borderColor: tinycolor(backgroundColor ||  units.theme[theme] ).darken(15)  
                  }
                } else if (backgroundColor) {
                  return {
                    backgroundColor: tinycolor(backgroundColor).darken()
                  }
                } else return { backgroundColor: units.hover[theme] }
              }

              if (isFocused && !active && !disabled) {
                styles.root = {
                  ...styles.root,
                  ...focused() 
                }  
              }
             

              return(styles[s]);
            },

            prevent(e){
              if (e.preventDefault) e.preventDefault();
              if (e.stopPropagation) e.stopPropagation();
            },

            handleOnClick(e) { 
                if (this.props.onClick) {
                  this.props.onClick(e)
                }
            },

            renderButton( ){ 
              let { ripple, rippleSpeed, children, isLoading, width, height, textColor } = this.props;
              let loadersize = width > height ? height : width;
                  loadersize = loadersize * 0.7;

              let kids = isLoading ? <Loader size={loadersize} color={textColor}/> : children;

              if (ripple) {

                return (
                  <Ripple color={ this.state.rippleColor } animationSpeed={ rippleSpeed } wrapperStyle={ this.styles('rippleWrapper') }>
                    <div style={ this.styles('label') }>
                      { kids }
                    </div>
                  </Ripple>
                )
              }
              return  <div style={ this.styles('label') }>
                        { kids }
                      </div>
            },

            onMouseEnter(e){
              this.setState({ focused: this.state.uniqueName });
              if (this.props.onMouseEnter) this.props.onMouseEnter(e);
              this.prevent(e);
            },

            onMouseLeave(e){
              this.setState({ focused: undefined });
              if (this.props.onMouseLeave) this.props.onMouseLeave(e);
              this.prevent(e)
            },

            render() {
              let { title, disabled } = this.props;
              let click = disabled ? ()=>{} : this.handleOnClick;

              return (
                <div style={ this.styles('root') } onMouseEnter={ this.onMouseEnter } onMouseLeave={ this.onMouseLeave } onClick={ click } title={title}> 
                  { this.renderButton() } 
                </div>
              )
            }

        }
    }
};
