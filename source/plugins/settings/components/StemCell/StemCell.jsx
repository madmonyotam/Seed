module.exports = {
    name: "StemCell",
    description: 'This is an example of a component',
    dependencies: ['SimpleSwitch.Mixin'],    
    get(Mixin) {
        
        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ],

            propsTypes: {
                componentName: PropTypes.string,
                settingsId: PropTypes.string,
            },

            getDefaultProps(){
                return {
                    componentName: 'Component',
                    settingsId: null
                };
            },
            
            getInitialState() {
                return {
                    componentProps: {},
                };
            },

            componentWillMount () {
                this.initState(this.props);
            },
  
            componentWillReceiveProps (nextProps) {
                if(nextProps.settingsId !== this.props.settingsId ){
                    this.initState(nextProps);
                }
            },

            componentWillUnmount () {
                
            },

            initState(props){
                let { settingsId, componentName } = props;
                let simpleProps = core.simpleProps(`${componentName}.${settingsId}`);
                if(simpleProps) this.setState( { componentProps: simpleProps });
            },

            render() {
                let { componentName } = this.props;
                let { componentProps } = this.state;

                let Component = core.components[`SimpleComponents.${componentName}`];
                Component = Component ? Component : core.components[`SimpleComponents.Component`];

                return <Component {...componentProps} />
            } 

        }
    }
}
