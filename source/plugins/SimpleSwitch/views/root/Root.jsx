var routes = require('./routes');
import { root } from 'baobab-react/mixins';

module.exports = {
    name: 'Root',
    description: '',
    bindings:{
        isLoggedIn: ['isLoggedIn'],
        currentUser :['currentUser']
    },
    dependencies: [
        'SimpleSwitch.Mixin',
        'componentsCollection.TopBar',
        'SimpleSwitch.Nav',
        'popovers.Notify',
        'popovers.Popup',
        'popovers.Caution',
        'popovers.Lightbox',
        'SimpleSwitch.Login',
        'componentsCollection.Loader',
        'Settings.Settings',
        'router.Router',
        'snackbar.Snackbar',
    ],
    get(Mixin, TopBar, Nav, Notify, Popup, Caution, Lightbox, Login, Loader, Settings, Router, Snackbar) {

        var core = this;
        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin, root ],

            propsTypes: {
                path: PropTypes.array,
            },

            getInitialState() {
                return {
                    text: 'Root',
                    navIsOpen: false,
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
                core.plugins.Settings.getInitialFiles(()=>{
                    this.getLanguage();
                    this.initialUnits();
                });
                this.getDataExample();
            },

            initialUnits() {

                this.colors = {
                };

                this.backgrounds = {
                    content: core.theme('backgrounds.content'),
                };

                this.icons = {
                };

                this.units = {
                    appBarHeight: core.dim("appBar.height"),
                    navWidth: core.dim("nav.width"),
                };

            },

            getLanguage() {
                const start = ()=>{ this.setState( {start:true} )};
                core.plugins.SimpleSwitch.run('getLanguage').then(start).catch(start);
            },

            getDataExample(){
                core.plugins.SimpleSwitch.run('getDataEx').then((modifyData)=>{
                    // console.log('modifyData--> ',modifyData);
                  }).catch( ()=>{
                    // console.log('2--> ',2);
                });
            },

            handleNav(route){
              core.plugins.router.to('/'+route);
              this.setState({ activeView: route })
            },

            handleLoggedIn(){
              core.plugins.router.to('/home');
              this.setState({ activeView: 'home' })
            },

            onNavigation(route){
                this.setState({activeView:route.name});
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
                    },

                    content: {
                        position: 'absolute',
                        top:  this.units.appBarHeight,
                        left: this.units.navWidth,
                        bottom: 0,
                        right: 0,
                        overflow: 'hidden',
                        backgroundColor: this.backgrounds.content,
                    },
                }
                return(styles[s]);
            },

            render() {
                let { activeView, start } = this.state;

                // let { isLoggedIn } = this.props;

                // let authToken = localStorage.getItem('authToken');
                // let currentUser = (localStorage.currentUser) ? JSON.parse(localStorage.getItem('currentUser')) : {};

                if (!start) { return <Loader show={true} /> }

                // if(activeView == 'login' || !isLoggedIn) {
                //     return(
                //         <div style={ this.styles('root') }>
                //             <Login onLoggedIn={ this.handleLoggedIn }/>
                //             <Notify />
                //             <Popup />
                //         </div>
                //     );
                // }
                // else return(

                return (
                    <div style={ this.styles('root') }>
                        <Lightbox />
                        <TopBar/>
                        <Nav handleViews={this.handleNav} activeView={activeView} />
                        <Notify />
                        {/* <Popup /> */}
                        <Caution />

                        <div style={ this.styles('content') }>
                           <Router routes={routes} defaultRoute={'/home'}  onNavigation={this.onNavigation}/>
                        </div>
                    </div>
                )
            }
        }
    }
};
