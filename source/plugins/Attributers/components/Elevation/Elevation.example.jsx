
module.exports = {
    dependencies: ['Attributers.Elevation', 'Attributers.Margin','Buttons.Button', 'Layouts.Center', 'Examples.SimpleExample', 'Examples.ExampleHelper'],
    get(Elevation, Margin, Button, Center, SimpleExample, ExampleHelper) {

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

                        <Center width={280} height={280} color={'#ddd'} style={{flexWrap:'wrap'}}>
                            <Elevation level={level} color={color}>
                                <Margin all={15}>
                                    <Elevation level={7} color={'#6d3f75'}>
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
