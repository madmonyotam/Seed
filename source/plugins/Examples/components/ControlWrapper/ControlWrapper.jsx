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
                context: PropTypes.object.isRequired,
                scheme: PropTypes.object,
            },

            getDefaultProps(){
                return {
                    scheme: {}
                };
            },

            componentWillMount () {
                this.initUnits();
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

            handleOnChange(stateName,value){
                let { context, scheme } = this.props;

                if(scheme[stateName].group === 'initial'){
                    core.emit('initialComponent');
                }

                let val = value.target ? value.target.value : value;
                context.setState({[stateName]:val});
            },

            renderToggle(stateName){
                let { context } = this.props;

                let checked = context.state[stateName];

                return(
                    <React.Fragment>
                        <Label width={'100%'} label={stateName}/>
                        <SimpleToggle checked={checked} onChange={ this.handleOnChange.bind(this,stateName) }  />
                    </React.Fragment>   
                )
            },

            renderSimple(stateName){
                let { context } = this.props;

                return(
                    <React.Fragment>
                        <Label width={'100%'} label={stateName}/>
                        <Label width={64} label={context.state[stateName]}/>
                    </React.Fragment>   
                )
            },

            renderTextField(stateName, type){
                let { context } = this.props;

                return(
                    <React.Fragment>
                        <Label width={'100%'} label={stateName}/>
                        <TextField
                            id={stateName}
                            type={ type }
                            value={ context.state[stateName] }
                            onChange={ this.handleOnChange.bind(this,stateName) } />
                    </React.Fragment> 
                )
            },

            renderComponentByType(type, stateName){
                let { context } = this.props;

                switch (type) {
                    case 'boolean': 
                        return  this.renderToggle( stateName );

                    case 'number': 
                        return this.renderTextField( stateName, 'number' );
                    
                    case 'colorPicker':
              //          return this.renderSimple( stateName, context );  
                
                    default:
                    return this.renderTextField( stateName, 'text' );
                }
            },

            renderByScheme(){
                let { scheme } = this.props; 
                let itemInScheme = Object.entries(scheme);
                
                return itemInScheme.map((item,key)=>{
                    let type = item[1].type;
                    let name = item[0];

                    return (
                        <Row height={60} boxShadow={true} key={key} >
                            { this.renderComponentByType(type, name) }
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
