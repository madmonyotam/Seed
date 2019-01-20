
import { CircularProgress } from '@material-ui/core/';

module.exports = {
    name: "Loader",
    description: '',
    propTypes: {
    },
    dependencies: [],
    get() {

        var core = this;
        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                size: PropTypes.number,
                show: PropTypes.bool,
                color: PropTypes.string,
                style: PropTypes.object,
            },

            getDefaultProps(){
                return {
                  size: 'small',
                  color: 'primary',
                  show: true
                }
            },

            getInitialState() {

                return {
                    error: null
                };
            },

            getThickness(){
                let {size} = this.props;

                if(size < 30) return 2;
                return 3;
            },

            render() {
                let {show, style, size, color, loaderStyle} = this.props;
                let thickness = this.getThickness();

                if (!show){
                  return null;
                }

                let wrapper= {
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    position: 'absolute',
                    top:0,
                    bottom:0,
                    left:0,
                    right:0,
                    zIndex: 1
                }

               color = core.theme(color) ? core.theme(color) : color;

                return (
                   <div style={{...wrapper, ...style}}>
                     <CircularProgress size={size} thickness={ thickness } style={{color: color, ...loaderStyle}} />
                   </div>
                );
            }
        }
    }
}
