import { Paper} from '@material-ui/core';
import { uniq, isEmpty } from 'lodash';

module.exports = {
    name: "GenieUi",
    dependencies: ['Genie.Libraries', 'Genie.Categories', 'Genie.CategoryDetails', 'Layouts.Column', 'Layouts.Row', 'Genie.MenuTitleBar'],

    get( Libraries, Categories, CategoryDetails, Column, Row, MenuTitleBar) {
        var seed = this;

        var { React, PropTypes, ComponentMixin, Branch } = seed.imports;

        const units = {
            dims: {
                menuWidth: 380,
            },
            colors: {
                border: seed.theme('borders.default'),
            },
            transition: 0.2,
        };

        return {
            mixins: [ ComponentMixin, Branch ],
            
            cursors: {
                currentLibrary: ['plugins','Genie','currentLibrary'],
                currentCategory: ['plugins','Genie','currentCategory'],
                originalData: ['plugins','Genie','data'],
                selected: ['plugins','Genie','selected'],
                data: ['plugins', 'access', 'genie'],
            },

            componentDidMount() {
                this.eventsHandler('on');
                this.setCurrentLibrary();
                this.updateOriginalData();
            },

            componentWillUnmount() {
                this.eventsHandler('off');
            },

            getInitialState() {
                return {
                    openLibAdd: false,
                    openCatAdd: false,
                    query: '',
                };
            },

            styles(propName) {
                let {currentLibrary, openLibAdd} = this.state;

                let noMenu = (!currentLibrary && !openLibAdd);

                let styles = {
                    root: {
                        width: '100%',
                        minWidth: 300,
                        height: '100%',
                        minHeight: 400,
                    },
                    lists: {
                        display: 'flex',
                        position: 'relative',
                        width: noMenu ? 0 : units.dims.menuWidth,
                        transition: `width ${units.transition}s ease-in-out, marginRight ${units.transition}s ease-in-out`,
                        height: '100%',
                        overflow: 'hidden auto',
                        marginRight: noMenu ? 0 : 15,
                    },
                    menu: {
                        position: 'relative',
                        width: units.dims.menuWidth,
                        minWidth: units.dims.menuWidth,
                    },
                    libraries: {
                        position: 'relative',
                        width: units.dims.menuWidth / 2,
                        minWidth: units.dims.menuWidth / 2,
                        overflow: 'auto',
                        borderRight: `1px solid ${units.colors.border}`,
                    },
                    categories: {
                        position: 'relative',
                        width: units.dims.menuWidth / 2,
                        minWidth: units.dims.menuWidth / 2,
                        overflow: 'auto',
                    },
                    openLibrary: {
                        position: 'relative',
                        flex: 1,
                        width: noMenu ? '100%' : `calc(100% - ${units.dims.menuWidth}px)`,
                        transition: `width ${units.transition}s ease-in-out`,
                        height: '100%',
                        marginLeft: 0
                    },
                }
                return styles[propName]
            },

            eventsHandler(action) {
                seed[action]('genieSave', this.handleSave);
                seed[action]('genie_updateOriginalData', this.updateOriginalData);
                seed[action]('genie_setFirstCategory', this.setCurrentCategory);

                this.cursor.currentLibrary[action]('update', this.setCurrentCategory);
                this.cursor.currentCategory[action]('update', this.setSelected);

                let windowEvent = (action == 'on') ? 'addEventListener' : 'removeEventListener';

                document[windowEvent]('keydown', this.handleKeypress);
            },

            handleSave() {
                let {data} = this.state;
                seed.plugins.Settings.run('SaveSettings', { dir: 'genie', fileData: data });
            },

            handleKeypress(event) {
                if (event.code == 'KeyS' && event.composed && event.ctrlKey) {
                    event.preventDefault(); event.stopPropagation();
                    return this.handleSave();
                }
            },

            updateOriginalData() {
                this.cursor.originalData.set(this.cursor.data.get());
            },

            setCurrentLibrary() {
                let libraries = this.getLibrariesLabels();
                if (!libraries || !libraries.length) return null

                this.cursor.currentLibrary.set(libraries[0]);
            },

            setCurrentCategory() {
                let categories = this.getCategoriesLabels();
                if (!categories || !categories.length) return null

                this.cursor.currentCategory.set(categories[0]);
            },

            setSelected() {
                let {currentLibrary, currentCategory} = this.state;
                this.cursor.selected.set(`${currentLibrary}:${currentCategory}`);
            },

            getLibrariesLabels() {
                let {data} = this.state;

                if ( !data || isEmpty(data)) return null;

                let keys = Object.keys(data);

                let libraries = keys.map( k => k.split(':')[0] );
                    libraries = uniq(libraries);
                    libraries.sort();

                return libraries;
            },

            getCategoriesLabels() {
                let {data, currentLibrary} = this.state;
                
                if ( !data || isEmpty(data)) return null;

                let keys = Object.keys(data);

                let categories = keys.map( k => {
                    let [lib, cat] = k.split(':');
                    if (lib === currentLibrary) return cat;
                });
                categories = categories.filter(Boolean);
                categories.sort();

                return categories;
            },

            getCategoryItems(library, category) {
                let {data} = this.state;
                if ( !data || isEmpty(data)) return null;
                if(!category) return null;

                let selector = `${library}:${category}`;

                return data[selector];
            },

            handleSearch(str) {
                this.setState({query: str});
            },

            handleToggleAddLib() {
                let {openLibAdd} = this.state;
                return openLibAdd ? this.handleCloseAdd() : this.handleAddLib();
            },
            handleToggleAddCat() {
                let {openCatAdd} = this.state;
                return openCatAdd ? this.handleCloseAdd() : this.handleAddCat();
            },

            handleAddLib() {
                this.setState({
                    openLibAdd: true,
                    openCatAdd: false,
                });
                setTimeout(() => {
                    let addInput = document.getElementById('addLibraryInputId');
                    addInput.focus();
                }, 250);
            },

            handleAddCat() {
                this.setState({
                    openLibAdd: false,
                    openCatAdd: true,
                });
            },

            handleCloseAdd() {
                let {data} = this.state;
                this.setState({
                    openLibAdd: false,
                    openCatAdd: false,
                });
                this.handleSearch('', data)
            },

            renderMenu() {
                let {openLibAdd, openCatAdd, query} = this.state;

                return (
                    <Paper id={'Lists'} elevation={ 2 } style={ this.styles('lists') }>
                        <Column id={'Menu'} style={ this.styles('menu') } >

                            <MenuTitleBar addLib={this.handleToggleAddLib} addCat={this.handleToggleAddCat} closeAdd={this.handleCloseAdd} searchCB={(str)=>{this.handleSearch(str)}} />

                            <Row padding={0} height={'calc(100% - 50px)'}>
                                <Libraries  searchValue={query} addIsOpen={openLibAdd} closeAdd={this.handleCloseAdd} />
                                <Categories searchValue={query} addIsOpen={openCatAdd} closeAdd={this.handleCloseAdd} />
                            </Row>

                        </Column>
                    </Paper>
                );
            },

            render() {
                let {currentLibrary, currentCategory} = this.state;

                let categories = this.getCategoriesLabels();
                let selectedCategory = (isEmpty(categories)) ? null : (categories.includes(currentCategory)) ? currentCategory : categories[0];

                let items = this.getCategoryItems(currentLibrary, selectedCategory);

                return (
                    <Row padding={3} id={'MockgeneratorUi'} style={ this.styles('root') }>
                        {this.renderMenu()}
                        <Paper id={'CategoryDetails'} elevation={ 2 } style={ this.styles('openLibrary') } >
                            <CategoryDetails
                                items={items}
                                currentLibrary={currentLibrary}
                                currentCategory={selectedCategory}
                                addLib={this.handleAddLib}
                                addCat={this.handleAddCat}
                            />
                        </Paper>
                    </Row>
                )
            }
        }
    }
}
