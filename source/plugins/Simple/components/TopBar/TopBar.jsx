module.exports = {
    name: 'TopBar',
    dependencies: ['Simple.TitleBar'],
    get(TitleBar) {

        var core = this;
        var { React, PropTypes } = core.imports;

        return {
            propTypes: {
                user: PropTypes.object
            },

            getDefaultProps(){
                return {};
            },

            getInitialState(){
                return {};
            },

            styles(s) {
                let styles = {
                    imgLogo: {
                        width: 44,
                    },
                }

                return(styles[s]);
            },

            render() {
                var appTitle = core.plugins.Settings.get(['config','general','appTitle']);

                var title;
                if (appTitle && (appTitle !== null && typeof appTitle === 'string')) title = appTitle;

                return (
                    <TitleBar
                        title={ title }
                        logo={ <img src='/resources/images/simpleSwitch.png' style={ this.styles('imgLogo') } /> }
                        bgColor={ core.theme('backgrounds.nav') }
                        height={ core.dim("appBar.height") }
                        zIndex={ core.dim("appBar.zIndex") }
                    />
                );

            }
        };
    }
};
