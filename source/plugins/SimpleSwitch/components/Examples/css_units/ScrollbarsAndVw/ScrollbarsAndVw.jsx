
module.exports = {
    name: 'ScrollbarsAndVw',
    dependencies: ['SimpleSwitch.CodeSnippet'],
    get(CodeSnippet) {

        var core = this;
        var { React, PropTypes } = core.imports;

        return {
            propTypes: {
            },

            getDefaultProps(){
                return {
                }
            },

            getInitialState(){
                return {
                }
            },

            styles(s) {
                let navWidth = core.plugins.Settings.get(['config','dimensions',"nav","width"]);
                let expandingMenuWidth = core.plugins.Settings.get(['config','dimensions',"expandingMenu","width"]);
                let appBarHeight = core.plugins.Settings.get(['config','dimensions',"appBar","height"]);
                let styles = {
                    root:{
                    },
                    divDefault:{
                        height: `calc( ( 100vh - ${appBarHeight}px ) /2 )`,
                        width: `calc( ( 100vw - ${navWidth + expandingMenuWidth}px ) / 2 )`,
                        float: "left",
                    },
                    a:{
                        background: "#ffddbb",
                    },
                    b:{
                        background: "#ddbb99",                    
                    },
                    c:{
                        background: "#bb9977",
                    },
                    d:{
                        background: "#997755",
                    },
                }

                return(styles[s]);
            },

            getCode(){
                return `
divDefault:{
    height: "calc( ( 100vh - 48px ) /2 )",
    width: "calc( ( 100vw - 320px ) / 2 )",
    float: "left",
},
a:{
    background: "#ffddbb",
},
b:{
    background: "#ddbb99",                    
},
c:{
    background: "#bb9977",
},
d:{
    background: "#997755",
},
                                    `
            },

            render() {
                return (
                    <div style={this.styles('root')}>
                        <CodeSnippet code={this.getCode()}/>
                        <div style={{...this.styles('divDefault'), ...this.styles('a')}}></div>
                        <div style={{...this.styles('divDefault'), ...this.styles('b')}}></div>
                        <div style={{...this.styles('divDefault'), ...this.styles('c')}}></div>
                        <div style={{...this.styles('divDefault'), ...this.styles('d')}}></div>
                        <div style={{...this.styles('divDefault'), ...this.styles('a')}}></div>
                        <div style={{...this.styles('divDefault'), ...this.styles('b')}}></div>
                    </div>
                );
            }
        };
    }
};
