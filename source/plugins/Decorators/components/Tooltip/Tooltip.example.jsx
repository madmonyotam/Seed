
module.exports = {
    dependencies: ['Simple.Loader','Layouts.Center','Examples.SimpleExample','Decorators.Tooltip'],
    get(Loader, Center, SimpleExample, Tooltip) {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            propScheme(){ 
                return {
                    content: { type: 'default' },
                    delay: { type: 'number' },
                    position: { type: 'select', group: 'initial', options: ['top', 'top-right', 'top-left', 'bottom', 'bottom-right', 'bottom-left', 'left', 'right']},
                    theme: { type: 'select', group: 'initial', options: ['dark', 'light']} 
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
                let { content, position, theme, delay } = this.state;

                return (`
<Tooltip content={'${content}'} position={'${position}'} theme={'${theme}'} delay={'${delay}'} >   
  <Center height={25} width={100} style={{ border: '1px solid #333' }}  >
      <span> Hover Me </span>
  </Center>
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

            render() {
                let { content, position, theme, delay } = this.state;

                return (
                    <SimpleExample context={this} code={ this.getCode() } scheme={ this.propScheme() } style={{ position:'relative' }}>

                        <Tooltip content={ this.renderContent() } position={ position } theme={ theme } delay={ delay }  >                            
                            <Center height={25} width={100} style={{ border: '1px solid #333' }}  >
                                <span>{core.translate('Hover With Loader')}</span>
                            </Center>
                        </Tooltip>


                        <Tooltip content={ content } position={ position } theme={ theme } delay={ delay }  style={{ position: 'absolute', bottom: 0, right: 0}} >                            
                            <Center height={25} width={100} style={{ border: '1px solid #333' }}  >
                                <span>{core.translate('Hover Me')}</span>
                            </Center>
                        </Tooltip>
                        
                        <Tooltip content={ content } position={ position } theme={ theme } delay={ delay }  style={{ position: 'absolute', bottom: 0, left: 0}} >                            
                            <Center height={25} width={100} style={{ border: '1px solid #333' }}  >
                                <span>{core.translate('Hover Me')}</span>
                            </Center>
                        </Tooltip>
                        <Tooltip content={ content } position={ position } theme={ theme } delay={ delay }  style={{ position: 'absolute', top: 0, left: 0}} >                            
                            <Center height={25} width={100} style={{ border: '1px solid #333' }}  >
                                <span>{core.translate('Hover Me')}</span>
                            </Center>
                        </Tooltip>

                        <Tooltip content={ content } position={ position } theme={ theme } delay={ delay }   style={{ position: 'absolute', top: 0, right: 0}} >                            
                            <Center height={25} width={100} style={{ border: '1px solid #333' }}  >
                                <span>{core.translate('Hover Me')}</span>
                            </Center>
                        </Tooltip>
            
                    </SimpleExample>
                )
            }

        }
    }
}
