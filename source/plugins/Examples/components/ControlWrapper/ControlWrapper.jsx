import { TextField } from "@material-ui/core";

module.exports = {
    name: "ControlWrapper",
    description: 'control wrapper is a basic layout for controlers in examples tab to control props from the ui',
    dependencies: ['SimpleSwitch.Mixin','Examples.SimpleToggle','Simple.Label','Layouts.Row','Layouts.Column'],
    get(Mixin,SimpleToggle, Label, Row, Column) {

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
                        background: this.background,
                        margin: 10,
                        borderRadius: 4,
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
                    case 'boolean': 
                        return  this.renderToggle( stateName, context );

                    case 'number': 
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
                    <Column boxShadow={true} width={'20%'} style={this.styles('root')}>
                        { this.renderByScheme() }
                    </Column>
                )
            }

        }
    }
}
