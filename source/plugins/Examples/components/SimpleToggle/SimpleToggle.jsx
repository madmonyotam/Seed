import { Switch } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

module.exports = {
    name: 'SimpleToggle',
    description: 'This is an example of a component',
    dependencies: ['SimpleSwitch.Mixin'],
    get(Mixin) {
        
        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ],

            propsTypes: {
                onChange: PropTypes.object.isRequired,
                checked: PropTypes.bool,
            },

            getDefaultProps(){
                return {
                    checked: true
                };
            },
            
            getInitialState() {
                let { checked } = this.props;

                return {
                    checked: checked
                };
            },

            componentWillMount () {
                this.initUnits();
            },

            initUnits(){
                this.theme = createMuiTheme({
                    palette: {
                        secondary: { main: core.theme('colors.primary')}
                    },
                });
            },

            styles(s){
                const styles = {
                }
                return(styles[s]);
            },

            handleChange(e,checked){
                let { onChange } = this.props;

                onChange(checked);
                this.setState({checked});
            },

            render() {
                let { checked } = this.state;

                return (
                        <MuiThemeProvider theme={this.theme}>
                            <Switch
                                checked={ checked }
                                onChange={ this.handleChange }
                                value="booleanSwitch" />
                        </MuiThemeProvider>
                )
            } 

        }
    }
}
