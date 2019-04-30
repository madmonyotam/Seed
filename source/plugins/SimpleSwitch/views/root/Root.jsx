import { root } from 'baobab-react/mixins';

module.exports = {
    name: 'Root',
    description: '',
    bindings:{
        isLoggedIn: ['isLoggedIn'],
        currentUser :['currentUser']
    },
    dependencies: [
        'SimpleSwitch.Nav',
        'popovers.Notify',
        'popovers.Popup',
        'popovers.Caution',
        'Simple.Loader',
        'SimpleSwitch.MainRouter'
    ],
    get(Nav, Notify, Popup, Caution, Loader, MainRouter) {

        var core = this;
        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin, root ],

            propsTypes: {
                location: PropTypes.string,
            },

            getInitialState() {
                return {
                    activeView: 'home',
                    start: false
                };
            },

            componentWillMount () {
                this.start();
            },

            componentDidMount() {
                core.on('notify',this.addNotification);
            },

            componentWillUnmount() {
                core.off('notify',this.addNotification);
            },

            componentDidCatch(err){
                this.setState({ error: err && err.toString() })
            },

            start() {
                let { location } = this.props;
                this.setState({activeView: location})

                this.getLanguage();
                this.getDataExample();
            },

            getLanguage() {
                const start = ()=>{ this.setState( {start:true} )};
                core.plugins.SimpleSwitch.run('getLanguage').then(start).catch(start);
            },

            getDataExample(){
            //     core.plugins.SimpleSwitch.run('getDataEx').then((modifyData)=>{
            //   //       console.log('modifyData--> ',modifyData);
            //       }).catch( ()=>{
            //   //       console.log('2--> ',2);
            //     });
            },

            handleNav(route){
              this.setState({ activeView: route })
            },

            addNotification({text, alertKind}){
                core.plugins.popovers.addNotify(text, alertKind);
            },

            styles(s,place = {}) {

                let styles = {

                    root: {
                        width:'100%',
                        height:'100%',
                        overflow: 'hidden',
                        position: 'relative',
                    }
                    
                }
                return(styles[s]);
            },

            render() {
                let { activeView, start } = this.state;
                let { isLoggedIn } = this.props;

                if (!start) { return <Loader show={true} /> }

                return (
                    <div style={ this.styles('root') }>
                        <Nav handleViews={this.handleNav} activeView={activeView} />
                        <Notify />
                        <Popup />
                        <Caution />

                        <MainRouter/>   
                    </div>
                )
            }
        }
    }
};
