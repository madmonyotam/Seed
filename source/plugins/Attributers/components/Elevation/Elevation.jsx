module.exports = {
dependencies: ['Attributers.Composer'],
get(Composer) {
    const seed = this;
    const { React, PropTypes, ComponentMixin } = seed.imports;

    const units = {
        levelLimit: 7,
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
            let {level} = this.props;

            level = (level <= units.levelLimit ) ? Math.abs(level) : units.levelLimit;
            let {shadow12, shadow14, shadow20} = this.getColors();

            const shadow = {
                1: `0px  1px  1px 0px ${shadow14}, 0px 2px  1px -1px ${shadow12}, 0px  1px  3px  0px ${shadow20}`,
                2: `0px  2px  2px 0px ${shadow14}, 0px 3px  1px -2px ${shadow12}, 0px  1px  5px  0px ${shadow20}`,
                3: `0px  3px  4px 0px ${shadow14}, 0px 3px  3px -2px ${shadow12}, 0px  1px  8px  0px ${shadow20}`,
                4: `0px  4px  5px 0px ${shadow14}, 0px 1px 10px  0px ${shadow12}, 0px  2px  4px -1px ${shadow20}`,
                5: `0px  6px 10px 0px ${shadow14}, 0px 1px 18px  0px ${shadow12}, 0px  3px  5px -1px ${shadow20}`,
                6: `0px  8px 10px 1px ${shadow14}, 0px 3px 14px  2px ${shadow12}, 0px  5px  5px -3px ${shadow20}`,
                7: `0px  9px 12px 1px ${shadow14}, 0px 3px 16px  2px ${shadow12}, 0px  5px  6px -3px ${shadow20}`,
             }

            let boxShadow = shadow[level];

            return React.cloneElement(child, { style: {...child.props.style, boxShadow} });
        },

        getColors() {
            let {color} = this.props;

            let computedColor = this.getHexColor(color)

            let c0 = computedColor.slice(1,3);
            let c1 = computedColor.slice(3,5);
            let c2 = computedColor.slice(5,7);

            return {
                shadow12: `#${c0}${c1}${c2}1f`,
                shadow14: `#${c0}${c1}${c2}24`,
                shadow20: `#${c0}${c1}${c2}33`,
            }
        },

        getHexColor(colorStr) {
            let a = document.createElement('div');
                a.style.color = colorStr;

            let colors = window.getComputedStyle( document.body.appendChild(a) ).color.match(/\d+/g).map( (a) => { return parseInt(a,10); });

            document.body.removeChild(a);

            return (colors.length >= 3) ? '#' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : false;
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