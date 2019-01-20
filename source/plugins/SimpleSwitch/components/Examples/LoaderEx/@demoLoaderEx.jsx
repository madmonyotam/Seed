import {FormControl,InputLabel,Select,MenuItem} from "@material-ui/core";


module.exports = {
    name: "LoaderEx",
    description: '',
    dependencies: ['SimpleSwitch.Mixin','SimpleSwitch.CodeSnippet','componentsCollection.Loader','SimpleSwitch.ButtonEx','Settings.ColorPicker'],    
    get(Mixin,CodeSnippet,Loader,ButtonEx,ColorPicker) {
        
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
                    show: false,
                    size: 30,
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
                    exampleCont: {
                        width: "100%",
                        height: "60vh",
                        display: "flex",
                        justifyContent: "space-around",
                    },
                    loaderCont:{
                        position: "relative",
                        width: '100%',
                        height: '100%',
                        flex: 0.6,
                    },
                    inputsCont:{
                        flex: 0.2,
                        border: '1px solid black',
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                
                }
                
                return(styles[s]);
            },

            handleChange(event){
               this.setState({
                   size: event.target.value,
               })
            },

            getCode(){
                return
            },

            renderLoader(){
                let {show} = this.state;

                this.setState({
                    show : !show,
                })
            },
            
            render() {
                let {show,size} = this.state;
                return (
                    <div style={this.styles('root')}>
                        <CodeSnippet code={this.getCode()}/>
                        <ButtonEx func={this.renderLoader} text={'Show Loader'}/>

                        <div style={this.styles('exampleCont')}>
                            <div style={this.styles('loaderCont')}>
                                <Loader show={show} size={size}/>
                            </div>

                            <div style={this.styles('inputsCont')}>
                                <form autoComplete="off">
                                    <FormControl>
                                    <InputLabel htmlFor="size">Loader Size</InputLabel>
                                    <Select
                                        style={{ width: "150px" }}
                                        value={this.state.size}
                                        onChange={this.handleChange}
                                        inputProps={{
                                        name: "age",
                                        id: "size"
                                        }}
                                    >
                                        <MenuItem value="">
                                        <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={15}>XXS</MenuItem>
                                        <MenuItem value={20}>XS</MenuItem>
                                        <MenuItem value={30}>S</MenuItem>
                                        <MenuItem value={40}>S-M</MenuItem>
                                        <MenuItem value={60}>M (default)</MenuItem>
                                        <MenuItem value={70}>L</MenuItem>
                                    </Select>
                                    </FormControl>
                                </form>
                                <ColorPicker/>
                            </div>

                        </div>
                    </div>
                )
            } 

        }
    }
}
