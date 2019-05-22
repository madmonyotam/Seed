
module.exports = {
    dependencies: ['Examples.ExampleHelper', 'Examples.SimpleExample','Inputs.IconButton'],
    get(ExampleHelper, SimpleExample, IconButton) {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            propScheme(){ 
                return {
                    iconSize: { type: 'number', group: 'initial' },
                    iconColor: { type: 'string', group: 'initial' },
                    background: { type: 'string', group: 'initial' },
                    icon: { type: 'icon', group: 'initial'},
                    variant: { type: 'select', group: 'initial', options: [ 'raised', 'outlined', 'flat' ] },
                }
            },

            getInitialState() {
                let defaultProps = IconButton.getDefaultProps();
                
                defaultProps.clickResult = '';
                
                return defaultProps;
            },

            getCode(){
                let { icon, iconSize, iconColor, background, variant, clickResult } = this.state;

                return [
                    `<IconButton`,
                    `   icon={${icon}}`,
                    `   iconColor={${iconColor}}`,
                    `   iconSize={${iconSize}}`,
                    `   background={${background}}`,
                    `   variant={${variant}}`,
                    `   onClick={console.log('a: ', a)}`,
                    `/>`,
                    ``,
                    `>> a: ${clickResult}`
                ].join('\n');
            },

            printA() {
                this.setState((state, props) => ({
                    clickResult: `${state.clickResult}, a`
                }));
            },

            render() {
                let { icon, iconSize, iconColor, background, variant, onClick } = this.state;
                let size = ExampleHelper.ifNumber_Convert(iconSize);

                return (
                    <SimpleExample context={this} code={ this.getCode() } scheme={ this.propScheme() } >

                        <IconButton
                            icon={icon}
                            iconColor={iconColor}
                            iconSize={size}
                            background={background}
                            variant={variant}
                            onClick={this.printA}
                        />
            
                    </SimpleExample>
                )
            }

        }
    }
}
