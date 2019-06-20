module.exports = {
dependencies: ['Attributers.Composer'],
get(Composer) {
    const seed = this;
    const { React, PropTypes, ComponentMixin } = seed.imports;

    const units = {
        colors: {
            shadow: seed.theme('backgrounds.shadow')
        }
    }

    return {
        mixins: [ ComponentMixin ],

        propsTypes: {
            level: PropTypes.number,
            color: PropTypes.string,
        },

        getDefaultProps() {
            return { level: 0, color: units.colors.shadow, decorator: true };
        },

        createElement(child){
            let {level, color} = this.props;

            let boxShadow = (level > 0) ?
                `${level}px ${level}px ${level * 1.5}px ${color}` :
                `inset ${-level}px ${-level}px ${level * -1.5}px ${color}`;

            if (child.props.style && child.props.style.boxShadow) {
                boxShadow = `${child.props.style.boxShadow}, ${boxShadow}`;
            }

            return React.cloneElement(child, { style: {...child.props.style, boxShadow} });
        },

        render() {
            let {children} = this.props;
            return (
                <Composer createElement={this.createElement}>
                    {children}
                </Composer>
            );
        }
    }
}}