
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
                    fileExtension: { type: 'string' },
                    disabled: { type: 'boolean' }
                }
            },

            getInitialState() {
                let defaultProps = FileDownloader.getDefaultProps();
                defaultProps.fileExtension = 'json'
                return defaultProps;
            },

            getCode(){
                let { fileName, disabled } = this.state;

                return (`
<FileDownloader content={test}
                disabled={ ${disabled} }
                fileName={${fileName}}
                fileExtension={'json'}>
    
    <Button theme={ 'primary' } variant={ 'raised' }>
        {core.translate('download')}
    </Button>

</FileDownloader>
                `)
            },

            render() {
                let { fileName, disabled, fileExtension } = this.state;
                let test = {
                    test: 'is working'
                }

                return (
                    <SimpleExample context={this} code={ this.getCode() } scheme={ this.propScheme() } style={{justifyContent:'space-around'}}>

                        <FileDownloader content={test}
                                        disabled={ disabled }
                                        fileName={fileName}
                                        fileExtension={fileExtension}>
                                               
                            <Button theme={ 'primary' } variant={ 'raised' }>
                                {core.translate('download')}
                            </Button>
                        </FileDownloader>
            
                    </SimpleExample>
                )
            }

        }
    }
}
