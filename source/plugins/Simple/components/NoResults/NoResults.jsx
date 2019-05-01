
import {
    Icon,Typography
  } from '@material-ui/core/';


module.exports = {
    dependencies: [],
    get() {

        var core = this;

        var { React, PropTypes } = core.imports;

        const styles = {
            wrapper: {
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                position: 'absolute',
                top:0,
                bottom:0,
                left:0,
                right:0
            },
        
            flexColumn: {
                display:'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }
        }

        return {
            propsTypes: {
                text: PropTypes.string,
                icon: PropTypes.string,
            },

            getDefaultProps(){
                return {
                    icon: 'contact_support',
                    text: 'No Results',
                    color: core.theme('texts.default'),
                    size: 3,
                    background: core.theme('backgrounds.default'),
                };
            },

            getInitialState() {

                return {

                };
            },

            componentDidMount() {

            },

            componentDidCatch(err){

            },

            renderNoResults(){
                let { size, icon, color } = this.props;
                let fontSize = size *6;
                if(!icon) return;

                return(
                    <Icon style={{ fontSize , color: color }}>
                        {icon}
                    </Icon>
                )
            },

            renderText(){
                let { text, size, color } = this.props;

                if(!text) return;
                let fontSize = size *3;

                return(
                    <Typography style={{ marginTop: 15, fontSize:fontSize, color: color }}>
                        { text }
                    </Typography>
                )
            },

            render() {
                let {style,background, ...rest} = this.props;
                return (
                    <div style={{ ...styles.wrapper, ...style, ...{background} }} {...rest}>
                        <div style={styles.flexColumn}>
                            { this.renderNoResults() }
                            { this.renderText() }
                        </div>
                    </div>
                )
            }

        }
    }
}
