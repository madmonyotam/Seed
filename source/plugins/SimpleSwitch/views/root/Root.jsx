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
        'Simple.TopBar',
        'SimpleSwitch.Nav',
        'popovers.Notify',
        'popovers.Popup',
        'popovers.Caution',
        'popovers.Lightbox',
        'SimpleSwitch.Login',
        'Simple.Loader',
        'SimpleSwitch.MainRouter'
    ],
    get(Mixin, TopBar, Nav, Notify, Popup, Caution, Lightbox, Login, Loader, MainRouter) {

        var core = this;
        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin, root ],

            propsTypes: {
                location: PropTypes.string,
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
                let { location } = this.props;
                this.setState({activeView: location})


                this.getLanguage();
                this.initialUnits();

                this.getDataExample();
            },

            initialUnits() {

                this.colors = {
                };

                this.icons = {
                };

                this.units = {
                };

            },

            getLanguage() {
                const start = ()=>{ this.setState( {start:true} )};
                core.plugins.SimpleSwitch.run('getLanguage').then(start).catch(start);
            },

            getDataExample(){
                core.plugins.SimpleSwitch.run('getDataEx').then((modifyData)=>{
              //       console.log('modifyData--> ',modifyData);
                  }).catch( ()=>{
              //       console.log('2--> ',2);
                });
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

                // let authToken = localStorage.getItem('authToken');
                // let currentUser = (localStorage.currentUser) ? JSON.parse(localStorage.getItem('currentUser')) : {};

                if (!start) { return <Loader show={true} /> }

                // if(!isLoggedIn) {
                //     return(
                //         <div style={ this.styles('root') }>
                //             <Login onLoggedIn={ this.handleLoggedIn }/>
                //             <Notify />
                //             <Popup /> 
                //         </div>
                //     );
                // }
                // else 

                return (
                    <div style={ this.styles('root') }>
                        <Lightbox />
                        <TopBar/>
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
