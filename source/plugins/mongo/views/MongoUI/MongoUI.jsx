import { Paper, Button, Typography } from '@material-ui/core';
import { isEmpty } from 'lodash';
module.exports = {
    name: "MongoUI",

    dependencies: ['SimpleSwitch.Mixin', 'Simple.Loader'],

    get( Mixin, Loader ) {

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
                  isLoading: false,
                  collections: [],
                  message: ''
                };
            },

            componentWillMount() {
                this.initUnits()
            },

            componentDidMount() {
              this.handleCheckConnection()
            },

            componentWillUnmount() {
            },

            componentWillReceiveProps(nextProps) {

            },

            initUnits(){
              this.colors = {
                header: core.theme('backgrounds.content')
              }
            },

            styles(propName) {
              let styles = {
                  root: {
                      display: 'flex',
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                  },
                  paper: {
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    width: 400,
                    height: 400,
                    padding: 15
                  },
                  button: {
                    width: 'fit-content',
                    maxHeight: '35px',
                    height: '35px',
                    marginBottom: 15
                  },
                  paperheader: {
                    width: 815,
                    marginBottom: 15,
                    height: 50,
                    display: 'flex',
                    alignItems: 'center',
                    padding: '15px',
                    background: this.colors.header
                  }
              }
              return styles[propName]
            },

            handleCheckConnection(){

              core.plugins.Mongo.run('Mongodb.is.connected')
                  .then(( res )=>{
                    this.setState({
                      collections: [],
                      message: res.msg,
                      isConnected: res.connected
                    });
                  })
                  .catch((err)=>{
                    this.setState({
                      collections: [],
                      message: err.data.msg,
                      isConnected: false
                    });
                  });
            },

            handleToggleConnection(e){
              let runString = `Mongodb.${this.state.isConnected ? 'dis' : ''}connect`;

              core.plugins.Mongo.run(runString)
                  .then(( { connected, msg } )=>{
                    this.setState({ isConnected: connected, message: msg })
                  })
                  .catch((error)=>{
                    if (error.msg) this.setState({ message: error.msg })
                  });
            },

            handleAddCollection(e){
              let collectionName = null//'createdFromUi';

              core.plugins.Mongo.run('Mongodb.create.collection', { name: collectionName })
                  .then(( res )=>{
                    console.debug('[res] ', res)
                  })
                  .catch((error)=>{
                    if (error.msg) this.setState({ message: error.msg })
                  });
            },

            handleGetCollections(e, collectionName){
              this.setState({ isLoading: true })
              core.plugins.Mongo.run('Mongodb.get.collections', { name: collectionName })
                  .then(( res )=>{
                    if (res.data && !isEmpty(res.data)) {
                      if (!collectionName) {
                        let collections = res.data.map( coll => {
                          return {
                            name: coll.name,
                            type: coll.type,
                            info: coll.info
                          }
                        });

                        this.setState({ collections, isLoading: false })
                      } else {
                        console.debug('[handleGetCollections] ', res)
                        this.setState({ selectedCollection: collectionName, isLoading: false })
                      }

                    } else this.setState({ isLoading: false })
                  })
                  .catch((error)=>{
                    this.setState({ isLoading: false, message: error.msg })
                  });
            },

            render() {
              let { collections, isConnected, isLoading, message } = this.state;
                return (
                  <div style={ this.styles('root') }>
                    <Paper elevation={ 6 } style={ this.styles('paperheader') } >
                      <Typography style={{ fontSize: 13, fontWeight: 500 }}>
                        <code>
                        { message }
                        </code>
                      </Typography>
                    </Paper>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Paper elevation={ 3 } style={ this.styles('paper') } >

                        <Button style={ this.styles('button') } variant={ 'contained' } onClick={ this.handleCheckConnection }>
                          <Typography>  Refresh </Typography>
                        </Button>
                        <Button style={ this.styles('button') } variant={ 'contained' } onClick={ this.handleToggleConnection }>
                          <Typography> { !isConnected ? 'Connect' : 'Disonnect' } </Typography>
                        </Button>

                        <Button disabled={ !isConnected } style={ this.styles('button') } variant={ 'contained' } onClick={ this.handleAddCollection }>
                          <Typography> Add Collection </Typography>
                        </Button>

                        <Button disabled={ !isConnected } style={ this.styles('button') } variant={ 'contained' } onClick={ this.handleGetCollections }>
                          <Typography> Get Collections </Typography>
                        </Button>



                      </Paper>
                      <Paper elevation={ 3 } style={{ ...this.styles('paper'), marginLeft: 15 }} >
                      {
                        collections && collections.length ? collections.map((coll, index) => {
                          return (
                            <Button key={ index } style={ this.styles('button') } variant={ 'outlined' } onClick={ e => { this.handleGetCollections(e, coll.name) } }>
                              <Typography> { coll.name } </Typography>
                            </Button>
                          )
                        }) : null
                      }

                        <Loader show={ isLoading } />



                      </Paper>
                      </div>

                  </div>
                )
            }
        }
    }
}
