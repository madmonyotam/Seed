import {Button} from '@material-ui/core';

module.exports = {
    name: "MonitoringPlanPopUpExample",
    description: '',
    dependencies: ['SimpleSwitch.Mixin','popovers.PopupHandler','SimpleSwitch.CreateAndUpdateMonitoringPlan'],    
    get(Mixin,PopupHandler,CreateAndUpdateMonitoringPlan) {
        
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
                    showLoader : false,
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
                    root: {
                        width:'100%',
                        display: 'flex',
                        justifyContent: 'space-around',
                    },
                
                }
                
                return(styles[s]);
            },

            btnFunc(){
                this.setState({
                    showLoader: true
                },()=>{
                    console.debug('sending....', PopupHandler.getData())

                    new Promise((resolve, reject) => {
                        setTimeout(function(){
                        resolve("Success!");
                        }, 2000);
                    }).then((successMessage) => {
                        console.log("Data Sent! " + successMessage);
                        core.emit('Popup.close');
                    });
                })
                
            },

            renderPopup(mode){
                console.log(mode,PopupHandler.getData())
                if(mode==='Edit'){
                    var name = 'spying';
                    var comments = 'yalla lets go';
                    PopupHandler.addData({
                        name, comments
                    })
                }

                core.plugins.popovers.openPopup({
                    title: core.translate(`${mode} Monitoring Plan`),
                    body: <CreateAndUpdateMonitoringPlan />,
                    loaderButtonFlag: this.state.showLoader,
                    okButton: {
                        btnTitle: 'Save' ,
                        btnFunc: this.btnFunc
                    }
                });
            },
            

            render() {

                return (
                    <div style={this.styles('root')}>
                        <Button variant="contained" color="primary" onClick={()=>{this.renderPopup('New')}}>
                            {core.translate('Create MP') }
                        </Button>
                        <Button variant="contained" color="primary" onClick={()=>{this.renderPopup('Edit')}}>
                            {core.translate('Edit MP') }
                        </Button>

                    </div>
                )
            } 

        }
    }
}
