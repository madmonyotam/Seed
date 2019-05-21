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
            buttonVariant: PropTypes.oneOf(['outlined', 'reised', 'flat']),
            buttonTheme: PropTypes.oneOf(['default', 'primary', 'secondary']),
            onClick: PropTypes.func,
            style: PropTypes.object,
            iconStyle: PropTypes.object,
        },

        getDefaultProps() {
            return {
                iconSize: 24,
                iconColor: core.theme('texts.default'),
                icon: core.icons('general.info'),
                background: undefined,
                buttonVariant: 'flat',
                buttonTheme: 'default',
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
            if (this.props.children) {
                return this.props.children;
            }
            let iconColor = (this.state.isHovered) ? tinycolor(this.props.iconColor).darken(7) : this.props.iconColor;
            return (
                <Icon
                    size={this.props.iconSize}
                    icon={this.props.icon}
                    color={iconColor}
                    style={this.styles('icon')}
                />
            );
        },

        render() {

            return (
                <Button
                    variant={this.props.buttonVariant}
                    theme={this.props.buttonTheme}
                    backgroundColor={this.props.background}
                    onMouseEnter={ this.handleFocus }
                    onMouseLeave={ this.handleUnfocus }
                    padding={1}
                    width={this.props.iconSize}
                    height={this.props.iconSize}
                    onClick={this.props.onClick}
                    style={this.styles('button')}
                >
                    {this.renderIcon()}
                </Button>
            );
        }
    }
}};