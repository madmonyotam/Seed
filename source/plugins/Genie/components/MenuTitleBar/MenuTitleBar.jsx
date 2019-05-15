module.exports = {
    name: 'MenuTitleBar',
    description: 'This is an example of a component',
    dependencies: [ 'Layouts.Row', 
                    // 'Simple.IconMenu',
                    'Simple.Icon', 'Simple.Label',
                    'Inputs.Input'],
    get(Row, 
        // IconMenu, 
        Icon, Label,
        Input) {
        let core = this;
        
        let SearchIcon = Icon;
        let CloseIcon = Icon;
        let MoreIcon = Icon;
        // let MoreIcon = IconMenu;

        let MenuTitleBar = Row;
        let IconsRow = Row;

        let { React, PropTypes, ComponentMixin } = core.imports;

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

            componentWillMount() {
                this.initUnits();
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

            initUnits(){
                this.colors = {
                    border: core.theme('borders.default'),
                    text: core.theme('texts.default'),
                };
                this.icons = {
                    threeDots: core.icons('general.more'),
                    clear: core.icons('genie.clear'),
                    search: core.icons('genie.search'),
                };
                this.backgrounds = {
                    default: core.theme('backgrounds.default'),
                };
                this.dims = {
                    fontSize: 13,
                    buttonIconSize: 27,
                    iconSize: 18,
                    iconsRow: 60,
                };
                this.units = {
                    transition: 0.3,
                    closeIconRowTransition: 0.5
                };
            },

            styles(s){

                let iconsRowTransition = `width ${this.units.transition}s ${this.units.closeIconRowTransition}s ease-in-out, min-width ${this.units.transition}s ${this.units.closeIconRowTransition}s ease-in-out`;
                if (this.state.openSearch) {
                    iconsRowTransition = `width ${this.units.transition}s ease-in-out, min-width ${this.units.transition}s ease-in-out`;
                }

                const styles = {
                    root: {
                        position: 'relative',

                        borderBottom: `1px solid ${this.colors.border}`,
                    },
                    search: {
                        fontSize: this.dims.fontSize,
                        width: '100%',
                        maxWidth: '100%',
                    },
                    iconsRow: {
                        width:    this.state.openSearch ? 0 : this.dims.iconsRow,
                        minWidth: this.state.openSearch ? 0 : this.dims.iconsRow,
                        padding: 0,
                        transition: iconsRowTransition,
                    },
                    button: {
                        width: this.dims.buttonIconSize, 
                        height: this.dims.buttonIconSize,
                        color: this.colors.text,
                    },
                    searchInput: {
                        width: (this.state.openSearch) ? 230 : 0,
                        minWidth: (this.state.openSearch) ? 230 : 0,
                        background: this.backgrounds.default,
                        transition: `width ${this.units.transition}s ${this.units.transition}s ease-in-out, min-width ${this.units.transition}s ${this.units.transition}s ease-in-out`,
                    },
                    Input: {
                        marginRight: 10,
                    },
                    input: {
                        fontSize: this.dims.fontSize,
                        width: 200,
                        padding: 0,
                    },
                }
                return(styles[s]);
            },

            handleOpenSearch() {
                this.setState({ openSearch: true })
            },

            handleCloseSearch() {
                this.setState({ openSearch: false, searchValue: '' });
                this.props.searchCB('');
            },

            renderSearchInput() {
                const handleChange = searchValue => {
                    this.setState({searchValue});
                    this.props.searchCB(searchValue);
                };

                return(
                    <Row padding={0} style={this.styles('searchInput')}>
                        <Input
                            style={this.styles('Input')}
                            inputStyle={this.styles('input')}
                            onChange ={handleChange}
                            value={this.state.searchValue}
                            autoFocus={true}
                            onClear={this.handleCloseSearch}
                            placeholder={core.translate('Search')}
                        />
                        <CloseIcon key={'CloseIcon'}
                            size={this.dims.iconSize}
                            onClick={this.handleCloseSearch}
                            title={core.translate('Clear')}
                            icon={this.icons.clear}
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
                            size={this.dims.iconSize}
                            onClick={this.handleOpenSearch}
                            title={core.translate('Search')}
                            icon={this.icons.search}
                        />
                        <MoreIcon key={'MoreIcon'}
                            size={this.dims.iconSize}
                            onClick={console.log('MISSING ICONMENU')}
                            title={core.translate('Search')}
                            icon={this.icons.search}
                        />
                        {/* <MoreIcon key={'MoreIcon'}
                            tooltip={core.translate('Add')}
                            iconSize={this.dims.iconSize}
                            icon={this.icons.threeDots}
                            menuItems={menuList}
                            iconButtonStyle={{padding:0}}
                        /> */}
                    </IconsRow>
                )
            },

            render() {
                return (
                    <MenuTitleBar id={'MenuTitleBar'} style={this.styles('root')}>
                        <Row padding={0}>
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