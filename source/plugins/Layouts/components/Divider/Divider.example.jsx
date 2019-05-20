
module.exports = {
    dependencies: ['Examples.ExampleHelper', 'Examples.SimpleExample', 'Layouts.Divider', 'Simple.Icon'],
    get(ExampleHelper, SimpleExample, Divider, Icon) {

        var core = this;

        var { React, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            propScheme(){ 
                return {
                    orientation: { type: 'select', group: 'initial', options: [ 'vertical', 'horizontal' ] },
                    color: { type: 'string', group: 'initial' },
                    thikness: { type: 'number', group: 'initial' },
                    size: { type: 'string', group: 'initial' },
                }
            },

            getInitialState() {
                let defaultProps = Divider.getDefaultProps();
                return defaultProps;
            },

            getCode(){
                let {orientation, color, thikness, size } = this.state;

                return [
                    `<div style={{width: 200, height: 200, border: '1px solid lightgrey'}}>`,
                    `   <Icon icon={'save'}/>`,
                    `   <Divider`,
                    `       orientation={${orientation}}`,
                    `       color={${color}}`,
                    `       thikness={${thikness}}`,
                    `       size={${size}}`,
                    `   />`,
                    `   <Icon icon={'folder'}/>`,
                    `</div>`,
                ].join('\n');
            },

            render() {
                let {orientation, color, thikness, size } = this.state;
                size = ExampleHelper.ifNumber_Convert(size);

                let style = { display: 'flex', width: 200, height: 200, border: `1px solid ${core.theme('borders.default')}` };
                if (orientation === 'vertical') {
                    style.flexDirection = 'row';
                    style.justifyContent = 'space-evenly';
                    style.alignItems = 'center';
                } else {
                    style.flexDirection = 'column';
                    style.justifyContent = 'space-evenly';
                    style.alignItems = 'center';
                }

                return (
                    <SimpleExample context={this} code={ this.getCode() } scheme={ this.propScheme() } >

                        <div style={style}>
                            <Icon icon={core.icons('general.save')}/>
                            <Divider
                                orientation={orientation}
                                color={color}
                                thikness={thikness}
                                size={size}
                            />
                            <Icon icon={core.icons('general.folder')}/>
                        </div>
            
                    </SimpleExample>
                )
            }

        }
    }
}
