
module.exports = {
    name: 'FluidHeader',
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

                    },
                    header:{
                        background: "purple",
                        color: "white",
                        padding: "10vmin 1rem",
                        textAlign: "center",
                        margin: "0 0 8vmin 0",
                    },
                    h1:{
                        margin: 0,
                        fontSize: "5rem",
                        fontSize: "calc(24px + (48 - 24) * ((100vw - 300px) / (1600 - 300)))",
                    },
                    p:{
                        maxWidth: 600,
                        margin: "0 auto 1rem",
                        padding: "0 1rem",
                        textIndent: "1rem",
                    },


                }

                return(styles[s]);
            },

            getCode(){
                return `
header:{
    background: "purple",
    color: "white",
    padding: "10vmin 1rem",
    textAlign: "center",
    margin: "0 0 8vmin 0",
},
h1:{
    margin: 0,
    fontSize: "5rem",
    fontSize: "calc(24px + (48 - 24) * ((100vw - 300px) / (1600 - 300)))",
},
p:{
    maxWidth: 600,
    margin: "0 auto 1rem",
    padding: "0 1rem",
    textIndent: "1rem",
},
                                    `
            },

            render() {
                return (
                    <div style={this.styles('root')}>
                        <CodeSnippet code={this.getCode()}/>
                        <div style={this.styles('header')}>
                            <h1 style={this.styles('h1')}>Fluid Header</h1>
                        </div>

                        <p style={this.styles('p')}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                            Natus nisi voluptate delectus illo consequatur voluptas 
                            aut, enim nesciunt, veniam beatae voluptates sint id at 
                            corrupti magnam velit unde debitis minus!</p>
                        <p style={this.styles('p')}>Quae quia numquam dolore porro neque magnam saepe magni, 
                            aut, ut itaque explicabo facere exercitationem nam cumque 
                            voluptatibus molestias adipisci labore fugit maiores qui, 
                            similique dignissimos non, consectetur! Ullam, ratione.</p>

                    </div>
                );
            }
        };
    }
};
