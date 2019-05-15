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

        render() {
            let iconColor = (this.state.isHovered) ? tinycolor(this.props.iconColor).darken(7) : this.props.iconColor;

            return (
                <Button
                    variant={this.props.buttonVariant}
                    theme={this.props.buttonTheme}
                    backgroundColor={this.props.background}
                    height={this.props.iconSize}
                    onMouseEnter={ this.handleFocus }
                    onMouseLeave={ this.handleUnfocus }
                    width={this.props.iconSize}
                    onClick={this.props.onClick}
                    style={this.styles('button')}
                >
                    <Icon
                        size={this.props.iconSize}
                        icon={this.props.icon}
                        color={iconColor}
                        style={this.styles('icon')}
                    />
                </Button>
            );
        }
    }
}};