module.exports = {
    name: 'MenuTitleBar',
    description: 'This is an example of a component',
    dependencies: [ 'Layouts.Row', 'Inputs.IconButton', 'Simple.Label', 'Inputs.Input'],
    get(Row, IconButton, Label, Input) {
        const core = this;
        
        const AddIcon = IconButton;
        const SearchIcon = IconButton;
        const CloseIcon = IconButton;

        const MenuTitleBar = Row;
        const IconsRow = Row;

        const { React, PropTypes, ComponentMixin } = core.imports;

        const units = {
            colors: {
                border: core.theme('borders.default'),
                text: core.theme('texts.default'),
            },
            icons: {
                threeDots: core.icons('general.more'),
                clear: core.icons('genie.clear'),
                search: core.icons('genie.search'),
                addLib: core.icons('genie.addLibrary'),
                addCat: core.icons('genie.addCategory'),
            },
            backgrounds: {
                default: core.theme('backgrounds.default'),
            },
            dims: {
                fontSize: 13,
                buttonIconSize: 27,
                iconSize: 18,
                iconsRow: 90,
                searchRow: 250,
            },
            transition: 0.3,
            closeIconRowTransition: 0.5
        };

        return {
            mixins: [ ComponentMixin ],

            propsTypes: {
                searchCB: PropTypes.func,
                addLib: PropTypes.func,
                addCat: PropTypes.func,
                closeAdd: PropTypes.func,
            },

            getDefaultProps(){
                return {
                    searchCB: ()=>{},
                    addLib: ()=>{},
                    addCat: ()=>{},
                    closeAdd: ()=>{},
                };
            },

            getInitialState() {
                return {
                    openSearch: false,
                    searchValue: '',
                };
            },

            componentDidMount() {
                this.eventsHandler('on');
            },

            componentWillUnmount() {
                this.eventsHandler('off');
            },

            componentWillReceiveProps(nextProps) {
            },

            eventsHandler(action) {
                core[action]('MenuTitleBar_closeSearch', this.handleCloseSearch);
            },


            styles(s){

                let iconsRowTransition = `width ${units.transition}s ${units.closeIconRowTransition}s ease-in-out, min-width ${units.transition}s ${units.closeIconRowTransition}s ease-in-out`;
                if (this.state.openSearch) {
                    iconsRowTransition = `width ${units.transition}s ease-in-out, min-width ${units.transition}s ease-in-out`;
                }

                const styles = {
                    root: {
                        position: 'relative',
                        borderBottom: `1px solid ${units.colors.border}`,
                    },
                    search: {
                        fontSize: units.dims.fontSize,
                        width: '100%',
                        maxWidth: '100%',
                    },
                    iconsRow: {
                        width:    this.state.openSearch ? 0 : units.dims.iconsRow,
                        minWidth: this.state.openSearch ? 0 : units.dims.iconsRow,
                        padding: 0,
                        transition: iconsRowTransition,
                    },
                    button: {
                        width: units.dims.buttonIconSize, 
                        height: units.dims.buttonIconSize,
                        color: units.colors.text,
                    },
                    searchInput: {
                        width: (this.state.openSearch) ? units.dims.searchRow : 0,
                        minWidth: (this.state.openSearch) ? units.dims.searchRow : 0,
                        background: units.backgrounds.default,
                        transition: `width ${units.transition}s ${units.transition}s ease-in-out, min-width ${units.transition}s ${units.transition}s ease-in-out`,
                    },
                    Input: {
                         marginRight: 7,
                    },
                    input: {
                        fontSize: units.dims.fontSize,
                        width: 200,
                        padding: 0,
                    },
                }
                return(styles[s]);
            },

            handleOpenSearch() {
                this.setState({ openSearch: true });
                this.props.closeAdd();
            },

            handleCloseSearch() {
                let time = units.closeIconRowTransition * 1000;

                this.setState({ openSearch: false});
                this.props.searchCB('');

                setTimeout(() => {
                    this.setState({ searchValue: '' });
                }, time);
            },

            renderSearchInput() {
                let {searchValue} = this.state;

                const handleChange = searchValue => {
                    this.setState({searchValue});
                    this.props.searchCB(searchValue);
                };

                let i = units.dims.iconSize;
                let closeStyle = { marginRight: 7 };
                let close = core.translate('Clear');
                let closeIcon = units.icons.clear;
                
                return(
                    <Row padding={0} style={this.styles('searchInput')}>
                        <Input
                            id={'GenieMenuTitleSearch'}
                            label={null}
                            style={this.styles('Input')}
                            inputStyle={this.styles('input')}
                            onChange ={handleChange}
                            value={searchValue}
                            autoFocus={true}
                            placeholder={core.translate('Search')}
                        />
                        <CloseIcon key={'CloseIcon'} iconSize={i} hoverSize={5} onClick={this.handleCloseSearch} title={close} icon={closeIcon} style={closeStyle}/>
                    </Row>
                )
            },

            renderIcons() {
                let i = units.dims.iconSize;
                return (
                    <IconsRow style={this.styles('iconsRow')}>
                        <AddIcon    key={'AddLibrary'}  iconSize={i} hoverSize={5} onClick={this.props.addLib}     title={core.translate('AddLibrary')}  icon={units.icons.addLib}/>
                        <AddIcon    key={'AddCategory'} iconSize={i} hoverSize={5} onClick={this.props.addCat}     title={core.translate('AddCategory')} icon={units.icons.addCat}/>
                        <SearchIcon key={'SearchIcon'}  iconSize={i} hoverSize={5} onClick={this.handleOpenSearch} title={core.translate('Search')}      icon={units.icons.search}/>
                    </IconsRow>
                )
            },

            render() {
                return (
                    <MenuTitleBar id={'MenuTitleBar'} style={this.styles('root')} padding={0}>
                        <Row><Label label={core.translate('Menu')} transform={'uppercase'} /></Row>
                        {this.renderSearchInput()}
                        {this.renderIcons()}
                    </MenuTitleBar>
                )
            } 
        }
    }
}