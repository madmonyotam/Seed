
module.exports = {
    name: 'FullscreenSectionsExample',
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
                let styles = {
                    root:{
                        width:'100%',
                        textAlign: 'center',
                        fontFamily: 'Lato',
                    },
                    fullscreen:{
                        fontSize: '6em',
                        width: '100%',
                        height: 'calc( 100vh - 48px )',
                        color: 'white',
                        padding: '40vh',
                    },
                    a:{
                        background: 'url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/vwa.jpg") center/cover',
                    },
                    b:{
                        background: '#aadd66',
                    },
                    c:{
                        background: 'url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/vwc.jpg") center/cover',
                    },
                    d: {
                        background: '#ddaa66',
                    },
                    p:{
                        boxSizing: 'border-box',
                        margin: 0,
                    },                }

                return(styles[s]);
            },

            getCode(){
                return `
root:{
    width:'100%',
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: '6em',
},
fullscreen:{
    width: '100%',
    height: 'calc( 100vh - 48px )',
    color: 'white',
    padding: '40vh',
},
a:{
    background: 'url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/vwa.jpg") center/cover',
},
b:{
    background: '#aadd66',
},
c:{
    background: 'url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/vwc.jpg") center/cover',
},
d: {
    background: '#ddaa66',
},
p:{
    boxSizing: 'border-box',
    margin: 0,
},
                                    `
            },

            render() {
                return (
                    <div style={this.styles('root')}>
                        <CodeSnippet code={this.getCode()}/>
                        <div style={{...this.styles('fullscreen'),...this.styles('a')}}><p style={this.styles('p')}>a</p></div>
                        <div style={{...this.styles('fullscreen'),...this.styles('b')}}><p style={this.styles('p')}>b</p></div>
                        <div style={{...this.styles('fullscreen'),...this.styles('c')}}><p style={this.styles('p')}>c</p></div>
                        <div style={{...this.styles('fullscreen'),...this.styles('d')}}><p style={this.styles('p')}>d</p></div>
                    </div>
                );
            }
        };
    }
};
