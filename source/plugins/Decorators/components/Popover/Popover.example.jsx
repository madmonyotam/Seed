
module.exports = {
    dependencies: ['Layouts.Column', 'Examples.SimpleExample', 'Examples.ExampleHelper', 'Decorators.Popover', 'Buttons.Button'],
    get(Column, SimpleExample, ExampleHelper, Popover, Button) {

        var core = this;

        var { React, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            propScheme(){
                return {
                    position: { type: 'select', options: ['top', 'bottom', 'left', 'right' ], group: 'initial'},
                    theme: { type: 'select', options: ['dark', 'light']},
                    animation: { type: 'select', options: ['pop', 'slide']},
                    elevation: { type: 'select', options: [ 1,2,3,4,5,6,7,8,9,10 ]},
                    padding: { type: 'number' },
                    width: { type: 'number' },
                    height: { type: 'number' },
                    offsetX: { type: 'number' },
                    offsetY: { type: 'number' },
                    delay: { type: 'number' },
                    interactive: { type: 'boolean', group: 'initial' },
                    backdrop: { type: 'boolean', group: 'initial' },
                    center: { type: 'boolean', group: 'initial' },
                }
            },

            getInitialState() {
                let defaultProps = Popover.getDefaultProps();
                return defaultProps
            }, 

            getCode(){
                let { elevation, center, position, padding, theme, offsetX, offsetY, delay, interactive, backdrop, animation } = this.state;
                
                return (`
<Popover anchorEl={ anchorEl } 
         position={'${position}'}
         theme={'${theme}'} 
         animation={'${animation}'} 
         elevation={${elevation}}
         offsetX={${offsetX}}
         offsetY={${offsetY}} 
         padding={${padding}} 
         delay={${delay}} 
         interactive={${interactive}} 
         backdrop={${backdrop}} 
         center={${center}} 
         onClose={ e => { this.setState({ anchorEl: undefined }) } }>
</Popover>
<Button theme={ 'primary' } variant={ 'filled' } onClick={ e => { this.setState({ anchorEl: e.currentTarget }) } }>
    Click Me
</Button>
                `)
            }, 

            renderContentState(){
              let { position, theme, elevation, offsetX, offsetY, padding, delay, interactive, backdrop, animation, center } = this.state;

              return (
                <Column style={{ width: '100%' }}>
                  <div> { core.translate('Position') } : { position } </div>
                  <div> { core.translate('Theme') } : { theme } </div>
                  <div> { core.translate('Animation') } : { animation } </div>
                  <div> { core.translate('Padding') } : { padding } </div>
                  <div> { core.translate('Offset X') } : { offsetX } </div>
                  <div> { core.translate('Offset Y') } : { offsetY } </div>
                  <div> { core.translate('Elevation') } : { elevation } </div>
                  <div> { core.translate('Delay') } : { delay } </div>
                  <div> { core.translate('Interactive') } : { interactive.toString() } </div>
                  <div> { core.translate('Backdrop') } : { backdrop.toString() } </div>
                  <div> { core.translate('Center') } : { center.toString() } </div>
                </Column>
              )
            },

            render() {
                let { position, theme, elevation, padding, offsetX, offsetY, delay, backdrop, anchorEl, width, height, interactive, animation, center } = this.state;
                elevation = ExampleHelper.ifNumber_Convert(elevation);
                width = ExampleHelper.ifNumber_Convert(width);
                height = ExampleHelper.ifNumber_Convert(height);
                padding = ExampleHelper.ifNumber_Convert(padding);
                offsetX = ExampleHelper.ifNumber_Convert(offsetX);
                offsetY = ExampleHelper.ifNumber_Convert(offsetY);
                delay = ExampleHelper.ifNumber_Convert(delay);

                return (
                    <SimpleExample  context={this} 
                                    code={ this.getCode() } 
                                    scheme={ this.propScheme() } 
                                    codeHeight={ '40%' }
                                    exampleHeight={ '60%' } >

                      <Popover  anchorEl={ anchorEl } 
                                position={ position } 
                                theme={ theme } 
                                animation={ animation } 
                                backdrop={ backdrop } 
                                elevation={ elevation } 
                                width={ width }
                                height={ height }
                                padding={ padding }
                                delay={ delay }
                                offsetX={ offsetX }
                                offsetY={ offsetY } 
                                interactive={ interactive } 
                                center={ center } 
                                onClose={ e => { this.setState({ anchorEl: undefined }) } } >
                        { this.renderContentState() }
                      </Popover>

                      <Button onClick={ e => { this.setState({ anchorEl: e.currentTarget }) } } theme={ 'primary' } variant={ 'raised' } >
                        { core.translate('Click Me') } 
                      </Button> 

                    </SimpleExample>
                )
            }

        }
    }
}
