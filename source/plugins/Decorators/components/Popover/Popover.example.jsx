
module.exports = {
    dependencies: ['Simple.Loader','Layouts.Column', 'Layouts.Center','Examples.SimpleExample','Decorators.Popover', 'Inputs.Button'],
    get(Loader, Column, Center, SimpleExample, Popover, Button) {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            propScheme(){
                return {
                    position: { type: 'select', options: ['top', 'bottom', 'left', 'right' ]},
                    theme: { type: 'select', options: ['dark', 'light']},
                    elevation: { type: 'select', options: [ 1,2,3,4,5,6,7,8,9,10 ]},
                    width: { type: 'number' },
                    height: { type: 'number' },
                    offsetX: { type: 'number' },
                    offsetY: { type: 'number' },
                    interactive: { type: 'boolean', group: 'initial' },
                }
            },

            getInitialState() {
                let defaultProps = Popover.getDefaultProps();
                return defaultProps
            }, 

            getCode(){
                let { elevation, position, theme, offsetX, offsetY, interactive} = this.state;

                return (`
<Popover anchorEl={ anchorEl } 
         position={'${position}'}
         theme={'${theme}'} 
         elevation={${elevation}}
         offsetX={${offsetX}}
         offsetY={${offsetY}} 
         interactive={${interactive}} 
         onClose={ e => { this.setState({ anchorEl: undefined }) } }>
</Popover>
<Button theme={ 'primary' } variant={ 'filled' } onClick={ e => { this.setState({ anchorEl: e.currentTarget }) } }>
    Click Me
</Button>
                `)
            }, 

            renderContentState(){
              let { position, theme, elevation, offsetX, offsetY, interactive } = this.state;

              return (
                <Column style={{ width: '100%' }}>
                  <div> { core.translate('Position') } : { position } </div>
                  <div> { core.translate('Theme') } : { theme } </div>
                  <div> { core.translate('Offset X') } : { offsetX } </div>
                  <div> { core.translate('Offset Y') } : { offsetY } </div>
                  <div> { core.translate('Elevation') } : { elevation } </div>
                  <div> { core.translate('Interactive') } : { interactive.toString() } </div>
                </Column>
              )
            },

            render() {
                let { position, theme, elevation, offsetX, offsetY, anchorEl, width, height, interactive } = this.state;
                return (
                    <SimpleExample context={this} code={ this.getCode() } scheme={ this.propScheme() } style={{ position:'relative' , display: 'flex', flexDirection: 'column'}}>

                      <Popover  anchorEl={ anchorEl } 
                                position={ position } 
                                theme={ theme } 
                                elevation={ Number(elevation) } 
                                width={ Number(width) }
                                height={ Number(height) }
                                offsetX={ Number(offsetX) }
                                offsetY={ Number(offsetY) } 
                                interactive={ interactive } 
                                onClose={ e => { this.setState({ anchorEl: undefined }) } }>
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
