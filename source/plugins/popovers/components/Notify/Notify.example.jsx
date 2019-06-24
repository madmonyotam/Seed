
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
                    `emitAlert() {`,
                    `    let text = '${text}';`,
                    `    let alertKind = '${alertKind}';`,
                    `    let position = '${position}'; // optional`,
                    `    let autoDismiss = ${autoDismiss}; // optional`,
                    `    seed.emit('notify', {text, alertKind, position, autoDismiss});`,
                    `}`,
                    ` `,
                    `<Button onClick={this.emitAlert}> Open </Button>`,
                    ` `,
                    `/** at the caller*/`,
                    `<Notify/>`,
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
                        exampleHeight={ '70%' }
                        codeHeight={ '30%' }
                    >

                        <Button onClick={this.emitAlert}> Open </Button>

                    </SimpleExample>
                )
            }

        }
    }
}
