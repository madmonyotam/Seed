
module.exports = {
    dependencies: ['Attributers.Margin','Buttons.Button', 'Layouts.Center', 'Examples.SimpleExample', 'Examples.ExampleHelper'],
    get(Margin, Button, Center, SimpleExample, ExampleHelper) {

        var seed = this;

        var { React, PropTypes, ComponentMixin } = seed.imports;

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
                let defaultProps = Margin.getDefaultProps();
                return defaultProps;
            },

            getCode(){
                let { all, top, right, bottom, left } = this.state;

                return [
                    `<Center width={280} height={280} color={'#ddd'} style={{flexWrap:'wrap'}}>`,
                    `    <Margin all={${all}} top={${top}} right={${right}} bottom={${bottom}} left={${left}}>`,
                    `        <Button theme={'default'  } variant={'raised'  }> Button 01 </Button>`,
                    `        <Button theme={'default'  } variant={'outlined'}> Button 02 </Button>`,
                    `        <Button theme={'default'  } variant={'flat'    }> Button 03 </Button>`,
                    `        <Button theme={'primary'  } variant={'raised'  }> Button 04 </Button>`,
                    `        <Button theme={'primary'  } variant={'outlined'}> Button 05 </Button>`,
                    `        <Button theme={'primary'  } variant={'flat'    }> Button 06 </Button>`,
                    `        <Button theme={'secondary'} variant={'raised'  }> Button 07 </Button>`,
                    `        <Button theme={'secondary'} variant={'outlined'}> Button 08 </Button>`,
                    `        <Button theme={'secondary'} variant={'flat'    }> Button 09 </Button>`,
                    `    </Margin>`,
                    `</Center>`,
                ].join('\n')
            },

            render() {
                let { all, top, right, bottom, left } = this.state; 
                all = ExampleHelper.ifNumber_Convert(all);

                return (
                    <SimpleExample context={this} code={ this.getCode() } scheme={ this.propScheme() } style={{ position:'relative' , display: 'flex', flexDirection: 'column'}}>

                        <Center width={280} height={280} color={'#ddd'} style={{flexWrap:'wrap'}}>
                            <Margin all={all} top={top} right={right} bottom={bottom} left={left}>
                                <Button theme={'default'  } variant={'raised'  }> Button 01 </Button>
                                <Button theme={'default'  } variant={'outlined'}> Button 02 </Button>
                                <Button theme={'default'  } variant={'flat'    }> Button 03 </Button>
                                <Button theme={'primary'  } variant={'raised'  }> Button 04 </Button>
                                <Button theme={'primary'  } variant={'outlined'}> Button 05 </Button>
                                <Button theme={'primary'  } variant={'flat'    }> Button 06 </Button>
                                <Button theme={'secondary'} variant={'raised'  }> Button 07 </Button>
                                <Button theme={'secondary'} variant={'outlined'}> Button 08 </Button>
                                <Button theme={'secondary'} variant={'flat'    }> Button 09 </Button>
                            </Margin>
                        </Center>

                    </SimpleExample>
                )
            }

        }
    }
}
