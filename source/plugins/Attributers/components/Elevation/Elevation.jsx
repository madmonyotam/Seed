module.exports = {
dependencies: ['Attributers.Composer'],
get(Composer) {
    const seed = this;
    const { React, PropTypes, ComponentMixin } = seed.imports;

    const units = {
        levelLimit: 20,
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
            return { level: 3, color: units.colors.shadow, decorator: true };
        },

        createElement(child){
            let {level, color} = this.props;

            level = (Math.abs(level) <= units.levelLimit ) ? level : (level / Math.abs(level)) * units.levelLimit;

            let boxShadow = []

            if (level > 0) {
                boxShadow = [
                    `0px 0px 1px ${color}`,
                    `0px 0px 1px ${color}`,
                    `-${level/10}px ${level/10}px ${level}px ${color}`,
                    `-${level/2}px ${level}px ${level }px ${color}`,
                    `${level/2}px ${level}px ${level * 2}px ${color}`,
                ];
            } else if (level < 0) {
                let negLevel = Math.abs(level);
                boxShadow = [
                    `inset 0px 0px 1px ${color}`,
                    `inset 0px 0px 1px ${color}`,
                    `inset -${negLevel/10}px ${negLevel/10}px ${negLevel}px ${color}`,
                    `inset -${negLevel/2}px ${negLevel}px ${negLevel}px ${color}`,
                    `inset ${negLevel/2}px ${negLevel}px ${negLevel * 2}px ${color}`,
                ];
            }
            boxShadow = boxShadow.join(', ');

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