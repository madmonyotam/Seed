
module.exports = {
    dependencies: ['Decorators.Margin', 'Decorators.Padding', 'Simple.Label', 'Layouts.Center', 'Examples.SimpleExample', 'Examples.ExampleHelper'],
    get(Margin, Padding, Label, Center, SimpleExample, ExampleHelper) {

        var seed = this;

        var { React, PropTypes, ComponentMixin } = seed.imports;

        const units = {
            boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 1px -1px rgba(0, 0, 0, 0.12)",
        }

        return {
            mixins: [ ComponentMixin ],

            propScheme(){ 
                return {
                    all: { type: 'default', group: 'initial' },
                    top: { type: 'number', group: 'initial' },
                    right: { type: 'number', group: 'initial' },
                    bottom: { type: 'number', group: 'initial' },
                    left: { type: 'number', group: 'initial' },
                }
            },

            getInitialState() {
                let defaultProps = Padding.getDefaultProps();
                return defaultProps;
            },

            getCode(){
                let { all, top, right, bottom, left } = this.state;

                return [
                    `<Center width={280} height={280} color={'#ddd'} style={{flexWrap:'wrap'}}>`,
                    `    <Padding all={${all}} top={${top}} right={${right}} bottom={${bottom}} left={${left}}>`,
                    `        <Margin all={5}>`,
                    `            <Label label={'Label 01'} width={'fit-content'} height={'fit-content'} transform={'none'}/>`,
                    `            <Label label={'Label 01'} width={'fit-content'} height={'fit-content'} transform={'capitalize'}/>`,
                    `            <Label label={'Label 01'} width={'fit-content'} height={'fit-content'} transform={'uppercase'}/>`,
                    `            <Label label={'Label 01'} width={'fit-content'} height={'fit-content'} transform={'lowercase'}/>`,
                    `            <Label label={'Label 01'} width={'fit-content'} height={'fit-content'} transform={'none'}/>`,
                    `            <Label label={'Label 01'} width={'fit-content'} height={'fit-content'} transform={'capitalize'}/>`,
                    `            <Label label={'Label 01'} width={'fit-content'} height={'fit-content'} transform={'uppercase'}/>`,
                    `            <Label label={'Label 01'} width={'fit-content'} height={'fit-content'} transform={'lowercase'}/>`,
                    `            <Label label={'Label 01'} width={'fit-content'} height={'fit-content'} transform={'none'}/>`,
                    `        </Margin>`,
                    `</Center>`,
                ].join('\n')
            },

            render() {
                let { all, top, right, bottom, left } = this.state; 
                all = ExampleHelper.ifNumber_Convert(all);

                return (
                    <SimpleExample context={this} code={ this.getCode() } scheme={ this.propScheme() } style={{ position:'relative' , display: 'flex', flexDirection: 'column'}}>

                        <Center width={280} height={280} color={'#ddd'} style={{flexWrap:'wrap'}}>
                            <Padding all={all} top={top} right={right} bottom={bottom} left={left}>
                                <Margin all={5}>
                                    <Label label={'Label 01'} width={'fit-content'} height={'fit-content'} style={{boxShadow: units.boxShadow}} transform={'none'}/>
                                    <Label label={'Label 01'} width={'fit-content'} height={'fit-content'} style={{boxShadow: units.boxShadow}} transform={'capitalize'}/>
                                    <Label label={'Label 01'} width={'fit-content'} height={'fit-content'} style={{boxShadow: units.boxShadow}} transform={'uppercase'}/>
                                    <Label label={'Label 01'} width={'fit-content'} height={'fit-content'} style={{boxShadow: units.boxShadow}} transform={'lowercase'}/>
                                    <Label label={'Label 01'} width={'fit-content'} height={'fit-content'} style={{boxShadow: units.boxShadow}} transform={'none'}/>
                                    <Label label={'Label 01'} width={'fit-content'} height={'fit-content'} style={{boxShadow: units.boxShadow}} transform={'capitalize'}/>
                                    <Label label={'Label 01'} width={'fit-content'} height={'fit-content'} style={{boxShadow: units.boxShadow}} transform={'uppercase'}/>
                                    <Label label={'Label 01'} width={'fit-content'} height={'fit-content'} style={{boxShadow: units.boxShadow}} transform={'lowercase'}/>
                                    <Label label={'Label 01'} width={'fit-content'} height={'fit-content'} style={{boxShadow: units.boxShadow}} transform={'none'}/>
                                </Margin>
                            </Padding>
                        </Center>

                    </SimpleExample>
                )
            }

        }
    }
}
