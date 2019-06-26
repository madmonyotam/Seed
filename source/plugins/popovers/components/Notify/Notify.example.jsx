
module.exports = {
    dependencies: ['Popovers.Notify', 'Examples.SimpleExample', 'Examples.ExampleHelper', 'Buttons.Button', 'Popovers.PopupHandler'],
    get(Notify, SimpleExample, ExampleHelper, Button, PopupHandler) {

        var seed = this;

        var { React, PropTypes, ComponentMixin } = seed.imports;

        return {
            mixins: [ ComponentMixin ], 

            propScheme(){ // TODO:  
                return {
                    text: {type: 'string'},
                    alertKind: { type: 'select', options: [ 'error', 'success', 'warning', 'info' ]},
                    position: { type: 'select', options: [ 'topLeft', 'topCenter', 'topRight', 'bottomRight', 'bottomCenter', 'bottomLeft' ]},
                    autoDismiss: { type: 'number' },
                }
            },

            getInitialState() {
                let defaultProps = Notify.getDefaultProps();
                defaultProps.text = 'Alert text';
                defaultProps.alertKind = 'success';
                return defaultProps;
            },

            getCode(){
                let { text, alertKind, position, autoDismiss} = this.state;

                return [
                    `/** at main render */`,
                    `<Notify`,
                    `    position={'${position}'} // optional, the default is 'bottomLeft'`,
                    `    autoDismiss={${autoDismiss}} // optional, the default is 4`,
                    `    distance={100} // from window corner - optional, the default is 100(px)`,
                    `/>`,
                    ` `,
                    `/** at the caller*/`,
                    `emitAlert() {`,
                    `    let text = '${text}';`,
                    `    let alertKind = '${alertKind}';`,
                    `    let position = '${position}'; // optional`,
                    `    let autoDismiss = ${autoDismiss}; // optional`,
                    `    seed.emit('notify', {text, alertKind, position, autoDismiss});`,
                    `}`,
                    ` `,
                    `<Button onClick={this.emitAlert}> Open </Button>`,
                ].join('\n');
            },

            emitAlert() {
                let {text, alertKind, position, autoDismiss} = this.state;
                    seed.emit('notify', {text, alertKind, position, autoDismiss});
            },

            render() {

                return (
                    <SimpleExample 
                        context={this} 
                        code={ this.getCode() } 
                        scheme={ this.propScheme() } 
                        exampleHeight={ '50%' }
                        codeHeight={ '50%' }
                    >

                        <Button onClick={this.emitAlert}> Open </Button>

                    </SimpleExample>
                )
            }

        }
    }
}
