
module.exports = {
    name: 'EasyFullscreenPageScrollWithBackgroundReveal',
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
                        margin: 0,
                    },
                    defaultDiv:{
                        height: "100vh", 
                        boxSizing: "border-box",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center", 
                        flexDirection: "column",
                        padding: "2vw",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundAttachment: "fixed",
                        fontSize: "2vw",
                    },
                    firstDiv:{
                        backgroundImage: "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/iceland-fjords.jpg)",                    },
                    thirdDiv:{
                        backgroundImage: "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/iceland-pool-faces.jpg)",
                    },
                    fifthDiv:{
                        backgroundImage: "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/iceland-ice.jpg)",
                    },

                }

                return(styles[s]);
            },

            getCode(){
                return `
defaultDiv:{
    height: "100vh", 
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center", 
    flexDirection: "column",
    padding: "2vw",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    fontSize: "2vw",
},
firstDiv:{
    backgroundImage: "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/iceland-fjords.jpg)",                    },
thirdDiv:{
    backgroundImage: "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/iceland-pool-faces.jpg)",
},
fifthDiv:{
    backgroundImage: "url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/iceland-ice.jpg)",
} `
            },

            render() {
                return (
                    <div style={this.styles('root')}>

                        <CodeSnippet code={this.getCode()}/>

                        <div style={{...this.styles('firstDiv'),...this.styles('defaultDiv')}}>
                            <h1>Come To Iceland</h1>
                        </div>

                        <div style={this.styles('defaultDiv')}>
                            <h1>The last settled part of Europe, much of Iceland remains pristine and untouched.</h1>
                        </div>

                        <div style={{...this.styles('thirdDiv'),...this.styles('defaultDiv')}}>
                            <h1>Population: 325,671</h1>
                            <h1>Area: 103,001km<sup>2</sup></h1>
                            <h1>= 3 people per square km</h1>
                        </div>

                        <div style={this.styles('defaultDiv')}>
                            <h1>With abundant geothermal energy, Iceland is also one of the greenest places on earth.</h1>
                        </div>

                        <div style={{...this.styles('fifthDiv'),...this.styles('defaultDiv')}}>
                            <h1>Come to Iceland. You’ll be amazed.</h1>
                        </div>
                    </div>
                );
            }
        };
    }
};
