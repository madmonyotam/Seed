
module.exports = {
    dependencies: [
        'Attributers.Elevation', 'Attributers.Margin', 'Buttons.Button', 'Layouts.Center', 'Layouts.Row',
        'Simple.Label', 'Examples.SimpleExample', 'Examples.ExampleHelper'],
    get(Elevation, Margin, Button, Center, Row,
        Label, SimpleExample, ExampleHelper) {

        var seed = this;

        var { React, PropTypes, ComponentMixin } = seed.imports;

        return {
            mixins: [ ComponentMixin ],

            propScheme(){ 
                return {
                    level: { type: 'select', options: [ 0, 1, 2, 3, 4, 5, 6, 7 ]},
                    color: { type: 'string' },
                    play: { type: 'boolean' },
                    playRythm: { type: 'number' },
                }
            },

            getInitialState() {
                let defaultProps = Elevation.getDefaultProps();
                defaultProps.play = false;
                defaultProps.playRythm = 200;
                defaultProps.up = true;
                return defaultProps;
            },

            getCode(){
                let { level, color } = this.state; 
                return [
                    `<Center width={280} height={280} color={'#ddd'} style={{flexWrap:'wrap'}}>`,
                    `    <Elevation level={${level}} color={${color}}>`,
                    `        <Margin all={15}>`,
                    `            <Elevation level={7} color={'#6d3f75'}>`,
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

            animate() {
                let {play, playRythm} = this.state;
                const levelLimit = 7;
                if (play) {
                    setTimeout(() => {
                        this.setState((state, props)=>{
                            let level = state.level;
                            let up = state.up;
                            level = (state.up) ? level + 1 : level - 1;
                            if (0 > level || level > levelLimit) level = 0;
                            if (level == levelLimit) up = false;
                            if (level == 0) up = true;
                            return {level, up}
                        });
                    }, playRythm);
                }
            },

            render() {
                let { level, color } = this.state;
                this.animate();

                return (
                    <SimpleExample context={this} code={ this.getCode() } scheme={ this.propScheme() } style={{ position:'relative' , display: 'flex', flexDirection: 'column'}}>

                        <Row height={90}>
                            <Margin all={10}>
                                <Elevation level={level} color={color}>
                                    <Button theme={'default'  } variant={'outlined'}> Button 01 </Button>
                                    <Button theme={'default'  } variant={'flat'    }> Button 02 </Button>
                                    <Button theme={'default'  } variant={'raised'  }> Button 03 </Button>
                                    <Button theme={'primary'  } variant={'raised'  }> Button 04 </Button>
                                    <Button theme={'secondary'} variant={'raised'  }> Button 05 </Button>
                                    <div style={{backgroundColor: 'purple', width: 25, height: 25, borderRadius: '50%'}} />
                                </Elevation>
                            </Margin>
                        </Row>

                        <Elevation level={level} color={color}>
                            <Row>
                                <Label label={'Non dolorum et nemo et quibusdam nisi quisquam error. Laboriosam veniam in similique tempora praesentium est. Tempora omnis itaque repudiandae cumque dolores non eum. Perferendis assumenda est autem consequatur soluta. Esse quia maiores aut ut soluta omnis nulla fugit.'}/>
                            </Row>
                        </Elevation>

                        <Center>
                            <Margin all={10}>
                                <Elevation level={level} color={color}>
                                    <Center height={100} width={100} color={'#ddd'}>
                                        <span>{seed.translate('Elevation')}</span>
                                    </Center>
                                </Elevation>

                                <Elevation level={level} color={color}>
                                    <Center height={200} width={200} color={'#ddd'} >
                                        <span>{seed.translate('Elevation')}</span>
                                    </Center>
                                </Elevation>

                                <Elevation level={level} color={color}>
                                    <Center height={300} width={300} color={'#ddd'} >
                                        <span>{seed.translate('Elevation')}</span>
                                    </Center>
                                </Elevation>
                            </Margin>
                        </Center>

                    </SimpleExample>
                )
            }

        }
    }
}
