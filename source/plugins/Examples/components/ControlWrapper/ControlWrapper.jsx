import { TextField } from "@material-ui/core";

module.exports = {
    name: "ControlWrapper",
    description: 'control wrapper is a basic layout for controlers in examples tab to control props from the ui',
    dependencies: ['SimpleSwitch.Mixin','Examples.SimpleToggle','Simple.Label','Layouts.Row'],
    get(Mixin,SimpleToggle, Label, Row) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ],

            componentWillUnmount() {
            },


            propsTypes: {
                scheme: PropTypes.object,
            },

            getDefaultProps(){
                return {
                    scheme: {}
                };
            },

            getInitialState() {
                return {

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
                this.borderColor =  core.theme('colors.borderDark');
                this.background = core.theme('backgrounds.white');
            },

            styles(s){

                const styles = {
                    root: {
                        flex: 0.20,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        overflow: 'auto',
                        background: this.background,
                        borderRadius: 4,
                        margin: 10,
                        boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)'

                    },

                }

                return(styles[s]);
            },

            handleOnChange(context,stateName,value){
               let val = value.target ? value.target.value : value;
               context.setState({[stateName]:val});
            },

            renderToggle(stateName, context){
                let checked = context.state[stateName];

                return(
                    <React.Fragment>
                        <Label width={'100%'} label={stateName}/>
                        <SimpleToggle checked={checked} onChange={ this.handleOnChange.bind(this,context,stateName) }  />
                    </React.Fragment>   
                )
            },

            renderSimple(stateName, context){
                return(
                    <React.Fragment>
                        <Label width={'100%'} label={stateName}/>
                        <Label width={64} label={context.state[stateName]}/>
                    </React.Fragment>   
                )
            },

            renderTextField(stateName, context, type){
                return(
                    <React.Fragment>
                        <Label width={'100%'} label={stateName}/>
                        <TextField
                            id={stateName}
                            type={ type }
                            value={ context.state[stateName] }
                            onChange={ this.handleOnChange.bind(this,context,stateName) } />
                    </React.Fragment> 
                )
            },

            renderComponentByType(type, stateName, context){
                switch (type) {
                    case 'simpleToggle': 
                        return  this.renderToggle( stateName, context );

                    case 'simpleNumber': 
                        return this.renderTextField( stateName, context, 'number' );
                    
                    case 'colorPicker':
              //          return this.renderSimple( stateName, context );  
                
                    default:
                    return this.renderTextField( stateName, context, 'text' );
                }
            },

            renderByScheme(){
                let { scheme } = this.props; 
                let itemInScheme = Object.entries(scheme);
                
                return itemInScheme.map((item,key)=>{
                    let context = item[1].context
                    let type = item[1].type;
                    let name = item[0];

                    return (
                        <Row height={60} boxShadow={true} key={key} >
                            { this.renderComponentByType(type, name, context) }
                        </Row>
                    )
                });
            },

            render() {

                return (
                    <div style={this.styles('root')}>
                        { this.renderByScheme() }
                    </div>
                )
            }

        }
    }
}
