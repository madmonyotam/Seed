import Downshift from 'downshift';
import { map, uniqueId, isEqual } from 'lodash';
import { Typography } from '@material-ui/core';
var tinycolor = require('tinycolor2');

module.exports = {
    name: 'Input',
    description: '',
    propTypes: {},
    dependencies: ['Simple.Chip'/*,'Simple.SimpleScroller'*/],
    get(Chip/*Scroller*/) {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        const units = {
          colors : {
            white: core.theme('colors.white'),
            border: core.theme('borders.default'),
            suffix: core.theme('colors.grey060'),
            background:  core.theme('texts.background'),
            labelOn: core.theme('texts.primary'),
            labelOff: core.theme('texts.secondary'),
            text: core.theme('texts.default'),
            highlight: '#6B7ADD',
          }
        }

        return {
            mixins: [ ComponentMixin ],

            propsTypes: {
              onChange: PropTypes.func,
              onFocus: PropTypes.func,
              handleKeyDown: PropTypes.func,
              style: PropTypes.object,
              inputStyle: PropTypes.object,
              id: PropTypes.string,
              labelStyle: PropTypes.object,
              label: PropTypes.string,
              options: PropTypes.array,
              placeholder: PropTypes.string,
              type: PropTypes.string,
              autoFocus: PropTypes.bool,
              openOnFocus: PropTypes.bool,
              isMultipleValues: PropTypes.bool,
              inputProps: PropTypes.object,
              suggest: PropTypes.bool, // if TRUE will filter the list 
              theme: PropTypes.oneOf([ 'default', 'outlined', 'filled' ]),
            },

            getDefaultProps(){
              return {
                onChange: (e, newValue) => { /* do something with the event and new value  */ },
                handleKeyDown: undefined,
                style: {},
                id: 'Input',
                inputStyle: {},
                labelStyle: {},
                options: [],
                theme: 'default',
                type: 'text',
                value: '',
                label: 'label',
                autoFocus: false,
                openOnFocus: false,
                isMultipleValues: false,
                inputProps: {},
                suggest: true,
                placeholder: 'placeholder'
              };
            },

            getInitialState() {
              return {
                  value: '',
                  multiValues: [],
                  uniqueName: uniqueId('input_'),
                  options: [],
                  isDownShiftOpen: false
              };
            },
            
            componentWillMount() {
              this.scrollElement = undefined;
              this.element = undefined;
            },
            

            componentDidMount() {
              this.inputRef = React.createRef();
              if (this.props.options) this.setState({ options: this.props.options });
              if (this.props.value !== '') this.setState({ value: this.props.value });
              
              setTimeout(() => {
                if (this.inputRef && this.inputRef.current && this.inputRef.current.id === 'downshift-autocomplete-input'){
                  this.element = this.inputRef.current;
                  this.scrollElement = this.getScrollParent(this.element);
                  this.scrollElement.addEventListener('scroll', this.handleBlur)
                }                
              }, 150);
            },
            
            componentWillUnmount() {
              if (this.scrollElement && this.scrollElement !== undefined) {
                this.scrollElement.removeEventListener('scroll', this.handleBlur);
                this.scrollElement = undefined;
                this.element = undefined;
              }
            },

            handleBlur(){
              setTimeout(() => {
                this.element.blur()
                return;
              }, 150);
            },
            
            getScrollParent(node) {
              const isElement = node instanceof HTMLElement;
              const overflowY = isElement && window.getComputedStyle(node).overflowY;
              const isScrollable = overflowY !== 'visible' && overflowY !== 'hidden';

              if (!node) {
                return null;
              } else if (isScrollable && node.scrollHeight >= node.clientHeight) {
                return node;
              }

              return this.getScrollParent(node.parentNode) || document.body;
            },

            componentWillReceiveProps(nextProps) {
              let {options, value} = this.props;

              if (nextProps.options && nextProps.options !== options) {
                this.setState({ options: nextProps.options });
              }

              if (nextProps.value && nextProps.value !== value && nextProps.value !== '') {
                this.setState({ value: nextProps.value });
              } 
              else if (nextProps.value == '' ) this.setState({ value: '' });

            },

            getIsFocused(){
              let {focused, uniqueName} = this.state
              return (focused === uniqueName);
            },

            getInputWidth() {

              if (this.inputRef && this.inputRef.current && this.inputRef.current.id === 'downshift-autocomplete-input'){
                return this.inputRef.current.offsetWidth;
              }
              return 500
            },

            getInputBounds(direction) {
              if (this.inputRef && this.inputRef.current && this.inputRef.current.id === 'downshift-autocomplete-input'){
                // return this.inputRef.current.offsetWidth;
                let rect = this.inputRef.current.getBoundingClientRect();
                if (direction) return rect[direction] + rect.height;
                else return rect;
              }
              // return 500
            },

            styles(s) {
              let isFocused = this.getIsFocused();
              let { theme, style, inputStyle, labelStyle } = this.props;
              let isFilled = theme === 'filled';
              let isOutlined = theme === 'outlined';

              const getBorder = () => {
                if (isOutlined) return { 
                  borderRadius: 2,
                  border: `1px solid ${ units.colors.labelOff }` 
                };
                else if (isFilled) return { 
                  borderRadius: 2,
                  border: 0 , 
                };
                else return  { 
                  borderTop: 0,
                  borderLeft: 0, 
                  borderRight: 0, 
                  borderBottom: `1px solid ${ units.colors.labelOff }` ,
                  borderRadius: 0
                };
              }

              let styles = { 
                root: {
                  width: '100%',
                  position: 'relative',
                  height: 'auto',
                  ...style
                },

                input: {
                    width: '100%',
                    fontStyle: this.state.value ? 'normal' : 'italic',
                    padding: '0 10px',
                    height: 35,
                    ...getBorder(),
                    borderWidth: 1,
                    outline: 0,
                    fontSize: 13,
                    marginTop: this.props.label ? 5 : 0,
                    background: isFilled ? units.colors.background : 'transparent',
                    transition: 'all 0.5s ease-in-out',
                    ...inputStyle
                },

                label: { 
                  fontWeight: isFocused ? 500 : 400,
                  marginBottom: 15,
                  fontSize: 12,
                  color: isFocused ? units.colors.labelOn : units.colors.labelOff, 
                  transition: 'all 0.075s ease-in-out',
                  ...labelStyle
                },

                downshiftList: {
                    position:'fixed', 
                    width: this.getInputWidth() || 500,
                    top: this.getInputBounds('top') || 'unset', 
                    maxHeight: 215,
                    zIndex: 1,
                    padding: '5px 0',
                    overflow: 'auto', // TODO: change after simple scroller import
                    background: units.colors.white,
                    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.16)',
                    borderRadius: 2,
                    listStyleType: 'none',
                    marginTop: 10
                },

                downshiftItem: { 
                  height: 25,
                  display: 'flex',
                  cursor: 'pointer',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                },
                suggestion: {
                  padding: 5, 
                  fontSize: 12,
                  color: 'inherit'
                },
                suffix: {
                  fontSize: 11,
                  padding: '5px 15px',
                  color: units.colors.suffix,
                  maxWidth: '65%',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden'
                }
              }

              if (isFocused) {
                if (isOutlined) {  
                  styles.input = {
                    ...styles.input,
                    border: `2px solid ${ units.colors.labelOn }`
                  }
                } else if (isFilled) {
                  styles.input = {
                    ...styles.input,
                    borderBottom: `2px solid ${ units.colors.labelOn }`,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0
                  }
                } else {
                  styles.input = {
                    ...styles.input,
                    borderBottom: `2px solid ${ units.colors.labelOn }`,
                  }
                } 
              }
             

              return(styles[s]);
            },

            prevent(e){
              if (e.preventDefault) e.preventDefault();
              if (e.stopPropagation) e.stopPropagation();
            },

            handleOnChange(value) {
              let {onChange,isMultipleValues} = this.props;
              let { multiValues } = this.state;
              this.setState({ value });

              if (isMultipleValues) {
                let values = [ ...multiValues, value ];
                if (onChange) onChange(values);
              } else if (onChange) onChange(value);

            },

            handleOnFocus(uniqueName,openOnFocus,isAuotocomplete){
              let {onFocus} = this.props;
              if(onFocus) onFocus();

              this.setState({ 
                focused: uniqueName, 
                isDownShiftOpen: openOnFocus && isAuotocomplete ? true : false 
              }) 
            },

            handleClearInput(e){
              this.setState( (state, props)=>{
                  state.value = '';
                  if (props.onClear) props.onClear(e);

                  return state;
              });
            }, 

            handleKeyDown(e){
              let { value, multiValues } = this.state;
              let { handleKeyDown, isMultipleValues } = this.props;
              if(e && e.keyCode){
                if (e.keyCode === 27 ) {
                  this.prevent(e)
                  this.handleClearInput(e);
                  return;

                } else if (e.keyCode === 13)  {
                  if (isMultipleValues) {
                    let values = [ ...multiValues, value ];
                    this.setState({ multiValues: values }, this.handleClearInput);
                    if (handleKeyDown) handleKeyDown(values)
                  }
                  else if (handleKeyDown) handleKeyDown(value) 
                } 
              }
              
              else if (e.key !== 'Enter') return; 
            }, 

            handleDownShiftSelect(selection){
              let { isMultipleValues } = this.props;
              let { multiValues } = this.state;
              if (selection && selection.hasOwnProperty('value') && (typeof selection.value !== undefined || typeof selection.value !== null)) {
                this.setState({ isDownShiftOpen: false, focused: null });
                if (this.inputRef && this.inputRef.current) this.inputRef.current.blur()
                this.handleOnChange(selection.value)
                if (isMultipleValues) this.setState({ multiValues: [ ...multiValues, selection.value ] }, this.handleClearInput)
              }
            },

            handleDeleteChip(event, chipValue){
              let { multiValues } = this.state;
              let newValues = multiValues.filter( item => { return item !== chipValue })
              this.setState({ multiValues: newValues })
            },

            getSuggestions(inputValue){
              let { options, multiValues } = this.state;
              let { suggest, isMultipleValues } = this.props;
              let filteredOptions = [ ...options ];
              if (suggest) {
                filteredOptions = filteredOptions.filter( item => core.isUndefined(inputValue) || item.value.toLowerCase().includes(inputValue.toLowerCase()));
              }
              if (isMultipleValues) { 
                filteredOptions = filteredOptions.filter( item =>  multiValues.indexOf(item.value) < 0 )
              }
              return filteredOptions;
            },

            renderOption(item, index, { getItemProps, highlightedIndex, selectedItem }){
              
              let isSelected = isEqual(selectedItem, item) || selectedItem === item;
              let isHighlighted = highlightedIndex === index;
              let isActive = isSelected || isHighlighted;

              const style = () => { 
                return {
                  ...this.styles('downshiftItem'),
                  backgroundColor:  isSelected ? units.colors.highlight : isHighlighted ? tinycolor( units.colors.highlight ).lighten(25) : units.colors.white,
                  color: isSelected ? units.colors.white : units.colors.text,
                  fontWeight: isActive ? 600 : 400,
                }
              }

              return (
                      <li {
                          ...getItemProps({
                              key: item.value,
                              index,
                              item,
                              style: style() ,
                          }) } >

                        <Typography style={ this.styles('suggestion') }>{item.value}</Typography>
                       { item.info ?  <Typography style={ this.styles('suffix') }>{item.info}</Typography> : null }

                      </li>
              )
            },
            
            renderSuggestions({ isOpen, getMenuProps, getItemProps, inputValue, highlightedIndex, selectedItem }){

              if (!isOpen) return null;
              let options = this.getSuggestions(inputValue);
              let params = { getItemProps, highlightedIndex, selectedItem }
              // TODO: change after simple scroller import
              // return (
              //   <Scroller type={'bars'} { ...getMenuProps() } style={ this.styles('downshiftList') }>

              //     { 
              //       map(options, (option, idx)=>{
              //        return  this.renderOption(option, idx, params)
              //       }) 
              //     } 

              //   </Scroller>
              // )
              return (
                <div { ...getMenuProps() } style={ this.styles('downshiftList') }>

                  { 
                    options && options.length ? 
                      
                      map(options, (option, idx)=>{
                        return  this.renderOption(option, idx, params)
                      }) : 
                      
                      <Typography style={{ ...this.styles('suggestion'), color: units.colors.suffix }}>
                        { core.translate(`(No options to show)`) }
                      </Typography>
                  } 

                </div>
              )
            },

            renderDownShift(downParams) {
              return (
                <div >
                  { this.renderInput('autocomplete', downParams ) }
                  { this.renderSuggestions( downParams ) } 
                </div>
              )
            },

            renderInputs(type) {
              const itemToString = (item) => {
                if ( item && item.hasOwnProperty('value') && !core.isUndefined(item.value)) {
                  return item.value;
                } return ''

              }
              switch (type.toLowerCase()) {
                case 'autocomplete':
                  return (
                    <Downshift id={ 'downshift-autocomplete' }  
                               isOpen={ this.state.isDownShiftOpen }
                               selectedItem ={ { value: this.state.value, label: this.state.value } }
                               onChange={ this.handleDownShiftSelect }
                               itemToString={ itemToString } >
                      { this.renderDownShift } 
                    </Downshift>
                  );

                case 'number':
                case 'text':
                default:
                  return this.renderInput(type)
              }
            },

            renderChips(){
              let { multiValues } = this.state;

              if (multiValues && multiValues.length ) {
                return (
                  <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: this.props.label ? 5 : 0 }} >
                    {
                      map(multiValues, (value, key)=>{
                        return <Chip key={ key } 
                                     style={{ marginRight: 5, marginBottom: 5 }}  
                                     text={ value } 
                                     onDelete={ this.handleDeleteChip } />
                      })
                    }
                  </div>
                ) 
              }
              return null;
            },

            renderInput(type, downshiftProps){
              let { openOnFocus, placeholder, inputProps, autoFocus } = this.props;
              let { value, uniqueName } = this.state;
              let getInputProps = undefined; 
              let clearSelection = undefined; 
              let isAuotocomplete = type === 'autocomplete';

              if (downshiftProps) {
                getInputProps = downshiftProps.getInputProps;
                clearSelection = downshiftProps.clearSelection;
              } 

              const setprops = () => {
                if (getInputProps) {
                  return getInputProps({
                    onChange: e => {
                      if (e.target.value === '') {
                        this.handleOnChange('')
                        clearSelection ? clearSelection() : null;
                        // this.setState({ focused: null, isDownShiftOpen: false });
                      } else {
                        this.handleOnChange(e.target.value)
                        this.setState({ focused: uniqueName, isDownShiftOpen: true });
                      }
                    }
                  })
                } else return { onChange: e => { this.handleOnChange(e.target.value) } }
              } 
              return (
                <React.Fragment>
                  { this.renderChips() }
                  <input  
                          type={ isAuotocomplete ? 'text' : type }
                          name={ uniqueName }
                          ref={ this.inputRef }
                          value={ value }
                          autoFocus={autoFocus}
                          onKeyDown={ this.handleKeyDown }
                          style={ this.styles('input') }
                          placeholder={ placeholder }

                          { ...setprops() }
                          { ...inputProps }

                          onFocus={ (e) => { this.handleOnFocus(uniqueName,openOnFocus,isAuotocomplete) } }
                          onBlur={ e => { this.setState({ focused: null, isDownShiftOpen: false }) } } />
                </React.Fragment>

              );
            },

            renderLabel(label) {
              if (!label) return null;
              return <label style={ this.styles('label') } htmlFor={ this.state.uniqueName }>{ label }</label> 
            },

            render() {
              let {onKeyDown, id} = this.props;

                return (
                    <div id={id} style={this.styles('root')} onKeyDown={onKeyDown}> 
                      { this.renderLabel(this.props.label) }  
                      { this.renderInputs(this.props.type) }
                    </div>
                )
            }

        }
    }
};
