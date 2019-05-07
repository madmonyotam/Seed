import { uniqueId } from 'lodash';
var tinycolor = require("tinycolor2");
window.tinycolor = tinycolor;
module.exports = {
    name: 'Button',
    description: '',
    propTypes: {},
    dependencies: ['Decorators.Ripple' ],
    get(Ripple) {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        var units = {
          text: {
            white: core.theme('colors.white'),
            dark: core.theme('colors.dark')
          },
          theme : { 
            default: core.theme('buttons.default'),
            primary: core.theme('buttons.primary'),
            secondary: core.theme('buttons.secondary'),
          },
          hover: {
            default: tinycolor(core.theme('buttons.default')).darken(10),
            primary: tinycolor(core.theme('buttons.primary')).darken(10),
            secondary: tinycolor(core.theme('buttons.secondary')).darken(10),
          }
        }

        return {
            mixins: [ ComponentMixin ],

            propsTypes: {
              onClick: PropTypes.func,
              style: PropTypes.object,
              ripple: PropTypes.bool,
              round: PropTypes.bool,
              textColor: PropTypes.string,
              backgroundColor: PropTypes.string,
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
                variant: 'outlined',
                theme: 'default',
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
              let { variant , backgroundColor, textColor, style, theme, ripple, round, height, width } = this.props;
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
                  color:tColor

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
                    padding: '5px'
                  }
                }
                return ops 
              }

              let styles = { 
                root: {
                  fontSize: "0.875rem",
                  fontFamily: "Roboto, Helvetica, Arial",
                  fontWeight: 400,
                  lineHeight: 1.5,
                  borderRadius: round ? 4 : 0,
                  height:  Number(height) , 
                  minWidth: Number(width),
                  width: Number(width),
                  letterSpacing: "0.01071em",
                  cursor: 'pointer',
                  transition: 'background 0.15s ease-in-out, color 0.15s ease-in-out, border 0.15s ease-in-out',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: textColor ,
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
                  padding: '5px',
                } 
              }

              const focused = () => {
                if (isOutlined) {
                  return { 
                    backgroundColor : tinycolor(backgroundColor ||  units.theme[theme] ).lighten(100)  ,  
                    borderColor: tinycolor(backgroundColor ||  units.theme[theme] ).darken(10)  
                  }
                } else if (backgroundColor) {
                  return {
                    backgroundColor: tinycolor(backgroundColor).darken()
                  }
                } else return { backgroundColor: units.hover[theme] }
              }

              if (isFocused) {
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
  
              let { ripple, rippleSpeed, children } = this.props;
              if (ripple) {

                return (
                  <Ripple color={ this.state.rippleColor } animationSpeed={ rippleSpeed } wrapperStyle={ this.styles('rippleWrapper') }>                            
                    <div style={ this.styles('label') }>
                      { children }
                    </div>
                  </Ripple>
                )
              }
              return  <div style={ this.styles('label') }>
                        { children }
                      </div>
            },

            onMouseEnter(e){
              this.prevent(e);
              this.setState({ focused: this.state.uniqueName })
            },

            onMouseLeave(e){
              this.prevent(e)
              this.setState({ focused: undefined })
            },

            render() {
              return (
                <div style={ this.styles('root') } onMouseEnter={ this.onMouseEnter } onMouseLeave={ this.onMouseLeave }> 
                  { this.renderButton() } 
                </div>
              )
            }

        }
    }
};
