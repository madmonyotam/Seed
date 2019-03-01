var SvgIcons = require('@material-ui/icons');
var libPureSVG = require('resources/icons/PureSVG');
import { Icon } from '@material-ui/core/';

module.exports = {
    dependencies: ['SimpleSwitch.Mixin','SimpleSwitch.Helper'],
    get(Mixin, Helper) {

        var core = this;
        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ],

            propsTypes: {
                icon: PropTypes.string,
                size: PropTypes.number,
                color: PropTypes.string,
            },

            getDefaultProps() {
                return {
                    style: {},
                    size: 24,
                    color:  core.theme('components.icon'),
                    icon: core.icons('general.info')
                }
            },

            styles(s) {
                let { style, size, color } = this.props;

                let styles = {
                    icon: {
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontSize: size, 
                        color: color,
                        transition: 'all 0.15s ease-in-out',
                        ...style, 
                    },
                    svg: {
                        width: size, 
                        height: size, 
                    },
                    pureSVG: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: color,
                        transition: 'all 0.15s ease-in-out',
                        fill: "currentColor",
                        userSelect: 'none',
                        flexShrink: 0,
                        width: size,
                        height: size,
                        ...style, 
                    }
                }
                return(styles[s]);
            },

            isSvgExists(icon){

                let SVGIconName = Helper.underscoreToCamelCase(icon);
                let SingleIcon = SvgIcons[SVGIconName];

                if(SingleIcon) return SingleIcon;

                return false;
            },

            mapSVG ( item, index ) {
                if ( item && item.shape && item.shape.length ) {
                    let CustomTag = `${item.shape}`;
                    return ( <CustomTag key={ index } { ...item.params }/> );
                }

                return ( <path key={ index } d={ item } style={{ "fillOpacity": 1 }}/> )
            },

            SVGcontent (pureSVG) {
                if ( pureSVG && pureSVG.groupParams ) {
                    return (
                        <g { ... pureSVG.groupParams}>
                            { _map( pureSVG.shapes, this.mapSVG ) }
                        </g>
                    );
                }

                return _map( pureSVG, this.mapSVG );
            },

            renderPureSVG ( icon ) {
                let pathName = icon.split('.')[1];
                let pureSVG = libPureSVG[pathName];

                let {  onClick } = this.props;
                return ( 
                    <svg onClick={ onClick } title={ pathName } style={ this.styles('pureSVG')} id={ icon } focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                        { this.SVGcontent( pureSVG ) }
                    </svg>
                );
            },

            renderFontAwesome(icon){
              return ( <Icon style={{ ...this.styles('icon'), width: 'auto', height: 'auto' }} className={ icon } /> );
            },

            render() {
                let { icon, size, color, style, ...otherProps } = this.props;

                let isFontAwesome = icon.startsWith('fas' || 'fa');
                if (isFontAwesome) {
                  return this.renderFontAwesome(icon)
                }

                let isPureSVG = icon.startsWith('pureSVG');
                let SvgIcon = isPureSVG ? false : this.isSvgExists(icon);

                if ( isPureSVG ) {
                    return this.renderPureSVG( icon );
                } else if ( SvgIcon ) {
                    return ( <SvgIcon {...otherProps} style={ { ...this.styles('svg'), ...this.styles('icon') } } /> );
                }
                
                return ( <Icon {...otherProps} style={ this.styles('icon')} > { icon } </Icon> );
            }
        }
    }
};