
module.exports = {
    dependencies: ['Popovers.Popup', 'Examples.SimpleExample', 'Examples.ExampleHelper', 'Buttons.Button', 'Popovers.PopupHandler'],
    get(Popup, SimpleExample, ExampleHelper, Button, PopupHandler) {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ], 

            propScheme(){
                return {
                    titleHeight: {type: 'string'},
                    width: {type: 'string'},
                    height: {type: 'string'},
                    titleLabelColor: {type: 'string'},
                    titleColor: {type: 'string'},
                    backdropColor: {type: 'string'},
                    background: {type: 'string'},
                    footerBackground: {type: 'string'},
                }
            },

            getInitialState() {
                let defaultProps = Popup.getDefaultProps();
                    defaultProps.id = 'ExamplePopup';
                return defaultProps;
            },

            getCode(){
                let { titleHeight, width, height, titleLabelColor, titleColor, backdropColor, background, footerBackground } = this.state;

                return [
                    `/** at outer render */`,
                    `<Popup`,
                    `    id={'ExamplePopup'}`,
                    `    titleHeight={${titleHeight}} // the minimum height is 25px`,
                    `    width={${width}} // the minimum width is 250px`,
                    `    height={${height}} // the minimum height is 50px`,
                    `    titleLabelColor={'${titleLabelColor}'}`,
                    `    titleColor={'${titleColor}'}`,
                    `    backdropColor={'${backdropColor}'}`,
                    `    background={'${background}'}`,
                    `    footerBackground={'${footerBackground}'}`,
                    `/>`,
                    ` `,
                    `/** at the caller */`,
                    `PopupHandler.open({`,
                    `    id:'ExamplePopup', // FOR USING THE MAIN POPUP, REMOVE THIS LINE`,
                    `    parameters: {`,
                    `        title: seed.translate('Popup Title'),`,
                    `        body: <div> I am the popup body content</div>,`,
                    `        okButton: {`,
                    `            btnTitle: seed.translate('Ok'),`,
                    `            btnFunc: ()=>{console.log('Ok')}`,
                    `        }`,
                    `    }`,
                    `});`,
                ].join('\n');
            },

            handleOpen() {
                let {id} = this.state;
                PopupHandler.open({
                    id: id,
                    parameters: {
                        title: seed.translate('Popup Title'),
                        body: <div> I am the popup body content</div>,
                        okButton: {
                            btnTitle: seed.translate('Ok'),
                            btnFunc: ()=>{console.log('Ok')}
                       }
                    }
                });

            },

            render() {
                let { titleHeight, width, height, titleLabelColor, titleColor, backdropColor, background, footerBackground, id } = this.state;
                titleHeight = ExampleHelper.ifNumber_Convert(titleHeight);
                width = ExampleHelper.ifNumber_Convert(width);
                height = ExampleHelper.ifNumber_Convert(height);

                return (
                    <SimpleExample 
                        context={this} 
                        code={ this.getCode() } 
                        scheme={ this.propScheme() } 
                        exampleHeight={ '65%' }
                        codeHeight={ '35%' }
                    >
                        
                        <Button onClick={this.handleOpen}> Open </Button>

                        <Popup
                            id={id}
                            titleHeight={ titleHeight }
                            width={ width }
                            height={ height }
                            titleLabelColor={ titleLabelColor }
                            titleColor={ titleColor }
                            backdropColor={ backdropColor }
                            background={ background}
                            footerBackground={ footerBackground}
                        />
                    </SimpleExample>
                )
            }

        }
    }
}
