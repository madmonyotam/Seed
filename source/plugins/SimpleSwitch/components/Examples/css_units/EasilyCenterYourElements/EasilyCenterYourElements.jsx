
module.exports = {
    name: 'EasilyCenterYourElements',
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
                        fontFamily: 'Lato',
                        textAlign: 'center',
                        margin: 0,

                    },
                    centered:{
                        width: '50vw',
                        height: '50vh',
                        margin: '15vh auto',
                        background: 'brown',
                        paddingTop: '20px',
                    },
                    h1:{
                        fontSize: '4em',
                        color: 'white',
                    }
            }

                return(styles[s]);
            },

            getCode(){
                return `
root:{
    fontFamily: 'Lato',
    textAlign: 'center',
    margin: 0,

},
centered:{
    width: '50vw',
    height: '50vh',
    margin: '15vh auto',
    background: 'brown',
    paddingTop: '20px',
},
h1:{
    fontSize: '4em',
    color: 'white',
}
                `
            },

            render() {
                return (
                    <div style={this.styles('root')}>

                        <CodeSnippet code={this.getCode()}/>

                        <div style={this.styles('centered')}>
                            <h1 style={this.styles('h1')}>
                                Heading
                            </h1>
                        </div>
                        
                    </div>
                );
            }
        };
    }
};
