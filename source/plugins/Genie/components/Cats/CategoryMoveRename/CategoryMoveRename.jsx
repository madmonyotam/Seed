import { TextField } from '@material-ui/core';
import { isEmpty, uniq } from 'lodash';

module.exports = {
    dependencies: ['popovers.PopupHandler','Simple.Label','Layouts.Center', 'Layouts.Column','Layouts.Row','Inputs.Input'],
    get(PopupHandler, Label, Center, Column, Row, Input) {
        var core = this;
        var { React, PropTypes, ComponentMixin, Branch } = core.imports;

        return {
            mixins: [ ComponentMixin, Branch ],

            cursors: {
                currentLibrary: ['plugins','Genie','currentLibrary'],
                currentCategory: ['plugins','Genie','currentCategory'],
                genie: ['plugins', 'access', 'genie'],
            },

            propsTypes: {
            },

            getDefaultProps(){
                return {
                };
            },
            
            getInitialState() {
                return {
                    library: '',
                    category: '',
                };
            },

            componentDidMount() {
                PopupHandler.enableOkButton();
                this.initState();
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

            initState() {
                this.setState((state, props)=>{
                    let library = state.currentLibrary;
                    let category = state.currentCategory;
                    return {library, category}
                });
            },

            checkValues(){
                let {library, category} = this.state;
                if(isEmpty(library) || isEmpty(category)){
                    return PopupHandler.disableOkButton();
                }
                
                PopupHandler.enableOkButton();
                PopupHandler.addData({
                    data: {library, category}
                });
            },
            
            handleChange(value, field){
                this.setState((state, props)=>{
                    state[field] = value;
                    return state;
                }, this.checkValues);
            },

            librariesOptions(){
                let options=[];
                let {genie} = this.state;
                let keys = Object.keys(genie);

                let libraries = keys.map( k => k.split(':')[0] );
                    libraries = uniq(libraries);
                    libraries.sort();

                libraries.map((lib)=>{
                    options.push({
                        label: lib,
                        value: lib,
                    });
                })

                return options;
            },

            categoriesOptions(){
                let options=[];
                let {genie, library} = this.state;
                let keys = Object.keys(genie);

                let categories = keys.map( k => {
                    let [lib, cat] = k.split(':');
                    if (lib === library) return cat;
                })
                categories = categories.filter(Boolean);
                categories.sort();

                categories.map((category)=>{
                    options.push({
                        label: category,
                        value: category,
                    });
                })

                return options;
            },
            
            renderLibrary(){
                let { library } = this.state;
                let options = this.librariesOptions();

                return (
                    <Row>
                        <Label label={ core.translate('Library: ') } size={13} weight={500} width={150}/>
                        <Input 
                            type={ 'autocomplete' }
                            label={null}
                            value={ library }
                            openOnFocus={ true }
                            placeholder={ core.translate('Select a Library') }
                            options={ options }
                            onChange={ (value)=>{this.handleChange(value, 'library')} }
                        />
                    </Row>
                )
            },
                
            renderCategory() {
                let { category } = this.state;
                let options = this.categoriesOptions();

                return (
                    <Row>
                        <Label label={ core.translate('Category: ') } size={13} weight={500} width={150}/>
                        <Input 
                            type={ 'autocomplete' }
                            label={null}
                            value={ category }
                            openOnFocus={ true }
                            placeholder={ core.translate('Select a Category') }
                            options={ options }
                            onChange={ (value)=>{this.handleChange(value, 'category')} }
                        />
                    </Row>
                );
            },

            render() {

                return (
                    <Center width={'100%'} height={'100%'}>
                        <Column width={'100%'} height={'fit-content'}>
                            {this.renderLibrary()}
                            {this.renderCategory()}
                        </Column>
                    </Center>
                )
            } 

        }
    }
}
