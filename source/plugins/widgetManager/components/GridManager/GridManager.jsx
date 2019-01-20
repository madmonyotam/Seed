import GridLayout from 'react-grid-layout';
require('react-grid-layout/css/styles.css');
require('react-resizable/css/styles.css');

module.exports = {
    name: 'GridManager',
    dependencies: [],
    
    get() {
        var core = this;
        var { React, PropTypes } = core.imports;
        
        return {

            propsTypes: {
                widgets: PropTypes.array.isRequired,
            },

            getDefaultProps() {
                return {
                    widgets: [{
                        placement: {x:11, y: 3, w: 1, h: 1},
                        content: ( <div style={ {backgroundColor: 'tomato', width: '100%', height: '100%'} }>1</div> )
                    }]
                };
            },

            componentWillMount() {
                this.initialUnits();
            },

            initialUnits() {
                this.backgrounds = {
                    menu: core.theme('backgrounds.menu'),
                    default: core.theme('backgrounds.default'),
                    boxShadow: core.theme('backgrounds.boxShadow'),
                }
                this.colors = {
                    gray: core.theme('colors.gray'),
                    dark: core.theme('colors.dark')
                }
                this.icons = {}
                this.units = {
                    gridWidth: (document.getElementById('GridManager.root')) ? document.getElementById('GridManager.root').offsetWidth : 1500,
                }
            },

            styles(s) {
                let styles = {
                    root: {
                        width: '100%',
                    },
                    grid: {
                        backgroundColor: this.backgrounds.menu,
                    },
                    widget: {
                        backgroundColor: this.backgrounds.default,
                        color: this.colors.dark,
                        border: `1px solid ${this.colors.gray}`,
                        boxShadow: `2px 2px 7px 0px ${this.colors.boxShadow}`,
                        borderRadius: 4,
                        padding: 5,
                    },
                }
                return(styles[s]);
            },

            renderWidget(data, key) {
                if (!data.content) return null;

                let widgetPlace = (data.placement) ? data.placement : {x:0, y: 0, w: 1, h: 1};

                return (
                    <div id={`GridManager.widget_${key}`} key={key} style={ this.styles('widget') } data-grid={ widgetPlace } >
                        { data.content }
                    </div>
                );
            },
            
            render() {
                let {widgets} = this.props;

                return (
                    <div id={'GridManager.root'} style={ this.styles('root') }>
                        <GridLayout style={ this.styles('grid') } className={'layout'} cols={30} rowHeight={30} width={this.units.gridWidth}>
                            { widgets.map(this.renderWidget) }
                        </GridLayout>
                    </div>
                );
            }
        };
    }
};
