
module.exports = {
    dependencies: ['Layouts.Center','Examples.SimpleExample','Decorators.Ripple'],
    get(Center, SimpleExample, Ripple) {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            propScheme(){ 
                return {
                    color: { type: 'default' },
                    animationSpeed: { type: 'number'}
                }
            },

            getInitialState() {
                let defaultProps = Ripple.getDefaultProps();
                return defaultProps;
            },

            getCode(){
                let { color, animationSpeed } = this.state;

                return (`
<Ripple color={${color}} animationSpeed={${animationSpeed}}>                            
    <Center height={100} width={100} color={'#ddd'}>
        <span>{core.translate('ripple')}</span>
    </Center>
</Ripple>
                `)
            },

            render() {
                let { color, animationSpeed } = this.state;

                return (
                    <SimpleExample context={this} code={ this.getCode() } scheme={ this.propScheme() } style={{justifyContent:'space-around'}}>

                        <Ripple color={color} animationSpeed={animationSpeed}>                            
                            <Center height={100} width={100} color={'#ddd'}>
                                <span>{core.translate('ripple')}</span>
                            </Center>
                        </Ripple>

                        <Ripple color={color} animationSpeed={animationSpeed}>                            
                            <Center height={200} width={200} color={'#ddd'} >
                                <span>{core.translate('ripple')}</span>
                            </Center>
                        </Ripple>

                        <Ripple color={color} animationSpeed={animationSpeed}>                            
                            <Center height={300} width={300} color={'#ddd'} >
                                <span>{core.translate('ripple')}</span>
                            </Center>
                        </Ripple>
            
                    </SimpleExample>
                )
            }

        }
    }
}
