import Downshift from 'downshift';
import { map, uniqueId, isEqual } from 'lodash';
import { Typography } from '@material-ui/core';
var tinycolor = require('tinycolor2');

module.exports = {
    name: 'Input',
    description: '',
    propTypes: {},
    dependencies: ['Inputs.Chip'/*,'Simple.SimpleScroller'*/],
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
              handleKeyDown: PropTypes.func,
              style: PropTypes.object,
              inputStyle: PropTypes.object,
              labelStyle: PropTypes.object,
              label: PropTypes.string,
              options: PropTypes.array,
              placeholder: PropTypes.string,
              type: PropTypes.string,
              openOnFocus: PropTypes.bool,
              isMultipleValues: PropTypes.bool,
              suggest: PropTypes.bool, // if TRUE will filter the list 
              theme: PropTypes.oneOf([ 'default', 'outlined', 'filled' ]),
            },

            getDefaultProps(){
              return {
                onChange: (e, newValue) => { /* do something with the event and new value  */ },
                handleKeyDown: undefined,
                style: {},
                inputStyle: {},
                labelStyle: {},
                options: [],
                theme: 'default',
                type: 'text',
                value: '',
                label: 'label',
                openOnFocus: false,
                isMultipleValues: false,
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
                // this.initialUnits();
            },

            componentDidMount() {
                this.inputRef = React.createRef();
                if (this.props.options) this.setState({ options: this.props.options })
                if (this.props.value !== '' ) this.setState({ value: this.props.value }) 
            },

            componentWillReceiveProps(nextProps) {
              if (nextProps.options && nextProps.options !== this.props.options) {
                this.setState({ options: nextProps.options })
              }
              if (nextProps.value && nextProps.value !== this.props.value && nextProps.value !== '') {
                this.setState({ value: nextProps.value });
              } else if (nextProps.value == '' ) {
                this.setState({ value: '' });
              }
            },

            getIsFocused(){
              return this.state.focused === this.state.uniqueName;
            },

            getInpoutWidth(){
              if (this.inputRef && this.inputRef.current) {
                if(this.inputRef.current.id === 'downshift-autocomplete-input'){
                  return this.inputRef.current.offsetWidth;
                }
              }
              return 500
            },

            styles(s) {
              let isFocused = this.getIsFocused();
              let { theme, inputStyle, labelStyle } = this.props;
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
                    width: this.getInpoutWidth() || 500, 
                    maxHeight: 215,
                    zIndex: 1,
                    padding: '5px 0',
                    overflow: 'auto', // TODO: change after simple scroller import
                    background: units.colors.white,
                    boxShadow: ' 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.16)',
                    borderRadius: 3,
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
                this.setState((s,p)=>{return{ value }});
                if (this.props.onChange) {
                  this.props.onChange(value)
                }
            },

            handleClearInput(e){
              this.setState({ value: '', }, ()=>{
                  if (this.props.onClear) {
                      this.props.onClear(e)
                  }
              })
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
                  if (isMultipleValues) this.setState({ multiValues: [ ...multiValues, value ] }, this.handleClearInput)
                  else if (handleKeyDown) handleKeyDown(value) 
                } 
              }
              
              else if (e.key !== 'Enter') return; 
            }, 

            handleDownShiftSelect(selection){
              let { isMultipleValues } = this.props;
              let { multiValues } = this.state;
              
              if (selection && selection.value) {
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
                filteredOptions = filteredOptions.filter( item => !inputValue || item.value.toLowerCase().includes(inputValue.toLowerCase()));
              }
              if (isMultipleValues) { 
                filteredOptions = filteredOptions.filter( item =>  multiValues.indexOf(item.value) < 0 )
              }
              return filteredOptions;
            },

            renderOption(item, index, { getItemProps, highlightedIndex, selectedItem }){
              
              let isSelected = isEqual(selectedItem, item) || selectedItem === item;
              let isHighlighted = highlightedIndex === index;
              let isActive = isSelected || isHighlighted
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
              
              switch (type.toLowerCase()) {
                case 'autocomplete':
                  return (
                    <Downshift id={ 'downshift-autocomplete' }  
                               isOpen={ this.state.isDownShiftOpen }
                               selectedItem ={ { value: this.state.value, label: this.state.value } }
                               onChange={ this.handleDownShiftSelect }
                               itemToString={ item => ( item ? item.value : '') } >
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
              let { openOnFocus, placeholder } = this.props;
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
              // console.log('value -> ',value);
              return (
                <React.Fragment>
                  { this.renderChips() }
                  <input  
                          type={ isAuotocomplete ? 'text' : type }
                          name={ uniqueName }
                          ref={ this.inputRef }
                          value={ value } 
                          onKeyDown={ this.handleKeyDown }
                          style={ this.styles('input') }
                          placeholder={ placeholder }

                          { ...setprops() }

                          onFocus={ e => { this.setState({ focused: uniqueName, isDownShiftOpen: openOnFocus && isAuotocomplete ? true : false }) } }
                          onBlur={ e => { this.setState({ focused: null, isDownShiftOpen: false }) } } />
                </React.Fragment>

              );
            },

            renderLabel(label) {
              if (!label) return null;
              return <label style={ this.styles('label') } htmlFor={ this.state.uniqueName }>{ label }</label> 
            },

            render() {
              let {onKeyDown} = this.props;

                return (
                    <div id={'SimpleInput.root'}  style={{ width: '100%', position: 'relative', height: 'auto' }} onKeyDown={onKeyDown}> 
                      { this.renderLabel(this.props.label) }  
                      { this.renderInputs(this.props.type) }
                    </div>
                )
            }

        }
    }
};
