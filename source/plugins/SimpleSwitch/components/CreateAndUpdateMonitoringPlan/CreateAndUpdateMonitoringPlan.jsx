import {TextField, Button} from '@material-ui/core';

module.exports = {
    name: "CreateAndUpdateMonitoringPlan",
    description: 'Create or update a new monitoring plan',
    dependencies: ['SimpleSwitch.Mixin','SimpleSwitch.DownshiftMultiple','SimpleSwitch.ReactSelect','popovers.PopupHandler'] , 
    get(Mixin, DownshiftMultiple,ReactSelect, PopupHandler) {
        
        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ],

            componentWillUnmount() {
            },


            propsTypes: {
            },

            getDefaultProps(){
                return {
                    options : [
                        { value: "financial", label: core.translate("Financial") },
                        { value: "critical infrastructure", label: core.translate("Critical Infrastructure") },
                        { value: "government", label: core.translate("Government") },
                        { value: "telecommunications", label: core.translate("Telecommunications") },
                        { value: "business intelligence", label: core.translate("Business Intelligence") },
                      ],
                }
            },
            
            getInitialState() {
                return {
                    name: '',
                    sectors: [],
                    comments: '',
                };
            },

            componentWillMount () {
                this.initUnits();
            },

            componentDidMount() {
                var state = PopupHandler.getData();
                this.setState({...state}, ()=>{
                    console.log('this.state :', this.state);
                })
            },

            componentWillReceiveProps (nextProps) {
            },

            componentWillUnmount () {
                
            },

            initUnits(){
            },

            styles(s){

                const styles = {
                    root: {
                        padding: '15px',
                        width: 544,
                    },
                    button:{
                        margin: '10px',
                    },
                    buttonContainer:{
                        display: 'flex',
                        justifyContent:'flex-end'
                    }
                }
                
                return(styles[s]);
            },

            getButtonColor(){
                if(this.state.name.length>0){
                    return "primary"
                }
            },

            isButtonDisabled(){
                return (this.state.name.length>0) ? false : true ;
            },

            handleNameChange(event){
                if(event.target.value!==''){
                    PopupHandler.enableOkBtn();
                } else {
                    PopupHandler.disableOkBtn();
                }
                this.setState({
                    name: event.target.value
                });
                this.handleChange('name', event.target.value)
            },

            handleCommentsChange(event){
                this.setState({
                    comments: event.target.value
                });
                this.handleChange('comments', event.target.value)

            },

            handleSelectChange(event){
                let selectedItems = event.map(item=>{
                    return item.value
                })
                this.setState({
                    sectors: selectedItems
                })
                this.handleChange('sectors', selectedItems)
            },

            handleChange(paramName, value){
                var data = {
                    ...PopupHandler.getData(),
                    [paramName] : value
                }
                PopupHandler.addData(data)
            }, 
            renderNameTextField(){
                let {name} = this.state;

                return(
                    <TextField
                    autoFocus={true}
                    style={{marginBottom: '20px'}}
                    value={name}
                    required
                    onChange={this.handleNameChange}
                    label={core.translate("Name of Monitoring Plan")}
                    InputLabelProps={{  
                        shrink: true,
                    }}
                    placeholder={core.translate("Insert Name")}
                    fullWidth
                    margin="normal"
                    />
                )
            },

            renderCommentsTextField(){
                let {comments} = this.state;

                return (
                    <TextField
                    style={{marginBottom: '20px'}}
                    value={comments}
                    id="multiline-static"
                    label={core.translate("Administrative Comments")}
                    onChange={this.handleCommentsChange}
                    multiline
                    rows="4"
                    margin="normal"
                    placeholder={core.translate("Write Comments")}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    />
                )
            },

            render() {
                let {options} = this.props;
                return (
                    <div style={this.styles('root')}>

                        {this.renderNameTextField()}
                        <ReactSelect options={options} handleSelectChange={this.handleSelectChange}/>
                        {this.renderCommentsTextField()}

                    </div>
                )
            } 

        }
    }
}
