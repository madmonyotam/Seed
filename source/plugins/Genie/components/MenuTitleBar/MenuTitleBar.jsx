module.exports = {
    name: 'MenuTitleBar',
    description: 'This is an example of a component',
    dependencies: [ 'Layouts.Row', 'Inputs.IconMenu', 'Inputs.IconButton', 'Simple.Label', 'Inputs.Input'],
    get(Row, IconMenu, IconButton, Label, Input) {
        let core = this;
        
        let SearchIcon = IconButton;
        let CloseIcon = IconButton;
        let MoreIcon = IconMenu;

        let MenuTitleBar = Row;
        let IconsRow = Row;

        let { React, PropTypes, ComponentMixin } = core.imports;

        const units = {
            colors: {
                border: core.theme('borders.default'),
                text: core.theme('texts.default'),
            },
            icons: {
                threeDots: core.icons('general.more'),
                clear: core.icons('genie.clear'),
                search: core.icons('genie.search'),
            },
            backgrounds: {
                default: core.theme('backgrounds.default'),
            },
            dims: {
                fontSize: 13,
                buttonIconSize: 27,
                iconSize: 18,
                iconsRow: 60,
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
            },

            getDefaultProps(){
                return {
                    searchCB: ()=>{},
                    addLib: ()=>{},
                    addCat: ()=>{},
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
                        width: (this.state.openSearch) ? 230 : 0,
                        minWidth: (this.state.openSearch) ? 230 : 0,
                        background: units.backgrounds.default,
                        transition: `width ${units.transition}s ${units.transition}s ease-in-out, min-width ${units.transition}s ${units.transition}s ease-in-out`,
                    },
                    Input: {
                         marginRight: 10,
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
                this.setState((s, p)=>{return { openSearch: true }})
            },

            handleCloseSearch() {
                this.setState((s, p)=>{return { openSearch: false}});
                this.props.searchCB('');
                setTimeout(() => {
                    this.setState((s, p)=>{return { searchValue: '' }});
                }, units.closeIconRowTransition * 1000);
            },

            renderSearchInput() {
                let {searchValue} = this.state;

                const handleChange = searchValue => {
                    this.setState((s, p)=>{return{searchValue}});
                    this.props.searchCB(searchValue);
                };
                
                return(
                    <Row padding={0} style={this.styles('searchInput')}>
                        <Input
                            label={null}
                            style={this.styles('Input')}
                            inputStyle={this.styles('input')}
                            onChange ={handleChange}
                            value={searchValue}
                            autoFocus={true}
                            placeholder={core.translate('Search')}
                        />
                        <CloseIcon key={'CloseIcon'}
                            style={{ marginRight: 5 }}
                            hoverSize={ 5 }
                            iconSize={units.dims.iconSize}
                            onClick={this.handleCloseSearch}
                            title={core.translate('Clear')}
                            icon={units.icons.clear}
                        />
                    </Row>
                )
            },

            renderIcons() {
                const menuList = [
                    { text: core.translate('Add Library'),  value: 'addLibrary',  onClick: this.props.addLib },
                    { text: core.translate('Add Category'), value: 'addCategory', onClick: this.props.addCat },
                ];


                return (
                    <IconsRow style={this.styles('iconsRow')}>
                        <SearchIcon key={'SearchIcon'}
                            iconSize={units.dims.iconSize}
                            hoverSize={ 5 }
                            onClick={this.handleOpenSearch}
                            title={core.translate('Search')}
                            icon={units.icons.search}
                        />
                        <MoreIcon key={'MoreIcon'}
                            icon={units.icons.threeDots}
                            iconSize={units.dims.iconSize}
                            menuItems={menuList}
                        />
                    </IconsRow>
                )
            },

            render() {
                return (
                    <MenuTitleBar id={'MenuTitleBar'} style={this.styles('root')} padding={0}>
                        <Row>
                            <Label label={core.translate('Menu')} style={{textTransform: 'uppercase'}} />
                        </Row>
                        {this.renderSearchInput()}
                        {this.renderIcons()}
                    </MenuTitleBar>
                )
            } 
        }
    }
}