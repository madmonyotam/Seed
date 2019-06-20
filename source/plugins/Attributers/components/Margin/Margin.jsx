module.exports = {
dependencies: ['Attributers.Composer'],
get(Composer) {
    const seed = this;
    const { React, PropTypes, ComponentMixin } = seed.imports;

    return {
        mixins: [ ComponentMixin ],

        propsTypes: {
            all: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            top: PropTypes.number,
            right: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
        },

        getDefaultProps() {
            return { all: undefined, top: 0, right: 0, bottom: 0, left: 0, decorator: true };
        },

        createElement(child){
            let {all, top, right, bottom, left} = this.props;
            let margin = (!!all) ? all : `${top}px ${right}px ${bottom}px ${left}px`;
            let newStyle = {...child.props.style, margin}

            return React.cloneElement(child, { style: newStyle });
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