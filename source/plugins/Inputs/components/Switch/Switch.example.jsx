
module.exports = {
    dependencies: ['Inputs.Switch', 'Examples.SimpleExample', 'Examples.ExampleHelper'],
    get(Switch, SimpleExample, ExampleHelper) {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ], 

            propScheme(){ // TODO:  
                return {
                    circleColorOn: { type: 'string' },
                    circleColorOff: { type: 'string' },
                    backgroundOn: { type: 'string' },
                    backgroundOff: { type: 'string' },
                    size: { type: 'number' },
                    checked: { type: 'boolean', group: 'initial' },    
                }
            },

            getInitialState() {
                let defaultProps = Switch.getDefaultProps(); 
                return defaultProps;
            },

            getCode(){
                let { circleColorOn, circleColorOff, backgroundOn, backgroundOff, size, checked } = this.state;

                return (`
<Switch circleColorOn={${circleColorOn}} 
        circleColorOff={${circleColorOff}} 
        backgroundOn={${backgroundOn}}
        backgroundOff={${backgroundOff}} 
        size={${size}} 
        checked={${checked}} />
                `)
            },

            render() {
                let { circleColorOn, circleColorOff, backgroundOn, backgroundOff, size, checked } = this.state;

                return (
                    <SimpleExample 
                        context={this} 
                        code={ this.getCode() } 
                        scheme={ this.propScheme() } >
                        
                       <Switch  circleColorOn={circleColorOn} 
                                circleColorOff={circleColorOff} 
                                backgroundOn={backgroundOn}
                                backgroundOff={backgroundOff} 
                                size={size} 
                                checked={checked} />

                    </SimpleExample>
                )
            }

        }
    }
}
