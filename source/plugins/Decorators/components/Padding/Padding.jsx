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

    render() {
      let {children, all, top, right, bottom, left} = this.props;

      return React.Children.map(children,
        (child, key) => {
          let padding = (!!all) ? all : `${top}px ${right}px ${bottom}px ${left}px`;

          if (child.props.decorator) {
            return React.cloneElement(
              child,
              { key: key },
              React.Children.map(child.props.children,
                (cChild, key) => {
                  return React.cloneElement(cChild, {
                    key: key,
                    style: {...cChild.props.style, padding: padding}
                  })
                }
              )
            )
          }

          return React.cloneElement(child, {
            key: key,
            style: {...child.props.style, padding: padding}
          })
        }
      );
    }
  }
}}
