import GridLayout from 'react-grid-layout';
require('react-grid-layout/css/styles.css');
require('react-resizable/css/styles.css');

module.exports = {
    name: 'Widget',
    dependencies: ['Simple.TitleBar'],

    get(TitleBar) {
        var core = this;
        var { React, PropTypes } = core.imports;
        
        return {

            propsTypes: {
                content: PropTypes.object,
            },

            getDefaultProps(){
                return {
                    children: '',
                };
            },

            getInitialState() {
                return {};
            },
            
            componentWillReceiveProps(nextProps) {
            },

            componentWillMount() {
                this.initUnits();
            },

            componentDidMount() {
            },
            
            componentWillUnmount() {
            },

            
            initUnits(){
                
                this.colors = {
                    dark: core.theme('colors.dark'),
                    white: core.theme('colors.white'),
                };

                this.backgrounds = {
                    white: core.theme('backgrounds.default'),
                    blue: core.theme('backgrounds.blue'),
                };

                this.units = {
                    titleHeight: 25,
                }
            },

            styles(s) {
                let styles = {
                    root: {
                        position: 'relative',
                        width: '100%',
                        height: `calc(100% - ${this.units.titleHeight}px)`,
                    },
                }
                return(styles[s]);
            },

            renderTitle() {
                return (
                    <TitleBar
                        title={ 'widget' }
                        titlePosition={ 'middle' }
                        bgColor={ this.backgrounds.white }
                        fgColor={ this.colors.dark }
                        padding={ 3 }
                        height={ this.units.titleHeight }
                        shaddow={ false }
                    />
                );
            },
            
            render() {
                let {children} = this.props;

                return (
                    <div id={'widget.root'} style={ this.styles('root') } >
                        { this.renderTitle() }
                        { children }
                    </div>
                );
            }
        };
    }
};
