module.exports = {
    name: "GridManagerExample",
    description: '',
    dependencies: ['SimpleSwitch.Mixin','SimpleSwitch.CodeSnippet','widgetManager.GridManager','widgetManager.Widget'],    
    get(Mixin,CodeSnippet,GridManager,Widget) {
        
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
                    widgetList : [
                        {   placement: {x:0, y: 0, w: 2, h: 7, minW: 2, minH: 2},
                            content: ( <Widget> <div style={ {backgroundColor: 'orangered', width: '100%', height: '100%'} }>1</div> </Widget> )
                        },{
                            placement: {x:2, y: 0, w: 6, h: 3, minW: 2, minH: 2},
                            content: ( <Widget> <div style={ {backgroundColor: 'lime', width: '100%', height: '100%'} }>2</div> </Widget> )
                        },{
                            placement: {x:2, y: 4, w: 2, h: 4, minW: 2, minH: 2},
                            content: ( <Widget> <div style={ {backgroundColor: 'yellow', width: '100%', height: '100%'} }>3</div> </Widget> )
                        },{
                            placement: {x:4, y: 4, w: 4, h: 4, minW: 2, minH: 2},
                            content: ( <Widget> <div style={ {backgroundColor: 'papayawhip', width: '100%', height: '100%'} }>4</div> </Widget> )
                        },{
                            placement: {x:9, y: 0, w: 2, h: 2, minW: 2, minH: 2},
                            content: ( <Widget> <div style={ {backgroundColor: 'violet', width: '100%', height: '100%'} }>5</div> </Widget> )
                        },
                    ],
        

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

            componentWillUpdate(nextProps, nextState) {
            },

            componentWillUnmount () {
                
            },

            initUnits(){

            },

            styles(s){

                const styles = {
                    root: {
                    },
                
                }
                
                return(styles[s]);
            },

            getCode(){
                return `
widgetList : [
    {   placement: {x:0, y: 0, w: 2, h: 7, minW: 2, minH: 2},
        content: ( <Widget> <div style={ {backgroundColor: 'orangered', width: '100%', height: '100%'} }>1</div> </Widget> )
    },{
        placement: {x:2, y: 0, w: 6, h: 3, minW: 2, minH: 2},
        content: ( <Widget> <div style={ {backgroundColor: 'lime', width: '100%', height: '100%'} }>2</div> </Widget> )
    },{
        placement: {x:2, y: 4, w: 2, h: 4, minW: 2, minH: 2},
        content: ( <Widget> <div style={ {backgroundColor: 'yellow', width: '100%', height: '100%'} }>3</div> </Widget> )
    },{
        placement: {x:4, y: 4, w: 4, h: 4, minW: 2, minH: 2},
        content: ( <Widget> <div style={ {backgroundColor: 'papayawhip', width: '100%', height: '100%'} }>4</div> </Widget> )
    },{
        placement: {x:9, y: 0, w: 2, h: 2, minW: 2, minH: 2},
        content: ( <Widget> <div style={ {backgroundColor: 'violet', width: '100%', height: '100%'} }>5</div> </Widget> )
    },
],

////////////////////////////////////////

<GridManager widgets={widgetList}/>
                `
            },
            
            render() {
                let {widgetList} = this.props;

                return (
                    <div style={this.styles('root')}>
                        <CodeSnippet code={this.getCode()}/>
                        <GridManager widgets={widgetList}/>
                    </div>
                )
            } 

        }
    }
}
