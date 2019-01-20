import React from 'react';
var PropTypes = require('prop-types');
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

core.Component('mui.LoaderButton', [],  ()=>{

    /** 
     * @namespace mui.LoaderButton
     * @description Custom button with loader, optionally you can add an icon alongside the label, based on material-ui flat and raised buttons
     * @example submit(callback){
    ...             //some process to run when clicked
    callback();     //the callback automatically stops the loader when process is ended
}
     * @example <LoaderButton 
    flat={true} 
    onSubmit={this.submit} 
    icon={<FontIcon className='fa fa-facebook' />} 
    label='clickMe' 
/>
     * @see <a href='http://www.material-ui.com/#/components/flat-button' target='_blank'>material-ui/flat-button</a>
     * @see <a href='http://www.material-ui.com/#/components/raised-button' target='_blank'>material-ui/raised-button</a>
     * */

    return {

        /** 
         * @memberof mui.LoaderButton
         * @prop {String} propTypes.label - required - label for the button (required)
         * @prop {Function} propTypes.onSubmit - required - the function to run on click (required)
         * @prop {Node} propTypes.icon - render an icon alongside the label (optional)
         * @prop {Boolean} propTypes.disabled - disable the button (optional)
         * @prop {Boolean} propTypes.flat - required - determine if to render a flat or raised button (required)
         * @prop {Number} propTypes.loaderSize - size for loader
         * @prop {Number} propTypes.loaderThickness - thickness for the loader
         * @prop {String} propTypes.loaderColor - color for the loader
         * */

        propTypes: {
            onSubmit: PropTypes.func.isRequired,
            icon: PropTypes.node,
            disabled: PropTypes.bool,
            loaderSize: PropTypes.number,
            loaderThickness: PropTypes.number,
            loaderColor: PropTypes.string
        },

        getDefaultProps(){
            return {
                disabled: false
            }
        },

        getInitialState(){
            return {
                disabled: this.props.disabled,
                loading: false
            };
        },

        /** 
         * @memberof mui.LoaderButton
         * @function
         * @description run the supplied 'onSubmit' function, displaying a loader and disabling the button until process is ended.
         * */

        submit(){
            if(!this.props.loading){
                this.setState({
                    loading: true,
                    disabled: true
                });
                return this.props.onSubmit(this.stopLoading);
            }
            return this.props.onSubmit();
        },

        /** 
         * @memberof mui.LoaderButton
         * @function
         * @description stop the loader when passing the callback()
         * */

        stopLoading(){
            this.setState({
                loading: false,
                disabled: false
            });
        },

        /** 
         * @memberof mui.LoaderButton
         * @function
         * @description rendering the flat or raised button
         * */

        renderButton(){
            let { loading = this.state.loading, disabled = this.state.disabled, label='', onClick, icon=null, loaderSize=24, loaderThickness=3, loaderColor, color, style={}, ...props } = this.props;
            if(loading) disabled = true;
            let lc = loaderColor ? loaderColor : core.theme('colors.white');
                return(
                    <Button 
                        onClick={this.submit} 
                        disabled={disabled} 
                        style={{borderRadius: 0, background: color && !disabled ? color : core.theme("colors.gray3"), cursor: disabled ? 'not-allowed' : 'pointer', ...style}}
                        { ...props } 
                    >
                        { icon }
                        { label }
                        {
                            loading ? 
                                <CircularProgress 
                                    size={loaderSize} 
                                    thickness={loaderThickness} 
                                    style={{'position': 'absolute', 'top': `calc(50% - ${loaderSize})`, 'left': `calc(50% - ${loaderSize})`, 'margin': 0, 'zIndex': 1, color: lc}}
                                /> 
                                : null
                        }
                    </Button>
                );
        },

        render() {
            return(
                this.renderButton()
            )
        }
    }
});