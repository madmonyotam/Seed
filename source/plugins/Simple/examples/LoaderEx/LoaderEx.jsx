import { TextField } from "@material-ui/core";


module.exports = {
    name: "LoaderEx",
    description: '',
    dependencies: ['SimpleSwitch.Mixin','Simple.Loader',
    'SimpleSwitch.ButtonEx', 'Examples.ExampleWrapper', 'Examples.ControlWrapper', 'Examples.ComponentWrapper', 'Settings.ColorPicker'],
    get(Mixin, Loader, ButtonEx, ExampleWrapper, ControlWrapper, ComponentWrapper, ColorPicker) {

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

            propScheme(){ // TODO:  
                return {
                    show: { type: 'boolean' },
                    size: { type: 'number' },
                    loaderColor: { type: 'colorPicker' }
                }
            },

            getInitialState() {
                return {
                    show: true,
                    size: 30,
                    loaderColor: '#333'
                };
            },

            componentWillMount () {
                this.initUnits();
            },

            componentDidMount() {
            },

            componentWillReceiveProps (nextProps) {
            },

            componentWillUnmount () {

            },

            initUnits(){

            },

            styles(s){

                const styles = {

                }

                return(styles[s]);
            },

            handleChange(event){
               this.setState({
                   size: Number(event.target.value)
               })
            },

            getCode(){
                let { loaderColor, show, size } = this.state; 
                return { loaderColor, show, size }
            },
            
            handleOpenColorPicker(e){
              this.setState({ colorPickerAnchorEl: e.currentTarget, colorKey: null })
            },
            handleSelectColor(newColor){
              this.setState({ loaderColor: newColor })
              this.handleClosePicker();
            },
            handleClosePicker(){
              this.setState({ colorPickerAnchorEl: null, colorKey: null })
            },

            render() {
                let { colorPickerAnchorEl, loaderColor, show, size } = this.state;

                return (
                    <ExampleWrapper snippet={{ element: Loader, props: this.getCode() }} componentName={ core.translate('Loader') }>

                        <ControlWrapper  scheme={ this.propScheme() } context={this} >
                          <ButtonEx func={this.handleOpenColorPicker} text={ core.translate('change color') } />
                        </ControlWrapper>

                        <ComponentWrapper>
                            <Loader show={ show } color={ loaderColor } size={ size } />
                        </ComponentWrapper>

                        <ColorPicker
                          anchorEl={ colorPickerAnchorEl }

                          picker={ true }
                          handleClose={ this.handleClosePicker }
                          onColorPick={ this.handleSelectColor }
                          mode={ 'new' } />
                    </ExampleWrapper>

                )
            }

        }
    }
}
