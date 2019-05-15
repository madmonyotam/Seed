import { Paper} from '@material-ui/core';
import { uniq, isEmpty } from 'lodash';

module.exports = {
    name: "GenieUi",
    bindings: {
        currentLibrary: ['currentLibrary'],
        currentCategory: ['currentCategory'],
        data: ['plugins', 'Settings', 'config', 'genie']
    },
    dependencies: ['Genie.Libraries', 'Genie.Categories', 'Genie.CategoryDetails', 'Genie.MockUIHelpers', 
                   'Layouts.Column', 'Layouts.Row', 'Genie.MenuTitleBar'],

    get( Libraries, Categories, CategoryDetails, MockUIHelpers,
         Column, Row, MenuTitleBar) {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            componentWillMount() {
                this.initUnits();
            },

            componentDidMount() { 
            },

            getInitialState() {
                return {
                    openLibAdd: false,
                    openCatAdd: false,
                    libQuerry: undefined,
                    catQuerry: '',
                };
            },

            initUnits() {
                this.treeFirstLoad();
                this.dims = {
                    menuWidth: 380,
                };
                this.colors = {
                    border: core.theme('borders.default'),
                };
                this.units = {
                    transition: 0.2,
                };
            },

            styles(propName) {
                let noMenu = (!this.props.currentLibrary && !this.state.openLibAdd);

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

            treeFirstLoad() {
                let data = core.plugins.Genie.getMock();
                if ( !data || isEmpty(data)) return null;

                let lib = this.getLibrariesLabels(data)[0];
                let cat = this.getCategoriesLabels(data, lib)[0];

                MockUIHelpers.libraryOpen( lib, cat );
            },

            getLibrariesLabels(data) {
                if ( !data || isEmpty(data)) return null;

                let keys = Object.keys(data);

                let libraries = keys.map( k => k.split(':')[0] );
                    libraries = uniq(libraries);
                    libraries.sort();

                return libraries;
            },

            getCategoriesLabels(data, library = this.props.currentLibrary) {
                if ( !data || isEmpty(data)) return null;

                let keys = Object.keys(data);

                let categories = keys.map( k => {
                    let [lib, cat] = k.split(':');
                    if (lib === library) return cat;
                });
                categories = categories.filter(Boolean);
                categories.sort();

                return categories;
            },

            getCategoryItems( data, library, category ) {
                if ( !data || isEmpty(data)) return null;
                if(!category) return null;

                let selector = `${library}:${category}`;

                return data[selector];
            },

            handleSearch(str, data) {
                let libraries = [];

                if (str && str.length) {
                    let keys = Object.keys(data);
                    keys = keys.filter(k=>k.includes(str));
                    keys.forEach(k => {
                        let lib = k.split(':')[0];
                        libraries.push(lib);
                    });
                    libraries = uniq(libraries);
                }

                this.setState({libQuerry: libraries, catQuerry: str});
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

            handleCloseAdd(data) {
                this.setState({
                    openLibAdd: false,
                    openCatAdd: false,
                });
                this.handleSearch('', data)
            },

            renderMenu(selectedCategory, currentLibrary, categories, data) {

                let {openLibAdd, openCatAdd, libQuerry, catQuerry} = this.state;

                let libraries = this.getLibrariesLabels(data);

                let commonParams = {
                    currentCategory: selectedCategory,
                    currentLibrary: currentLibrary,
                    closeAdd: ()=>this.handleCloseAdd(data),
                };

                return (
                    <Paper id={'Lists'} elevation={ 2 } style={ this.styles('lists') }>
                        <Column id={'Menu'} style={ this.styles('menu') } >
                            <MenuTitleBar
                                searchCB={(str)=>{this.handleSearch(str, data)}}
                                addLib={this.handleAddLib}
                                addCat={this.handleAddCat}
                            />
                            <Row padding={0} height={'calc(100% - 50px)'}>
                                <Libraries  labels={libraries}  querry={libQuerry} addIsOpen={openLibAdd} {...commonParams} />
                                <Categories labels={categories} querry={catQuerry} addIsOpen={openCatAdd} {...commonParams} />
                            </Row>
                        </Column>
                    </Paper>
                );
            },

            render() {
                let {data} = this.props;
                // return core.bind(['plugins', 'Settings', 'config', 'genie'], (data)=>{
                let { currentLibrary, currentCategory } = this.props;
                
                let categories = this.getCategoriesLabels(data);
                let selectedCategory = (isEmpty(categories)) ? null : (categories.includes(currentCategory)) ? currentCategory : categories[0];

                let items = this.getCategoryItems(data, currentLibrary, selectedCategory);

                return (
                    <Row padding={3} id={'MockgeneratorUi'} style={ this.styles('root') }>
                        {this.renderMenu(selectedCategory, currentLibrary, categories, data)}
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

                // });

            }
        }
    }
}
