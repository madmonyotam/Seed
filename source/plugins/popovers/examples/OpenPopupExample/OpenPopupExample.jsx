module.exports = {
    name: "OpenPopupExample",
    description: '',
    dependencies: ['Examples.CodeSnippet','SimpleSwitch.ButtonEx','popovers.PopupHandler'],    
    get(CodeSnippet,ButtonEx,PopupHandler) {
        
        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            propsTypes: {
                text: PropTypes.string,
            },

            getDefaultProps(){
                return {
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
            },

            styles(s){

                const styles = {
                    popupBody: {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: 250
                    },
                
                }
                
                return(styles[s]);
            },

            renderBody(){
                return(
                    <div style={this.styles('popupBody')} >
                        <span>
                            { core.translate('i am a popup test') }
                        </span>
                    </div>
                );
            },

            getCode(){
                return `
core.plugins.popovers.openPopup({
    title: core.translate('Popup test'),
    body: this.renderBody(),
    okButton: {
        btnTitle: 'create',
        btnFunc: this.btnFunc
    }
});`
            },

            btnFunc(){
                core.emit('Popup.close');
            },

            renderPopup(){
                core.plugins.popovers.openPopup({
                    title: core.translate('Popup test'),
                    body: this.renderBody(),
                    okButton: {
                        btnTitle: 'create',
                        btnFunc: this.btnFunc
                    }
                });

                PopupHandler.enableOkBtn();
            },
            
            render() {
                return (
                    <div style={this.styles('root')}>
                        <CodeSnippet code={this.getCode()}/>
                        <ButtonEx func={this.renderPopup} text={'Open Popup'}/>
                    </div>
                )
            } 

        }
    }
}
