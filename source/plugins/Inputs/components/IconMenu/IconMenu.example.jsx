
module.exports = {
    dependencies: ['Examples.ExampleHelper', 'Examples.SimpleExample','Inputs.IconMenu'],
    get(ExampleHelper, SimpleExample, IconMenu) {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            propScheme(){ 
                return {
                    icon: { type: 'icon', group: 'initial'},
                    iconSize: { type: 'number', group: 'initial' },
                    iconColor: { type: 'string', group: 'initial' },
                    background: { type: 'string', group: 'initial' },
                    menuTitle: { type: 'string', group: 'initial' },
                    dropDown: { type: 'boolean', group: 'initial' },
                }
            },

            getInitialState() {
                let defaultProps = IconMenu.getDefaultProps();
                    defaultProps.menuTitle = 'Icon Menu';
                    defaultProps.clickResult = '';
                return defaultProps;
            },

            getCode(){
                let {icon, iconSize, iconColor, background, menuTitle, dropDown, clickResult } = this.state;

                return [
                    `<IconMenu`,
                    `   icon={${icon}} iconSize={${iconSize}}`,
                    `   menuTitle={${menuTitle}}`,
                    `   menuItems={[`,
                    `       { text: 'Table',  value: 'Table',  iconProps: {icon: 'genie.table',  onClick: ()=>{ this.print('table');  } },`,
                    `       { text: 'Code',   value: 'Code',   iconProps: {icon: 'genie.code',   onClick: ()=>{ this.print('code');   } },`,
                    `       { text: 'Create', value: 'Create', iconProps: {icon: 'genie.create', onClick: ()=>{ this.print('create'); } },`,
                    `   ] }`,
                    `   dropDown={${dropDown}}`,
                    `   iconColor={${iconColor}}`,
                    `   background={${background}}`,
                    `/>`,
                    ``,
                    `>> log: ${clickResult}`
                ].join('\n');
            },

            print(char) {
                this.setState((state, props) => ({
                    clickResult: `${state.clickResult} ${char}`
                }));
            },

            render() {
                let { icon, iconSize, iconColor, background, menuTitle, dropDown } = this.state;
                iconSize = ExampleHelper.ifNumber_Convert(iconSize);

                const items = [
                    { text: 'Table', value: 'Table', iconProps: {icon: core.icons('genie.table')}, onClick: ()=>{ this.print('table'); } },
                    { text: 'Code', value: 'Code', iconProps: {icon: core.icons('genie.code')}, onClick: ()=>{ this.print('code'); } },
                    { text: 'Create', value: 'Create', iconProps: {icon: core.icons('genie.create')}, onClick: ()=>{ this.print('create'); } },
                ];

                return (
                    <SimpleExample context={this} code={ this.getCode() } scheme={ this.propScheme() } codeHeight={ '40%' } exampleHeight={ '60%' } >

                        <IconMenu
                            icon={ icon }
                            iconSize={ iconSize }
                            menuTitle={ menuTitle }
                            menuItems={ items }
                            dropDown={ dropDown }
                            iconColor={ iconColor }
                            background={ background }
                        />
            
                    </SimpleExample>
                )
            }

        }
    }
}
