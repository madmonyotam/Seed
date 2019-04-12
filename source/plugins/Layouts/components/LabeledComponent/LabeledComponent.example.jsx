
module.exports = {
    dependencies: ['SimpleSwitch.Mixin', 'Layouts.LabeledComponent', 'Examples.SimpleExample','Simple.Badge','Simple.Label',
      'Examples.ExampleHelper', 'Layouts.Row'],
    get(Mixin, LabeledComponent, SimpleExample, Badge, Label, ExampleHelper, Row) {

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
                };
            },

            propScheme(){ // TODO:  
                return {
                    title: { type: 'string' },
                    required: { type: 'boolean' },
                    titlePosition: { type: 'array', value: ['left', 'top'] },
                    textSize: { type: 'number' },
                    background: { type: 'default'},
                    width: { type: 'default'}
                }
            },

            getInitialState() {
                let defaultProps = LabeledComponent.getDefaultProps();
                defaultProps.required = false;

                return defaultProps;
            },

            getCode(){
                let { title, required, titlePosition, textSize, background, width } = this.state;

                return [
                    `<LabeledComponent`,
                    `    title={${title}}`,
                    `    required={${required}}`,
                    `    titlePosition={${titlePosition}} //['left' / 'top']`,
                    `    textSize={${textSize}}`,
                    `    background={${background}}`,
                    `    width={${width}}`,
                    `>`,
                    `    <Row color={'#ffffff'}>`,
                    `        <Label width={'100%'} label={"I'm A Row layout"}/>`,
                    `        <Badge count={10}/>`,
                    `    </Row>`,
                    `</LabeledComponent>`,
                ].join('\n');
            },

            render() {
                let { title, required, titlePosition, textSize, background, width } = this.state;
                textSize = ExampleHelper.ifNumber_Convert(textSize);
                width = ExampleHelper.ifNumber_Convert(width);

                return (
                    <SimpleExample context={this} code={ this.getCode() } scheme={ this.propScheme() } >
                            <LabeledComponent
                                title={title}
                                required={required}
                                titlePosition={titlePosition}
                                textSize={textSize}
                                background={background}
                                width={width}
                            >
                                <Row color={'#ffffff'}>
                                    <Label width={'100%'} label={"I'm A Row layout"}/>
                                    <Badge count={10}/>
                                </Row>
                            </LabeledComponent>
                    </SimpleExample>
                )
            }

        }
    }
}
