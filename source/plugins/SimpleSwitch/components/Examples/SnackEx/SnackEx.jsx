import {Paper, FormControl, TextField , InputLabel, Select, MenuItem } from "@material-ui/core";
module.exports = {
    name: "SnackEx",
    description: '',
    dependencies: ['SimpleSwitch.Mixin','SimpleSwitch.CodeSnippet','componentsCollection.Loader',
    'SimpleSwitch.ButtonEx', 'Examples.ExampleWrapper', 'Examples.ControlWrapper', 'Examples.ComponentWrapper', 'SimpleSwitch.ReactSelect'],
    get(Mixin, CodeSnippet, Loader, ButtonEx, ExampleWrapper, ControlWrapper, ComponentWrapper, ReactSelect) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ],

            componentWillUnmount() {
            },


            propsTypes: {
                text: PropTypes.string,
            },

            getDefaultProps(){
                return {
                };
            },

            getInitialState() {
                return {
                    message: 'simple switch',
                    icon: 'success',
                    icons: [
                        {
                            label: 'success',
                            value: 'success'
                        },
                        {
                            label: 'info',
                            value: 'info'
                        },
                        {
                            label: 'warning',
                            value: 'warning'
                        }
                    ]
                };
            },

            componentWillMount () {

            },

            componentDidMount() {
            },

            componentWillReceiveProps (nextProps) {
            },

            componentWillUnmount () {

            },

            getCode(){
                let { message, icon } = this.state;
                return (`
core.snack('${ message }', '${ icon }');
                `)
            },

            render() {
                let { message, icon, icons } = this.state;

                return (
                    <ExampleWrapper CodeSnippet={ this.getCode() } componentName={ core.translate('Snackbar') }>

                        <ControlWrapper>
                        <TextField
                                id="message"
                                type={ 'text' }
                                label={ core.translate('Message') }
                                value={ message }
                                onChange={ e => this.setState({ message: e.target.value }) }
                                margin="normal"
                            />
                            <div style={{ marginBottom: 30, width: '100%' }}>
                            <FormControl style={{ width: '100%'}}>
                                <InputLabel htmlFor="icon">Icon</InputLabel>
                                <Select
                                    value={ icon }
                                    onChange={ e => this.setState({ icon: e.target.value })}
                                    inputProps={{
                                        name: 'icon',
                                        id: 'icon',
                                    }}
                                >
                                    <MenuItem value={'success'}>success</MenuItem>
                                    <MenuItem value={'info'}>info</MenuItem>
                                    <MenuItem value={'warning'}>warning</MenuItem>
                                </Select>
                            </FormControl>
                            </div>
                            <ButtonEx func={ e => core.snack(message, icon) } text={ core.translate('Snackbar') } style={{ marginBottom: 15, width: '100%' }}/>
                        </ControlWrapper>

                        <ComponentWrapper>
                        </ComponentWrapper>
                    </ExampleWrapper>
                );

                return (
                    <div style={{ display: 'flex'}}>
                        <div style={{ marginRight: 20 }}>
                            <TextField
                                id="message"
                                type={ 'text' }
                                label={ core.translate('Message') }
                                value={ message }
                                onChange={ e => this.setState({ message: e.target.value }) }
                                margin="normal"
                            />
                            <div style={{ marginBottom: 30 }}>
                            <FormControl style={{ width: '100%'}}>
                                <InputLabel htmlFor="icon">Icon</InputLabel>
                                <Select
                                    value={ icon }
                                    onChange={ e => this.setState({ icon: e.target.value })}
                                    inputProps={{
                                        name: 'icon',
                                        id: 'icon',
                                    }}
                                >
                                    <MenuItem value={'success'}>success</MenuItem>
                                    <MenuItem value={'info'}>info</MenuItem>
                                    <MenuItem value={'warning'}>warning</MenuItem>
                                </Select>
                            </FormControl>
                            </div>
                            <ButtonEx func={ e => core.snack(message, icon) } text={ core.translate('Snackbar') } style={{ marginBottom: 15, width: '100%' }}/>
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                            <Paper style={{ flex: 1, height: 80, padding: 20 }} >
                            { this.getCode() }
                            </Paper>
                        </div>
                    </div>
                );
            }
        }
    }
}
