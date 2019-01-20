
module.exports = {
    name: 'PerfectlyFittingText',
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
                        width: '100%',
                        fontFamily: 'Lato',
                        textAlign: 'center',
                        margin: 0,
                    },
                    h1:{
                        fontSize: 'calc( 2em + 2vw )',
                    },
                    h2:{
                        fontSize: 'calc( 1.5em + 0.75vw )',
                    },
                }

                return(styles[s]);
            },

            getCode(){
                return `
root:{
    width: '100%',
    fontFamily: 'Lato',
    textAlign: 'center',
    margin: 0,
},
h1:{
    fontSize: 'calc( 2em + 2vw )',
},
h2:{
    fontSize: 'calc( 1.5em + 0.75vw )',

},
                                    `
            },

            render() {
                return (
                    <div style={this.styles('root')}>
                        <CodeSnippet code={this.getCode()}/>
                        <h1 style={this.styles('h1')}>Main Heading of the Article</h1>
                        <h2 style={this.styles('h2')}>A Subheading of the Article</h2>
                    </div>
                );
            }
        };
    }
};
