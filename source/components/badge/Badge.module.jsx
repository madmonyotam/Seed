import React from 'react';
var PropTypes = require('prop-types');
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

core.Component('mui.Badge', [],  ()=>{

    /** 
     * @namespace mui.Badge
     * @description display badge with formated number and tooltip on hover that shows the full number
     * @example <Badge amount={listLength} >{''}</Badge>
     * */

    return {

        /** 
         * @memberof mui.Badge
         * @prop {Bool} propTypes.isLoading - show/hide loader
         * @prop {Number} propTypes.number - required - the number to display in the badge
         * */

        propTypes: {
            isLoading: PropTypes.bool,
            amount: PropTypes.oneOfType([ // any
                    PropTypes.string,
                    PropTypes.number
                ]),
            showZero: PropTypes.bool,
            tooltipPosition: PropTypes.string //Possible values are: "bottom-center", "top-center", "bottom-right", "top-right", "bottom-left", and "top-left".
        },

        /** 
         * @memberof mui.Badge
         * @function
         * @description formats the badge number to a shorter one
         * */

        getNumberFormatted(value) {
            value = Math.trunc(value);
            let newValue = value;
            let suffixes = ["", "k", "m", "b","t"];
            let suffixNum = Math.floor( ((""+value).length - 1)/3 );
            let shortValue = '';
            for (let precision = 3; precision >= 1; precision--) {
                shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
                let dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
                if (dotLessShortValue.length <= 3) { break; }
            }
            if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
            newValue = shortValue+suffixes[suffixNum];
            return newValue;
        },

        /** 
         * @memberof mui.Badge
         * @function
         * @description render the badge depend on the number length, if greater than 999, will be formated and add a tooltip to show the full number
         * */

        renderBadge() {
            let { isLoading, amount, style, tooltipStyle={}, tooltipLabelStyle={}, tooltipTheme='light', renderTooltipArrow=true, tooltipPosition='bottom-center', tooltipSize='small', showZero, isPercentage=false, backgroundColor=core.theme('main.secondary'), color=core.theme('text.color2') } = this.props;
            
            var badgeStyle = {
                borderRadius: '3px',
                width: 'auto',
                minWidth:'14px',
                height: '14px',
                padding: '1px 3px',
                marginLeft:'6px',
                fontWeight:'700',
                fontSize:'11px',
                display: 'inline-flex',
                justifyContent: 'center',
                color: color,
                background: backgroundColor,
                cursor: 'default',
                lineHeight: '14px',
                verticalAlign: 'text-top',
                ...style
            };

            if (isLoading) {
                return (
                    <div className={ 'widget-badge' } style={ badgeStyle }>
                        <CircularProgress color={ '#000' } size={ 12 } thickness={ 2 } />
                    </div>
                )
            }

            if (!amount && !showZero) return null;
            if(isPercentage && amount > 100) return null;

            if(isPercentage) {
                return (
                    <div className={ 'widget-badge' } style={ badgeStyle }>
                        { amount + '%' }
                    </div>
                );
            }

            if (amount > 999) {
                let formatedTooltipNumber = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                return (
                    <Tooltip title={formatedTooltipNumber}>
                        <div className={ 'widget-badge' } style={ badgeStyle }>
                            { this.getNumberFormatted(amount) }
                        </div>
                    </Tooltip>
                );
            } else {
                return (
                    <div className={ 'widget-badge' } style={ badgeStyle }>
                        { amount }
                    </div>
                );
            }
        },

        render() {
            return(
                this.renderBadge()
            )
        }
    }
});