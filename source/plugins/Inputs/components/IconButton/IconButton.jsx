import tinycolor from 'tinycolor2';

module.exports = {
dependencies: ['Simple.Icon', 'Inputs.Button'],
get(Icon, Button) {

    var core = this;
    var { React, PropTypes, ComponentMixin } = core.imports;
    const SET = true, UNSET = false;

    return {
        mixins: [ ComponentMixin ],

        propsTypes: {
            icon: PropTypes.string,
            iconSize: PropTypes.number,
            iconColor: PropTypes.string,
            background: PropTypes.string,
            variant: PropTypes.oneOf(['outlined', 'reised', 'flat']),
            theme: PropTypes.oneOf(['default', 'primary', 'secondary']),
            onClick: PropTypes.func,
            style: PropTypes.object,
            iconStyle: PropTypes.object,
        },

        getDefaultProps() {
            return {
                iconSize: 24,
                iconColor: core.theme('texts.default'),
                icon: core.icons('general.info'),
                background: core.theme('backgrounds.default'),
                variant: 'flat',
                theme: 'default',
                onClick: ()=>{},
                style: {},
                iconStyle: {},
            }
        },

        getInitialState() {
            return {
                isHovered: false,
            };
        },

        styles(s) {
            let styles = {
                button: {
                    borderRadius: this.props.iconSize,
                    minHeight: this.props.iconSize,
                    minWidth: this.props.iconSize,
                    maxHeight: this.props.iconSize,
                    maxWidth: this.props.iconSize,
                    ...this.props.style,
                },
                icon: {
                    ...this.props.iconStyle
                },
            }

            return(styles[s]);
        },

        handleSetFocus(hovered){
            this.setState({isHovered: hovered});
        },

        handleFocus(e) {
            this.handleSetFocus(SET);
        },

        handleUnfocus(e) {
            this.handleSetFocus(UNSET);
        },

        renderIcon() {
          let { children, iconSize, icon, iconColor } = this.props;
          let { isHovered } = this.state;

          if (children) return children;
          let color = (isHovered) ? tinycolor(iconColor).darken(7) : iconColor;
          return (
              <Icon
                  size={ iconSize }
                  icon={ icon }
                  color={ color }
                  style={this.styles('icon')}
              />
          );
        },

        render() {
          let { variant, theme, background, iconSize, onClick } = this.props;
            return (
                <Button
                    variant={ variant }
                    theme={ theme }
                    backgroundColor={ background }
                    onMouseEnter={ this.handleFocus }
                    onMouseLeave={ this.handleUnfocus }
                    width={ iconSize }
                    height={ iconSize }
                    padding={ 0 }
                    onClick={ onClick }
                    style={this.styles('button')} >

                  { this.renderIcon() }

                </Button>
            );
        }
    }
}};