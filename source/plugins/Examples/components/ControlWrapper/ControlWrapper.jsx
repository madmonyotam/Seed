module.exports = {
    name: "ControlWrapper",
    description: 'control wrapper is a basic layout for controlers in examples tab to control props from the ui',
    dependencies: ['Inputs.Switch', 'Inputs.Input' ,'Simple.Label','Layouts.Row','Layouts.Column','Simple.Helper'],
    get(Switch, Input, Label, Row, Column, Helper) {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

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
                let label = Helper.openCamelCase(stateName);

                return(
                    <React.Fragment>
                        <Label width={'100%'} label={label} weight={ 400 }/>
                        <Switch size={ 1.75 } checked={checked} onChange={ this.handleOnChange.bind(this,stateName) }  />
                    </React.Fragment>   
                )
            }, 

            renderTextField(stateName, type){
                let { context } = this.props;
                let label = Helper.openCamelCase(stateName);

                return(
                    <React.Fragment>
                       <Input 
                          type={ type } 
                          placeholder={ stateName } 
                          label={ label }  
                          theme={ 'filled' }
                          onChange={  this.handleOnChange.bind(this, stateName) }
                          value={ context.state[stateName] }  />
                        {/* <Label width={'100%'} label={label}/>
                        <TextField
                            id={stateName}
                            type={ type }
                            value={ context.state[stateName] }
                            onChange={ this.handleOnChange.bind(this, stateName) } /> */}
                    </React.Fragment> 
                )
            },

            renderSelectField(stateName, type, fullItem){
              let { context } = this.props;
              let options = fullItem.options ? fullItem.options.map(opt => { return { value: opt, label: opt.toUpperCase } }) : [];
              let label = Helper.openCamelCase(stateName); 

              return(
                  <React.Fragment>
                      <Input 
                        type={ 'autocomplete' } 
                        placeholder={ stateName } 
                        label={ label }  
                        openOnFocus={ true }
                        theme={ 'filled' }
                        options={ options }
                        suggest={ false }
                        onChange={  this.handleOnChange.bind(this, stateName) }
                        value={ context.state[stateName] } /> 
                  </React.Fragment> 
              )
            },

            renderComponentByType(type, stateName, defaultItem){
                let { context } = this.props;

                switch (type) {
                    case 'boolean': 
                        return  this.renderToggle( stateName );

                    case 'number': 
                        return this.renderTextField( stateName, 'number' ); 

                    case 'select':
                      return this.renderSelectField( stateName, 'autocomplete', defaultItem )

                    // case 'colorPicker':
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
                        <Row height={ 'auto' } boxShadow={ false } key={key} style={{ paddingRight: 15 }} >
                            { this.renderComponentByType(type, name, item[1]) }
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
