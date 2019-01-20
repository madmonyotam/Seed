import { Icon, IconButton } from '@material-ui/core/';

module.exports = {
    name: "Arrow",
    description: '',
    dependencies: [],

    get() {
        var core = this;
        var { React, PropTypes } = core.imports;

        return {

            propsTypes: {
            },

            getDefaultProps(){
                const defaultAction = () =>{ console.log( 'Arrow pressed'); }

                return {
                    direction: 'next',
                    label: core.translate('Next'),
                    action: defaultAction,
                    style: {
                        root: {},
                        inner: {},
                        button: {},
                        icon: {}
                    },
                };
            },

            styles(s) {
                let {style} = this.props;
                let styles = {
                    root: {
                        display:'flex',
                        position: 'absolute',
                        flexDirection: 'column',
                        width: 80,
                        height: 80,
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        overflow: 'hidden',
                        zIndex: 1,
                        ...style.root
                    },
                    inner: {
                        display: "flex",
                        position: 'relative',
                        alignItems: "center",
                        justifyContent: 'center',
                        height: '100%',
                        ...style.inner
                    },
                    button: {
                        width: 80,
                        height: 80,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: core.theme('colors.white'),
                        ...style.button
                    },
                    icon: { 
                        color: core.theme('colors.white'),
                        cursor: 'pointer',
                        fontSize: 75,
                        textShadow: `0px 0px 1px ${core.theme('colors.black')}`,
                        ...style.icon
                    },
                }
                return(styles[s]);
            },

            render() {
                let {direction, label, action} = this.props;
                
                let arrow = '';
                let title = '';
                if (!direction) return null;
                else if (direction === 'next' ) {
                    arrow = core.icons('navigate.right');
                    title = (label) ? label : core.translate('Next');
                }
                else if (direction === 'prev' ) {
                    arrow = core.icons('navigate.left');
                    title = (label) ? label : core.translate('Prev');
                }
                else if (direction === 'up' ) {
                    arrow = core.icons('navigate.up');
                    title = (label) ? label : core.translate('Up');
                }
                else if (direction === 'down' ) {
                    arrow = core.icons('navigate.down');
                    title = (label) ? label : core.translate('Down');
                }
                else return null;

                return (
                    <div id={`Arrow.root_${title}`} style={ this.styles('root') }>
                        <div id={'Arrow.inner'} style={ this.styles('inner') }>
                            <IconButton id={'Gallery.buttonNext'} style={ this.styles('button')} onClick={ action }>
                                <Icon title={ title } style={ this.styles('icon')}>{ arrow }</Icon>
                            </IconButton>
                        </div>
                    </div>
                );
            }
        }
    }
};