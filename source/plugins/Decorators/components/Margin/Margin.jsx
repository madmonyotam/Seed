module.exports = {
dependencies: [],
get() {
  var seed = this;
  var { React, PropTypes, ComponentMixin } = seed.imports;

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
      return {
        all: undefined,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        decorator: true
      };
    },

    createElement(child, key){
      let {all, top, right, bottom, left} = this.props;

      let margin = (!!all) ? all : `${top}px ${right}px ${bottom}px ${left}px`;

      return React.cloneElement(child, {
        key: key,
        style: {...child.props.style, margin: margin}
      })
    },

    mapChildren(children){

      return React.Children.map(children,(child, key) => {
        if (child.props.decorator) {
          return React.cloneElement(
            child,
            { key: key },
            this.mapChildren(child.props.children)
          )
        }

        return this.createElement(child,key);
      })
    },

    render() {
      let {children} = this.props;

      return this.mapChildren(children);
    }
  }
}}
