
module.exports = {
    dependencies: ['Inputs.Button','Examples.SimpleExample','Decorators.FileDownloader'],
    get(Button, SimpleExample, FileDownloader) {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            propScheme(){ 
                return {
                    fileName: { type: 'string' },
                    disabled: { type: 'boolean' }
                }
            },

            getInitialState() {
                let defaultProps = FileDownloader.getDefaultProps();
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
                let { fileName, disabled } = this.state;
                let test = {
                    test: 'is working'
                }

                return (
                    <SimpleExample context={this} code={ this.getCode() } scheme={ this.propScheme() } style={{justifyContent:'space-around'}}>

                        <FileDownloader content={test}
                                        disabled={ disabled }
                                        fileName={fileName}
                                        fileExtension={'json'}>
                                               
                            <Button theme={ 'primary' } variant={ 'raised' }>
                                <span>{core.translate('download')}</span>
                            </Button>
                        </FileDownloader>
            
                    </SimpleExample>
                )
            }

        }
    }
}
