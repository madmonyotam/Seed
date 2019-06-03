import { TextField } from '@material-ui/core';
import { isEmpty, uniq } from 'lodash';

module.exports = {
    name: 'CategoryEditModal',
    description: 'This is an CategoryEditModal',
    dependencies: ['popovers.PopupHandler','Simple.Label','Layouts.Column','Layouts.Row',
    // 'Simple.SimpleDropDown'
    ],
    get(PopupHandler, Label, Column, Row, 
        // SimpleDropDown
        ) {
        var core = this;
        var { React, PropTypes, ComponentMixin, Branch } = core.imports;

        return {
            mixins: [ ComponentMixin, Branch ],

            cursors: {
                genie: ['plugins', 'access', 'genie'],
            },

            propsTypes: {
            },

            getDefaultProps(){
                return {
                };
            },
            
            getInitialState() {
                let data = PopupHandler.getData();

                return {
                    category: data.category,
                    library: data.library
                };
            },

            componentWillMount () {
                this.initUnits();
            },

            componentDidMount() {
                PopupHandler.enableOkButton();
            },

            initUnits(){
            },

            styles(s){
                const styles = {
                    textField: {
                        marginTop: 0,
                        marginBottom: 0
                    },
                    sortText: {
                        padding: 0
                    }
                }
                return(styles[s]);
            },

            checkValues(library, category){
                if(isEmpty(library) || isEmpty(category)){
                    return PopupHandler.disableOkButton();
                }
                
                PopupHandler.enableOkButton();
                PopupHandler.addData({library, category});
            },
            
            handleCategoryChange(event){
                let { library } = this.state;
                let value = event.target.value;

                this.setState({category: value},this.checkValues(library, value));
            },

            
            handleLibraryChange(value){
                let { category } = this.state;

                this.setState({library: value},this.checkValues(value,category));
            },

            createOptions(){
                let options=[];
                let all = this.cursor.genie.get();
                let keys = Object.keys(all);

                let libraries = keys.map( k => k.split(':')[0] );
                    libraries = uniq(libraries);
                    libraries.sort();


                libraries.map((lib)=>{
                    options.push({ key:lib, title:lib});
                })

                return options;
            },
            
            renderLibrariesDropDown(){
                let { library } = this.state;
                let options = this.createOptions();
                return null;
                // return(
                //     <SimpleDropDown
                //         selected={ library }
                //         style={{ width: '100%' }}
                //         onSelect={ this.handleLibraryChange }
                //         buttonStyle={ this.styles('sortText') }
                //         options={ options } />
                // )
            },
                
            handleTextFieldProps() {
                let { category } = this.state;
                return {
                    id: 'edit_library',
                    value: category,
                    onChange: this.handleCategoryChange,
                    InputProps: {
                        disableUnderline: true,
                        fontSize: 12
                    },
                    fullWidth: true,
                    autoComplete: 'off',
                    style: this.styles('textField'),
                    margin: "normal",
                    type: 'text' ,
                    autoFocus: true
                };
            },

            render() {

                return (
                    <Column width={'100%'}>

                        <Row>
                            <Label label={ core.translate('Library: ') } size={16} weight={500} width={150}/>
                            { this.renderLibrariesDropDown() }
                        </Row>
                        <Row>
                            <Label label={ core.translate('Category: ') } size={16} weight={500} width={150}/>
                            <TextField  {...this.handleTextFieldProps() } />
                        </Row>

                    </Column>
                )
            } 

        }
    }
}
