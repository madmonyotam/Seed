import { AppBar, Typography, Icon } from '@material-ui/core';
import { isEmpty, uniqueId } from 'lodash';
module.exports = {
    name: "Toolbar",

    dependencies: ['SimpleSwitch.Mixin', 'Mongo.Handler', 'Simple.Loader'],

    get( Mixin, Handler, Loader) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ],

            propsTypes: {
            },

            getDefaultProps(){
                return {};
            },

            getInitialState() {
                return {
                  isConnected: false,
                  mongoSaving: false,
                  mongoLoading: false,
                  isLoading: false,
                  collections: [],
                  message: 'Mongo is inactive'
                };
            },

            componentWillMount() {
                this.initUnits()
            },

            componentDidMount() {
              this.currentUser = this.initUser();
              this.handleCheckConnection();
            },

            componentWillUnmount() {
            },

            componentWillReceiveProps(nextProps) {

            },

            initUser(){
              try {
                let currentUser = JSON.parse(localStorage['currentUser']);
                if (currentUser && !isEmpty(currentUser)) {
                  return currentUser;
                }
              } catch (error) {
                // console.error('error -> ',error);
                let defaultUser = {
                  id: uniqueId('_default_'),
                  email: 'test@email.com'
                }
                localStorage['currentUser'] = JSON.stringify(defaultUser);
                return defaultUser;
              }
              // return {
              //   id: core.uuid()
              // }
            },

            initUnits(){
              this.colors = {
                title: core.theme('colors.title'),
                border: core.theme('borders.default'),
                white: core.theme('colors.white'),
                active: core.theme('colors.selected'),
                activedb: core.theme('backgrounds.green'),
                header: core.theme('backgrounds.content'),
                footerShadow: core.theme('backgrounds.footerShadow'),


              }
              this.divider = <div style={{ width: 1, height: '100%', margin: '0 15px', background: this.colors.border }} />

            },

            styles(propName) {
              const flexRowCenter = {
                alignItems: 'center',
                display: 'flex',
                flexDirection : 'row',
                height: '100%',

              }
              let styles = {
                  root: {
                    ...flexRowCenter,
                    height: 40, 
                    justifyContent: 'space-between',
                    padding: '2.5px 15px',
                    position: 'absolute', 
                    bottom: 0,
                    boxShadow: this.colors.footerShadow
                  },
                  paper: {
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    width: 400,
                    height: 400,
                    padding: 15
                  },
                  flexRowCenter: flexRowCenter,
                  btnWrap: { ...flexRowCenter, padding: '7px 0' },
                  userWrap: { 
                    ...flexRowCenter,
                    fontSize: 12, 
                    fontWeight: 400, 
                    color: this.colors['title'],
                  } 
              }
              return styles[propName]
            },

            handleCheckConnection(){
              this.setState({ isLoading: true })
                Handler.isConnected()
                  .then( isconnected => {
                      console.log(isconnected)
                      this.setState({ isConnected: isconnected });
                      if (isconnected) this.handleGetCollections();
                      else this.setState({ isLoading: false })
                  })
                  .catch((err)=>{ 
                    // console.error('err : ', err);
                    this.setState({
                      isConnected: false,
                      isLoading: false
                    }); 
                  }); 

            },

            handleToggleConnection(e){
              let { isConnected } = this.state;
              
              const setDisconnect = () => {
                this.setState({
                  isConnected: false, 
                  message: 'disconnected' 
                })

              }

              if (isConnected) Handler.disconnect().then(setDisconnect).catch(setDisconnect)
              else Handler.connect().then(()=>{
                this.setState({
                  isConnected: true, 
                  message: 'connected' 
                })
              }).catch(setDisconnect)
            }, 

            handleSaveToMongo(){
              let { saveKey } = this.props;
              let collectionName = this.currentUser.id;
              this.setState({ mongoSaving: true })
 
              let saveItem = {
                '_uid': saveKey,
                'default': Handler.getTree(this.props.saveKey)
              }

              Handler.add({ collectionName, data: saveItem }).then((res)=>{
                this.setState({ mongoSaving: false })
              }).catch((err)=>{
                console.error('error : ', err);
                this.setState({ mongoSaving: false })
              })
            }, 
            
            handleLoadFromMongo(e){
              this.setState({ mongoLoading: true })
              let collectionName = this.currentUser.id//'createdFromUi';
              let { saveKey } = this.props; 

              Handler.findInCollection(collectionName, { '_uid': saveKey })
                    .then((foundData)=>{
                      console.debug('[handleLoadFromMongo / foundData] => ', foundData);
                      this.setState({ mongoLoading: false })
                    })
                    .catch((err)=>{
                      console.error('error : ', err);
                      this.setState({ mongoLoading: false })
                    })
            },

            handleGetCollections(){
              Handler.getCollections(this.currentUser.id)
                .then( res => {
                  if (res && res.length) {
                    this.setState({  collections: res, isLoading: false  })
                  }
                })
                .catch((err)=>{
                  console.error('err : ', err);
                })
            },

            renderMessage(text){
              return (
                <Typography style={{ textTransform: 'capitalize', fontSize: 12, fontWeight: 400, color: this.colors['white'] }}>
                    { text }
                </Typography>
              )
            },

            renderShortUser(){
              let { isLoading, message, isConnected } = this.state;
              if (!this.currentUser) return null;
              return (
                <div style={ this.styles('userWrap') }>
                  <Typography  style={{ fontSize: 'inherit', fontWeight: 'inherit', color: 'inherit' }}>
                    { isConnected ? this.currentUser.email : message  } 
                  </Typography>
                </div>
              )
            },

            renderActionBtns(){
              let { isLoading, mongoSaving, mongoLoading, isConnected } = this.state;
              if (isLoading) return null;
              return (
                <div style={ this.styles('btnWrap') }>
                  {/* <IconWithTooltipAndBadge key={ 1.1 } 
                    onClick={ this.handleSaveToMongo }
                    tooltipTheme={ 'google' }
                    icon={ 'general.save' }
                    isLoading={ mongoSaving }
                    tooltip={ this.renderMessage('save') }
                    disabled={ !isConnected }

                  /> */}
                  <Icon style={{fontSize: 14, margin: '0 10px', cursor: 'pointer' }} key={ 1.1 }  onClick={ this.handleSaveToMongo }>{core.icons('general.save')}</Icon>
                  <Icon style={{fontSize: 14, margin: '0 10px', cursor: 'pointer'}} key={ 1.2 }  onClick={ this.handleLoadFromMongo }>{core.icons('general.upload')}</Icon>
                  {/* <IconWithTooltipAndBadge key={ 1.2 } 
                    onClick={ this.handleLoadFromMongo }
                    isLoading={ mongoLoading }
                    tooltipTheme={ 'google' }
                    icon={ 'files.upload' }
                    tooltip={ this.renderMessage('load') }
                    disabled={ !isConnected }
                  /> */}
                </div>
              )
            }, 

            renderMongoUsage(){

              let { collections, isConnected } = this.state; 
              let msg = !isConnected ? 'Connect' : 'Disonnect';
              return (
                <div style={ this.styles('flexRowCenter') }>
                  <Icon style={{fontSize: 14, margin: '0 10px', cursor: 'pointer'}} key={1.1} onClick={this.handleToggleConnection}>{core.icons(isConnected ? 'connection.power' : 'connection.power_off')}</Icon>
                  <Icon style={{fontSize: 14, margin: '0 10px', cursor: 'pointer'}} key={1.2} onClick={this.handleGetCollections}>{core.icons('connection.db')}</Icon>
                  
                  {/* <IconWithTooltipAndBadge key={ 1 } 
                        onClick={ this.handleToggleConnection }
                        active={ isConnected }
                        activeColor={ this.colors.active }
                        iconSize={ 16 }
                        tooltipTheme={ 'google' }
                        icon={ isConnected ? 'connection.power' : 'connection.power_off' }
                        tooltip={ this.renderMessage(msg) }
                  />

                  <IconWithTooltipAndBadge key={ 1.1 } 
                        onClick={ this.handleGetCollections }
                        active={ collections && collections.length }
                        activeColor={ this.colors.activedb }
                        tooltipTheme={ 'google' }
                        iconSize={ 16 }
                        disabled={ !isConnected }
                        tooltip={ this.renderMessage('Refresh collections')  }
                        badge={ collections && collections.length }
                        badgeStyle={{ height: 13, width: 13, fontSize: 9 ,top: -4, right: -4, border: `1px solid ${this.colors.white}` }}
                        icon={ 'connection.db' } 
                  /> */}
                </div>
              );
            },

            renderLoader(){
              let { isLoading } = this.state;
              return (
                <div style={{ position: 'relative', display: 'flex', alignItems:'center', justifyContent: 'center', width: 30, height: '100%' }}>
                  { isLoading ? 
                    <Loader size={ 15 } show={ true } /> :
                    // <IconWithTooltipAndBadge key={ 2 }
                    //   onClick={ this.handleCheckConnection }
                    //   tooltipTheme={ 'google' }
                    //   icon={ 'general.refresh' }
                    //   tooltip={ this.renderMessage('Check connection') } 
                    // />
                    <Icon style={{fontSize: 14, margin: '0 10px', cursor: 'pointer'}} key={ 2 } onClick={ this.handleCheckConnection }>{core.icons('connection.refresh')}</Icon>
                  }
                </div>

              )
            },
            
            render(){
              let { isLoading } = this.state;

              return (
                <AppBar position="static" color="default" style={ this.styles('root') }>
                    <div style={ this.styles('btnWrap') }>
                      { this.renderLoader() }
                      { isLoading ? null : this.divider }
                      { this.renderActionBtns() }
                    </div>
                    
                    <div style={ this.styles('btnWrap') }>
                      { this.renderShortUser() }
                      { this.divider  } 
                      { this.renderMongoUsage() }
                    </div>

                </AppBar>
              )
            }
        }
    }
}
