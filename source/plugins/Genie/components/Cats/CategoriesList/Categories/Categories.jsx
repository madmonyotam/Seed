import { uniq, isEmpty } from 'lodash';

module.exports = {
    dependencies: [ 'Simple.NoResults', 'Genie.CategoryItem', 'Inputs.IconButton', 'Layouts.Row', 'Inputs.Input' ],
    get( NoResults, CategoryItem, IconButton, Row, Input ) {
        var seed = this;
        var { React, PropTypes, ComponentMixin, Branch } = seed.imports;

        const units = {
            colors: {
                text: seed.theme('texts.default'),
            },
            backgrounds: {
                default: seed.theme('backgrounds.default'),
            },
            icons: {
                clear: seed.icons('genie.clear')
            }
        }

        const style = {
            root: {
                display: 'flex',
                position: 'relative',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 2px -1px"
            },
            mapWrapper: {
                position: "relative",
                width: "100%",
                height: "100%",
            }
        }

        return {
            mixins: [ ComponentMixin, Branch ],

            cursors: {
                currentLibrary: ['plugins','Genie','currentLibrary'],
                currentCategory: ['plugins','Genie','currentCategory'],
                genie: ['plugins','access','genie'],
            },

            propsTypes: {
                addIsOpen: PropTypes.bool,
                searchValue: PropTypes.string,
                closeAdd: PropTypes.func,
            },

            getDefaultProps() {
                return {
                    addIsOpen: false,
                    searchValue:'',
                    closeAdd: ()=>{},
                };
            },

            getInitialState() {
                return {
                    addIsOpen: false
                };
            },

            componentWillReceiveProps(nextProps) {
                if (!seed.isUndefined(nextProps.addIsOpen)) this.setState({addIsOpen:nextProps.addIsOpen});
            },

            styles(propName) {
                let styles = {
                }

                return styles[propName]
            },

            getCategoriesLabels() {
                let { currentLibrary, genie } = this.state;
                let keys = Object.keys(genie);
                if(isEmpty(keys)) return [];

                let categories = keys.map( k => {
                    let [lib, cat] = k.split(':');
                    if (lib === currentLibrary) return cat;
                });

                return categories;
            },

            handleAdd(value) {
                let { genie } = this.state;
                let { currentLibrary } = this.state;
    
                let data = this.serialize(genie);
                let indicator = `${currentLibrary}:${value}`;
                
                if ( data[indicator] ) {
                    let errorText = seed.translate('category is already exist');
                    seed.emit('notify', { text: errorText, alertKind: 'error' });
                    return null;
                }
                
                data[indicator] = {};
                this.cursor.genie.set(data);
                this.handleSelect(value);
            },

            handleRename(oldValue, value) {
                let { genie, currentLibrary } = this.state;

                let data = this.serialize(genie);
                let indicator = `${currentLibrary}:${value}`;
                let oldIndicator = `${currentLibrary}:${oldValue}`;
                
                if ( data[indicator] ) {
                    let errorText = seed.translate('category is already exist');
                    seed.emit('notify', { text: errorText, alertKind: 'error' });
                    return null;
                }

                data[indicator] = data[oldIndicator];
                delete data[oldIndicator]; 
                this.cursor.genie.set(data);               
                this.handleSelect( value );
            },

            handleRemove(value) { 
                let { currentLibrary, genie } = this.state;
                let labels = this.getCategoriesLabels().sort();

                let data = this.serialize(genie);
                let indicator = `${currentLibrary}:${value}`;
                
                let text = seed.translate(`Are you sure that do you want to remove the "${value}" category from "${currentLibrary}" library`);
                let head = seed.translate(`Remove "${value}" category`);
                
                seed.plugins.popovers.Caution( text, head,
                    ( sure )=>{
                        if ( sure ) {
                            
                            delete data[indicator];
                            this.cursor.genie.set(data); 

                            let select = labels[0]
                            if(value === select ) select = labels[1] || '';
                            this.handleSelect( select );
                        }
                    }
                )
            },

            handleSelect(value) {
                seed.emit('MenuTitleBar_closeSearch');
                this.cursor.currentCategory.set(value);
            },

            handleMapCats(){
                let { searchValue } = this.props;
                let labels = this.getCategoriesLabels();
                if ( isEmpty(labels) ) return this.renderNoResults();
                
                let showLabels = labels.filter( t => t.toLowerCase().includes( searchValue.toLowerCase() ) );
                    showLabels = showLabels.sort();

                return showLabels.map( this.renderLine );
            },

            handleCloseAdd() {
                let { closeAdd } = this.props;
                if (closeAdd) closeAdd();
                this.setState({addIsOpen:false})
            },

            handleAddKeyDown( e ) {
                let addValue = e.target.value;

                switch (e.keyCode) {
                    case 27: // ESC
                        this.safeState({addValue: '' });
                        this.handleCloseAdd();
                        break;
                    case 13: // Enter
                        if (addValue.trim().length) {
                            this.handleAdd(addValue);
                            this.handleCloseAdd();
                        }
                        break;
                }
                return;
            },

            add(){
                this.setState({addIsOpen:true});
            },

            renderNoResults() {
                return (
                    <NoResults
                        onClick = { this.add }
                        text={ '' }
                        icon={ seed.icons('genie.add') }
                        color={ seed.theme('texts.default') }
                        background= { seed.theme('Genie.cat_bg') }
                        size={6}
                    />
                );
            },

            renderLine( label ){
                let { currentCategory } = this.state;
                let isSelected = label === currentCategory;

                return (
                    <CategoryItem
                        key={ label }
                        isSelected={ isSelected }
                        selectCB={ this.handleSelect }
                        removeCB={ this.handleRemove }
                        renameCB={ this.handleRename }
                        itemValue={ label }
                        rowHeight={ 40 } />
                )
            },

            renderAdd() {
                let {addIsOpen} = this.state;
                if (!addIsOpen) return null;
    
                let inputStyle = { height:28, paddingLeft: 2 }
                let rowStyle = { paddingRight: 5 }
    
                return (
                    <Row height={40} color={units.backgrounds.default} boxShadow={true} style={rowStyle} >
                        <Input
                            label={''}
                            inputStyle={inputStyle}
                            autoFocus={ true }
                            onKeyDown={ this.handleAddKeyDown }
                            placeholder={ seed.translate('Add Category') }
                        />
                        <IconButton    
                            onClick={ this.handleCloseAdd }
                            icon={units.icons.clear} 
                            hoverSize= { 5 }
                            iconSize= { 16 }
                            background= 'transparent' />
                    </Row>
                );
            },

            render() {
                let { currentLibrary } = this.state;
                if(!currentLibrary) return null;

                return (
                    <div id={'Categories.root'} style={ style.root }>
                        {this.renderAdd()}
                        <div style={ style.mapWrapper }>
                            { this.handleMapCats() }
                        </div>
                    </div>
                )
            }
        }
    }
}
