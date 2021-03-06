import { MenuItem, ClickAwayListener, Input } from '@material-ui/core/';

module.exports = {
    name: "CategoryItem",

    dependencies: ['Buttons.IconButton','Simple.Label'],
    get(IconButton, Label) {

        var seed = this;
        var { React, PropTypes, ComponentMixin } = seed.imports;

        const units = {
            buttonProps: {
                hoverSize: 5,
                iconSize: 16,
                background: 'transparent'
            },
            dims: {
                rootPadding: 10,
                fontSize: 13,
                maxTextWidthReduction: 50,
                minTextWidthReduction: 15,
            },
            colors: {},
            backgrounds: {
                selected: seed.theme('genie.cat_bg'),
                default: seed.theme('genie.white_bg'),
                hover: seed.theme('genie.hover'),
            },
            icons: {
                edit: seed.icons('genie.edit'),
                remove: seed.icons('genie.remove'),
                cancel: seed.icons('genie.close'),
                ok: seed.icons('genie.done'),
            },
        };

        return {
            mixins: [ ComponentMixin ],

            propsTypes: {
                itemValue: PropTypes.string,
                selectCB: PropTypes.func,
                removeCB: PropTypes.func,
                renameCB: PropTypes.func,
                style: PropTypes.object,
                placeholder: PropTypes.string,
                isSelected: PropTypes.bool,
                rowHeight: PropTypes.number,
            },

            getDefaultProps(){
                return {
                    selectCB: ()=>{},
                    removeCB: ()=>{},
                    renameCB: ()=>{},
                    style: {},
                    itemValue: '',
                    placeholder: '',
                    isSelected: false,
                    rowHeight: 40,
                };
            },

            getInitialState() {
                return {
                    value: '',
                    showRowIcons: false,
                    hover: false,
                };
            },

            componentDidMount() {
                this.inputRef = React.createRef();
            },


            styles(propName) {
                let { style, isSelected } = this.props;
                let { value, hover} = this.state;

                let bgColor = isSelected ? units.backgrounds.selected : 
                              (hover) ? units.backgrounds.hover : units.backgrounds.default;

                let styles = {
                    root: {
                        display: 'flex',
                        padding: `0px ${units.dims.rootPadding}px`,
                        position: 'relative',
                        flexDirection: 'row',
                        width: `calc(100% - ${units.dims.rootPadding * 2}px`,
                        height: this.props.rowHeight,
                        fontSize: units.dims.fontSize,
                        background: bgColor,
                        ...style
                    },
                    renderEditIcons: {
                        position: 'absolute',
                        right: -10,
                        zIndex: 2,
                        display: 'flex',
                        height: '100%',
                        alignItems: 'center'
                    },
                    inputPlaceholder: {
                        padding: 0,
                        zIndex: 2,
                        maxWidth: `calc(100% - ${units.dims.maxTextWidthReduction}px)`,
                        fontSize: units.dims.fontSize,
                        fontStyle: value ? 'normal' : 'italic',
                        whiteSpace: 'normal',
                        wordBreak: 'break-all'
                    },
                    rowIcons: {
                        minWidth: '30px',
                        maxWith: 60,
                        justifyContent: 'center',
                        position: 'absolute',
                        zIndex: 2,
                        right: 0,
                        display: 'flex',
                        height: '100%',
                        alignItems: 'center'
                    }
                }
                return styles[propName]
            },

            prevent(e){
                if (e.preventDefault) e.preventDefault();
                if (e.stopPropagation) e.stopPropagation();
            },


            handleOnChange(e) {
                let value = e.target.value;
                this.setState({ newValue: value });
            },

            handleClearInput(e){
                let { onClear } = this.props;
                this.setState({ value: '' }, ()=>{ if (onClear) { onClear(e) } });
            },

            handleEditKeyDown(e) {
                
                if ( e && e.keyCode === 27 ) { // ESC
                    this.prevent( e );
                    this.handleCancel( e );
                }
                else if (e.keyCode !== 13 ) return; // Enter
                else this.renameCB(e);
                
            },

            renameCB(e) {
                this.prevent( e );
                let { newValue } = this.state;
                let { renameCB, itemValue } = this.props;

                if (renameCB) {
                    renameCB( itemValue, newValue);
                    this.setState({ editable: null });
                }
            },

            handleEdit(e){
                this.prevent( e );

                let { editable } = this.state;
                let { itemValue } = this.props;

                if (editable === itemValue) this.setState({ editable: null });
                else this.setState({ editable: itemValue, newValue: itemValue });
            },

            selectCB(e) {
                this.prevent( e );
                let { itemValue, selectCB } = this.props;

                if (selectCB) {
                    selectCB( itemValue );
                }
            },

            removeCB(e){
                let { itemValue, removeCB } = this.props;
                this.prevent( e );
                removeCB(itemValue);
            },

            handleCancel(e){
                this.prevent( e );

                let { itemValue } = this.props;

                this.setState({ editable: null, newValue: itemValue });
            },

            handleShowButtons(e){
                let el = e.currentTarget;
                this.setState({ showRowIcons: true, hover: true });
                if ( !!el ) {
                    el.addEventListener('mouseleave', this.handleHideButtons );
                }
            },

            handleHideButtons(){
                this.setState({ showRowIcons: false, hover: false });
            },
  
            renderEditIcons(){
                return (
                  <div id={'renderEditIcons'} style={ this.styles('renderEditIcons') } >

                        <IconButton     title={seed.translate('Cancel')}
                                        onClick={ this.handleCancel }
                                        icon={units.icons.cancel} 
                                        {...units.buttonProps} />
  
                        <IconButton     title={seed.translate('OK')}
                                        onClick={ this.renameCB }
                                        icon={units.icons.ok} 
                                        {...units.buttonProps} />
                  </div>
  
                )
            },

            renderRemove(){
                return(

                    <IconButton     title={seed.translate('Remove')}
                                    onClick={ this.removeCB }
                                    icon={units.icons.remove} 
                                    {...units.buttonProps} />
                )
            },

            renderRowIcons(){
                let { itemValue } = this.props;
                let { editable, showRowIcons } = this.state;

                let isEditable = (itemValue === editable);

                if (showRowIcons && !isEditable) {
                    return (
                      <div id={'renderRowIcons'} style={ this.styles('rowIcons') } >

                            <IconButton     title={seed.translate('Rename')}
                                            onClick={ this.handleEdit }
                                            icon={units.icons.edit}
                                            {...units.buttonProps} />

                        { this.renderRemove() }
                      </div>

                    )
                } return null;
            },

            renderItemEdit(){

                let { itemValue } = this.props;
                let { editable, newValue } = this.state;

                if (editable !== itemValue) return null;

                return (
                    <ClickAwayListener onClickAway={ this.handleCancel }>
                        <Input
                            id={'renderItemEdit'}
                            disableUnderline={ true }
                            onClick={ e => this.prevent(e) }
                            value={ newValue }
                            onKeyDown={ this.handleEditKeyDown }
                            onChange={ this.handleOnChange }
                            fullWidth={ true }
                            inputProps={{ style: this.styles('inputPlaceholder')  }}
                            placeholder={ itemValue || '' }
                            id="input-with-confirm-icons"
                            inputRef={ this.inputRef }
                            autoFocus={ true }
                            endAdornment={ this.renderEditIcons() }
                        />
                    </ClickAwayListener>
                );
            },

            renderItemValue(){
                let { itemValue } = this.props;
                let { editable, showRowIcons } = this.state;
                let typoReduction = showRowIcons ? units.dims.maxTextWidthReduction : units.dims.minTextWidthReduction;

                if (editable) return null;

                return (
                    <Label id={'renderItemValue'} width={`calc(100% - ${typoReduction}px)`} label={itemValue}/>
                );
            },

            render() {
                return (
                    <MenuItem id={'CategoryItem.root'}
                        style={ this.styles('root') }
                        disableGutters={ true }
                        dense={ true }
                        onClick={ this.selectCB }
                        disableRipple={ true }
                        onMouseEnter={ this.handleShowButtons }
                    >

                        { this.renderItemValue() }
                        { this.renderItemEdit() }
                        { this.renderRowIcons() }

                    </MenuItem>
                )
            }
        }
    }
}
