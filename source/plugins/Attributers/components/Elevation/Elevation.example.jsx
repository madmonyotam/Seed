
module.exports = {
    dependencies: ['Attributers.Elevation', 'Attributers.Margin','Inputs.Button', 'Layouts.Center', 'Examples.SimpleExample', 'Examples.ExampleHelper'],
    get(Elevation, Margin, Button, Center, SimpleExample, ExampleHelper) {

        var seed = this;

        var { React, PropTypes, ComponentMixin } = seed.imports;

        return {
            mixins: [ ComponentMixin ],

            propScheme(){ 
                return {
                    level: { type: 'number' },
                    color: { type: 'string' },
                }
            },

            getInitialState() {
                let defaultProps = Elevation.getDefaultProps();
                return defaultProps;
            },

            getCode(){
                let { level, color } = this.state; 
                return [
                    `<Center width={280} height={280} color={'#ddd'} style={{flexWrap:'wrap'}}>`,
                    `    <Elevation level={${level}} color={${color}}>`,
                    `        <Margin all={15}>`,
                    `            <Elevation level={-3} color={'#6d3f75'}>`,
                    `                <Button theme={'default' } variant={'raised' } > Button 01 </Button>`,
                    `            </Elevation>`,
                    `            <Button theme={'default'  } variant={'outlined'}> Button 02 </Button>`,
                    `            <Button theme={'default'  } variant={'flat'    }> Button 03 </Button>`,
                    `            <Button theme={'primary'  } variant={'raised'  }> Button 04 </Button>`,
                    `        </Margin>`,
                    `    </Elevation>`,
                    `</Center>`,
                ].join('\n')
            },

            render() {
                let { level, color } = this.state; 

                return (
                    <SimpleExample context={this} code={ this.getCode() } scheme={ this.propScheme() } style={{ position:'relative' , display: 'flex', flexDirection: 'column'}}>

                        <Center width={280} height={280} color={'#ddd'} style={{flexWrap:'wrap'}}>
                            <Elevation level={level} color={color}>
                                <Margin all={15}>
                                    <Elevation level={-3} color={'#6d3f75'}>
                                        <Button theme={'default' } variant={'raised' } > Button 01 </Button>
                                    </Elevation>
                                    <Button theme={'default'  } variant={'outlined'}> Button 02 </Button>
                                    <Button theme={'default'  } variant={'flat'    }> Button 03 </Button>
                                    <Button theme={'primary'  } variant={'raised'  }> Button 04 </Button>
                                </Margin>
                            </Elevation>
                        </Center>

                    </SimpleExample>
                )
            }

        }
    }
}
