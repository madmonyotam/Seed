import { root } from 'baobab-react/mixins';

module.exports = {
    name: 'Root',
    description: '',
    bindings:{
        isLoggedIn: ['isLoggedIn'],
        currentUser :['currentUser']
    },
    dependencies: [
      'Navigation.MainRouter', 'Navigation.Top', 'Popovers.Notify', 'Popovers.Caution', 'Popovers.Popup',
      'Simple.Loader',
    ],
    get(
        MainRouter, Navigation, Notify, Caution, Popup,
        Loader
    ) {

        var seed = this;
        var { React, PropTypes, ComponentMixin } = seed.imports;

        return {
            mixins: [ ComponentMixin, root ],

            propsTypes: {
                location: PropTypes.string,
            },

            getInitialState() {
                return {
                    activeView: '/new-project',
                    start: false
                };
            },

            componentWillMount () {
                this.start();
            },

            componentDidMount() {
                this.eventsHandler('on');          
            },

            componentWillUnmount() {
                this.eventsHandler('off');
            },

            componentDidCatch(err){
                this.setState({ error: err && err.toString() })
            },

            eventsHandler(action) {
                seed[action]('popup', this.addPopup);
            },

            start() {
                let { location } = this.props;
                this.setState({activeView: location})

                this.getLanguage();
                this.getDataExample();
            },

            getLanguage() {
                const start = ()=>{ this.setState( {start:true} )};
                seed.plugins.Project.run('getLanguage').then(start).catch(start);
            },

            getDataExample(){
            //     seed.plugins.Project.run('getDataEx').then((modifyData)=>{
            //   //       console.log('modifyData--> ',modifyData);
            //       }).catch( ()=>{
            //   //       console.log('2--> ',2);
            //     });
            },

            handleNav(route){
              this.setState({ activeView: route })
            },

            addPopup(data){
                seed.plugins.Popovers.openPopup(data);
            },

            styles(s) {

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

                if (!start) { return <Loader show={true} /> }

                return (
                    <div style={ this.styles('root') }>
                        <Navigation handleViews={this.handleNav} activeView={activeView} />
                        <MainRouter/>
                        <Notify />
                        <Caution />
                        <Popup/>
                    </div>
                )
            }
        }
    }
};
