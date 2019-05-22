import { MenuItem, ClickAwayListener, Input } from '@material-ui/core/';
// import Tippy from '@tippy.js/react';

module.exports = {
    name: "LibraryItem",

    dependencies: ['Simple.Icon','Simple.Label'],
    get(Icon, Label) {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

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
                    showRowIcons: false
                };
            },

            componentWillMount() {
                this.initUnits()
            },

            componentDidMount() {
                this.inputRef = React.createRef();
            },

            initUnits(){
                this.dims = {
                    rootPadding: 10,
                    fontSize: 13,
                    rowHeight: this.props.rowHeight,
                    maxTextWidthReduction: 50,
                    minTextWidthReduction: 15,
                };
                this.colors = {
                    border: core.theme('borders.default'),
                };
                this.backgrounds = {
                    selected: core.theme('Genie.lib_bg'),
                    default: core.theme('backgrounds.default'),
                    hover: core.theme('Genie.hover'),
                };
                this.tippyDefaultProps = {
                    arrowTransform: 'scale(0.8)',
                    delay: [150, 50],
                    performance: true,
                    a11y: false,
                    size: 'small',
                    arrow: true,
                    hideOnClick: true,
                    theme: 'light _single'
                };
                this.icons = {
                    edit: core.icons('files.edit'),
                    remove: core.icons('files.delete'),
                    cancel: core.icons('navigate.close'),
                    ok: core.icons('discovery.done'),
                };
            },

            styles(propName) {
                let { style, isSelected } = this.props;
                let { value, hover } = this.state;

                let bgColor = isSelected ? this.backgrounds.selected : 
                              (hover) ? this.backgrounds.hover : this.backgrounds.default;

                let styles = {
                    root: {
                        display: 'flex',
                        padding: `0px ${this.dims.rootPadding}px`,
                        position: 'relative',
                        flexDirection: 'row',
                        width: `calc(100% - ${this.dims.rootPadding * 2}px`,
                        height: this.dims.rowHeight,
                        fontSize: this.dims.fontSize,
                        background: bgColor,
                        ...style
                    },
                    renderEditIcons: {
                        position: 'absolute',
                        right: '2.5px',
                        zIndex: 2,
                        display: 'flex',
                        height: '100%',
                        alignItems: 'center'
                    },
                    inputPlaceholder: {
                        padding: 0,
                        zIndex: 2,
                        maxWidth: `calc(100% - ${this.dims.maxTextWidthReduction}px)`,
                        fontSize: this.dims.fontSize,
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
                        right: 5,
                        display: 'flex',
                        height: '100%',
                        alignItems: 'center'
                    },
                    icon: { 
                        cursor: 'pointer'
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

            handleEditKeyDown(e){
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
                    this.setState({ editable: null, newValue: '' });
                }
            },

            removeCB(e){
                this.prevent( e );
                let { itemValue, removeCB } = this.props;
                if (removeCB) removeCB(itemValue);
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

            handleCancel(e){
                this.prevent( e );

                let { itemValue } = this.props;

                this.setState({ editable: null, newValue: itemValue });
            },

            handleShowButtons(){
                this.setState({ showRowIcons: true, hover: true });
            },

            handleHideButtons(){
                this.setState({ showRowIcons: false, hover: false });
            },
  
            renderEditIcons(){
                return (
                  <div id={'renderEditIcons'} style={ this.styles('renderEditIcons') } >
                    {/* <Tippy content={ core.translate('Cancel') } {...this.tippyDefaultProps} > */}
                        <Icon size={ 16 } icon={ this.icons.cancel } onClick={ this.handleCancel } style={{ ...this.styles('icon'), marginRight: 10 }} />
                    {/* </Tippy> */}
  
                    {/* <Tippy content={ core.translate('Ok') } {...this.tippyDefaultProps} > */}
                        <Icon size={ 16 } icon={ this.icons.ok } onClick={ this.renameCB } style={ this.styles('icon') }/>
                    {/* </Tippy> */}
                  </div>
  
                )
            },

            renderRemove(){
  
                return(
                    <Icon id={'renderRemove.Icon'} size={ 16 } icon={ this.icons.remove } onClick={ this.removeCB } style={{ ...this.styles('icon'), marginLeft: 10 }}/>
                )
                // return(
                //     <Tippy content={ core.translate('Remove') } {...this.tippyDefaultProps} >
                //         <Icon id={'renderRemove.Icon'} size={ 16 } icon={ this.icons.remove } onClick={ this.removeCB } style={{ ...this.styles('icon'), marginLeft: 10 }}/>
                //     </Tippy>
                // )
            },

            renderRowIcons(){
                let { itemValue } = this.props;
                let { editable, showRowIcons } = this.state;

                let isEditable = (itemValue === editable);

                if (showRowIcons && !isEditable) {
                    return (
                      <div id={'renderRowIcons'} style={ this.styles('rowIcons') } >
                        {/* <Tippy content={ core.translate('Rename') } {...this.tippyDefaultProps} > */}
                            <Icon size={ 16 } icon={ this.icons.edit } onClick={ this.handleEdit } style={ this.styles('icon') } />
                        {/* </Tippy> */}

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
                let typoReduction = showRowIcons ? this.dims.maxTextWidthReduction : this.dims.minTextWidthReduction;

                if (editable) return null;

                return (
                    <Label id={'renderItemValue'} width={`calc(100% - ${typoReduction}px)`} label={itemValue}/>
                );
            },

            render() {
                return (
                    <MenuItem id={'LibraryItem.root'}
                        style={ this.styles('root') }
                        disableGutters={ true }
                        dense={ true }
                        onClick={ this.selectCB }
                        disableRipple={ true }
                        onMouseEnter={ this.handleShowButtons }
                        onMouseLeave={ this.handleHideButtons }
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
