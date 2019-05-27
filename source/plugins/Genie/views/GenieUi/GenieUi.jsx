import { Paper} from '@material-ui/core';
import { uniq, isEmpty } from 'lodash';

module.exports = {
    name: "GenieUi",
    dependencies: ['Genie.Libraries', 'Genie.Categories', 'Genie.CategoryDetails', 'Layouts.Column', 'Layouts.Row', 'Genie.MenuTitleBar'],

    get( Libraries, Categories, CategoryDetails, Column, Row, MenuTitleBar) {
        var seed = this;

        var { React, PropTypes, ComponentMixin, Branch } = seed.imports;

        return {
            mixins: [ ComponentMixin, Branch ],
            
            cursors: {
                currentLibrary: ['plugins','Genie','currentLibrary'],
                currentCategory: ['plugins','Genie','currentCategory'],
                data: ['plugins', 'access', 'genie'],
            },

            componentWillMount() {
                this.initUnits();
                // this.setCurrentLibrary();
            },

            componentDidMount() {
                this.eventsHandler('on');
                setTimeout(() => {
                    this.setCurrentLibrary();
                }, 150);
            },

            componentWillUnmount() {
                this.eventsHandler('off');
            },

            getInitialState() {
                return {
                    openLibAdd: false,
                    openCatAdd: false,
                    libQuerry: undefined,
                    catQuery: '',
                };
            },

            initUnits() {
                this.dims = {
                    menuWidth: 380,
                };
                this.colors = {
                    border: seed.theme('borders.default'),
                };
                this.units = {
                    transition: 0.2,
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
                        width: noMenu ? 0 : this.dims.menuWidth,
                        transition: `width ${this.units.transition}s ease-in-out, marginRight ${this.units.transition}s ease-in-out`,
                        height: '100%',
                        overflow: 'hidden auto',
                        marginRight: noMenu ? 0 : 15,
                    },
                    menu: {
                        position: 'relative',
                        width: this.dims.menuWidth,
                        minWidth: this.dims.menuWidth,
                    },
                    libraries: {
                        position: 'relative',
                        width: this.dims.menuWidth / 2,
                        minWidth: this.dims.menuWidth / 2,
                        overflow: 'auto',
                        borderRight: `1px solid ${this.colors.border}`,
                    },
                    categories: {
                        position: 'relative',
                        width: this.dims.menuWidth / 2,
                        minWidth: this.dims.menuWidth / 2,
                        overflow: 'auto',
                    },
                    openLibrary: {
                        position: 'relative',
                        flex: 1,
                        width: noMenu ? '100%' : `calc(100% - ${this.dims.menuWidth}px)`,
                        transition: `width ${this.units.transition}s ease-in-out`,
                        height: '100%',
                        marginLeft: 0
                    },
                }
                return styles[propName]
            },

            eventsHandler(action) {
                seed[action]('genieSave', this.handleSave);

                let windowEvent = (action == 'on') ? 'addEventListener' : 'removeEventListener';

                document[windowEvent]('keydown', this.handleKeypress);
            },

            handleSave() {
                return core.emit('file:save', this.state.data);
            },

            handleKeypress(event) {
                
                if (event.code == 'KeyS' && event.composed && event.ctrlKey) {
                    event.preventDefault(); event.stopPropagation();
                    return this.handleSave();
                }
            },

            setCurrentLibrary() {
                let libraries = this.getLibrariesLabels();
                if (!libraries || !libraries.length) return null

                this.cursor.currentLibrary.set(libraries[0]);
                this.setState( (state, props)=>{ return {currentLibrary: libraries[0]} });
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
                let {data} = this.state;

                let libraries = [];

                if (str && str.length) {
                    let keys = Object.keys(data);
                    keys = keys.filter(k => k.toLowerCase().includes( str.toLowerCase() ));
                    keys.forEach(k => {
                        let lib = k.split(':')[0];
                        libraries.push(lib);
                    });
                    libraries = uniq(libraries);
                }

                this.setState({libQuerry: libraries, catQuery: str});
            },

            handleAddLib() {
                this.setState({
                    openLibAdd: true,
                    openCatAdd: false,
                });
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

            renderMenu(selectedCategory, categories) {
                let {openLibAdd, openCatAdd, libQuerry, catQuery, currentLibrary} = this.state;
                let libraries = this.getLibrariesLabels();

                let commonParams = {
                    currentCategory: selectedCategory,
                    currentLibrary: currentLibrary,
                    closeAdd: ()=>this.handleCloseAdd(),
                };

                return (
                    <Paper id={'Lists'} elevation={ 2 } style={ this.styles('lists') }>
                        <Column id={'Menu'} style={ this.styles('menu') } >
                            <MenuTitleBar
                                searchCB={(str)=>{this.handleSearch(str)}}
                                addLib={this.handleAddLib}
                                addCat={this.handleAddCat}
                            />
                            <Row padding={0} height={'calc(100% - 50px)'}>
                                <Libraries  labels={libraries}  querry={libQuerry} addIsOpen={openLibAdd} {...commonParams} />
                                <Categories searchValue={catQuery} addIsOpen={openCatAdd} {...commonParams} />
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
                        {this.renderMenu(selectedCategory, categories)}
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
