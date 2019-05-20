
module.exports = {
    dependencies: ['Simple.Loader','Layouts.Column', 'Layouts.Center','Examples.SimpleExample','Decorators.Tooltip', 'Inputs.Button'],
    get(Loader, Column, Center, SimpleExample, Tooltip, Button) {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            propScheme(){ 
                return {
                    content: { type: 'default' },
                    delay: { type: 'number' },
                    position: { type: 'select', group: 'initial', options: ['top', 'top-right', 'top-left', 'bottom', 'bottom-right', 'bottom-left', 'left', 'right']},
                    offsetX: { type: 'number', group: 'initial' },
                    offsetY: { type: 'number', group: 'initial' },
                    theme: { type: 'select', group: 'initial', options: ['dark', 'light']},
                    interactive: { type: 'boolean', group: 'initial' },
                }
            },

            getInitialState() {
                let defaultProps = Tooltip.getDefaultProps();
                return {
                  loading: true,
                  ...defaultProps
                };
            },

            componentDidMount() {
              setTimeout(() => {
                this.setState({ loading: false })
              }, 5000);
            },
            

            getCode(){
                let { content, position, theme, delay, interactive, offsetX, offsetY } = this.state;

                return (`
<Tooltip content={'${content}'} 
         position={'${position}'} 
         theme={'${theme}'} 
         delay={'${delay}'} 
         interactive={${interactive}} 
         offsetX={${offsetX}} 
         offsetY={${offsetY}}>   
  <Button theme={ 'primary' } variant={ 'filled' }>
      Hover Me
  </Button>
</Tooltip>
                `)
            },

            renderContent(){
              if (this.state.loading) {

                return (
                  <div style={{ width: 25, height: 25 }}>
                    <Loader size={ 15 } show={ true } color={'#fff'} />
                  </div>
                )
              }
              return <div style={{ width: 150 }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et officiis voluptatibus nemo sit nisi doloremque, accusamus temporibus modi autem recusandae veniam eum ut repudiandae ullam numquam blanditiis id excepturi. Ad.</div>
            },

            renderContentState(){
              let { content, position, theme, delay, interactive, offsetX, offsetY } = this.state; 

              return (
                <Column style={{ width: 150 }}>
                  <div> { core.translate('Content') } : { content } </div>
                  <div> { core.translate('Position') } : { position } </div>
                  <div> { core.translate('Theme') } : { theme } </div>
                  <div> { core.translate('Delay') } : { delay } </div>
                  <div> { core.translate('Interactive') } : { interactive.toString() } </div>
                  <div> { core.translate('Offset X') } : { offsetX } </div>
                  <div> { core.translate('Offset Y') } : { offsetY } </div>
                </Column>
              )
            },

            render() {
                let { content, position, theme, delay, interactive, offsetX, offsetY } = this.state; 
                return (
                    <SimpleExample context={this} code={ this.getCode() } scheme={ this.propScheme() } style={{ position:'relative' , display: 'flex', flexDirection: 'column'}}>

                        <Tooltip content={ this.renderContent() } position={ position } theme={ theme } delay={ delay } >                            
                            <Button theme={ 'secondary' } variant={ 'filled' } >
                                <span>{core.translate('Dynamic Content')}</span>
                            </Button>
                        </Tooltip>

                        <Tooltip  content={ this.renderContentState() } 
                                  position={ position } 
                                  interactive={ interactive } 
                                  theme={ theme } 
                                  delay={ delay } 
                                  offsetX={ Number(offsetX) } 
                                  offsetY={ Number(offsetY) } >                            
                            <Button theme={ 'primary' } variant={ 'filled' } style={{  marginTop: 15 }}  >
                                {core.translate('Hover Me')} 
                            </Button>
                        </Tooltip>
            
                    </SimpleExample>
                )
            }

        }
    }
}
