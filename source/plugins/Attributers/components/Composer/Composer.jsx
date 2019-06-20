module.exports = {
dependencies: [],
get() {
    const seed = this;
    const { React, PropTypes, ComponentMixin } = seed.imports;

    return {
        mixins: [ ComponentMixin ],

        propsTypes: {
            createElement: PropTypes.func.isRequired,
        },

        getDefaultProps() {
            return {};
        },

        mapChildren(children) {
            return React.Children.map(children,(child) => {
                if (child.props.decorator) {
                    return React.cloneElement( child, {}, this.mapChildren(child.props.children) );
                }
                return this.props.createElement(child);
            })
        },

        render() {
            let {children} = this.props;
            return this.mapChildren(children);
        }
    }
}}