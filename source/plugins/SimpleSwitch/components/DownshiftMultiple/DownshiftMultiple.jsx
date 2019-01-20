import TextField from '@material-ui/core/TextField';
import keycode from 'keycode';
import Downshift from 'downshift';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import deburr from 'lodash/deburr';
import MenuItem from '@material-ui/core/MenuItem';



module.exports = {
    name: "DownshiftMultiple",
    description: 'DownshiftMultiple',
    dependencies: ['SimpleSwitch.Mixin'],    
    get(Mixin) {
        
        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ],

            componentWillUnmount() {
            },


            propsTypes: {
            },

            getDefaultProps(){
                return {
                };
            },
            
            getInitialState() {
                return {
                  inputValue: '',
                  selectedItem: [],
                };
            },

            componentWillMount () {
                this.initUnits();
            },

            componentDidMount() {
            },

            componentWillReceiveProps (nextProps) {
            },

            componentWillUnmount () {
                
            },

            initUnits(){
            },

            styles(s){

                const styles = {
                    root: {

                    },
                }
                
                return(styles[s]);
            },
            handleOnMouseDown(e){
              console.log('mouse down')
            },
            handleKeyDown(event){
              const { inputValue, selectedItem } = this.state;
              if (selectedItem.length && !inputValue.length && keycode(event) === 'backspace') {
                this.setState({
                  selectedItem: selectedItem.slice(0, selectedItem.length - 1),
                });
              }
            },

            handleInputChange(event){
              this.setState({ inputValue: event.target.value });
            },

            handleChange(item){
              let { selectedItem } = this.state;
          
              if (selectedItem.indexOf(item) === -1) {
                selectedItem = [...selectedItem, item];
              }
          
              this.setState({
                inputValue: '',
                selectedItem,
              });
            },

            handleDelete(item){
              this.setState(state => {
                const selectedItem = [...state.selectedItem];
                selectedItem.splice(selectedItem.indexOf(item), 1);
                return { selectedItem };
              });
            },

            renderInput(inputProps) {
              const { InputProps, ref, ...other } = inputProps;
            
              return (
                <TextField
                  InputProps={{
                    inputRef: ref,
                    ...InputProps,
                  }}
                  {...other}
                />
              );
            },

            getSuggestions(value) {
              let {suggestions} = this.props;
              const inputValue = deburr(value.trim()).toLowerCase();
              const inputLength = inputValue.length;
              let count = 0;
            
              return inputLength === 0
                ? []
                : suggestions.filter(suggestion => {
                    const keep =
                      count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;
            
                    if (keep) {
                      count += 1;
                    }
            
                    return keep;
                  });
            },

            renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
              const isHighlighted = highlightedIndex === index;
              const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;
            
              return (
                <MenuItem
                  {...itemProps}
                  key={suggestion.label}
                  selected={isHighlighted}
                  component="div"
                  style={{
                    fontWeight: isSelected ? 500 : 400,
                  }}
                >
                  {suggestion.label}
                </MenuItem>
              );
            },

            render() {         
              const { inputValue, selectedItem } = this.state;

              
                return (
                  <Downshift
                  id="downshift-multiple"
                  inputValue={inputValue}
                  onChange={this.handleChange}
                  selectedItem={selectedItem}
                >
                  {({
                    getInputProps,
                    getItemProps,
                    isOpen,
                    inputValue: inputValue2,
                    selectedItem: selectedItem2,
                    highlightedIndex,
                  }) => (
                    <div>
                      {this.renderInput({
                        fullWidth: true,
                        InputProps: getInputProps({
                          startAdornment: selectedItem.map(item => (
                            <Chip
                              key={item}
                              tabIndex={-1}
                              label={item}
                              onDelete={()=>{this.handleDelete(item)}}
                            />
                          )),
                          onChange: this.handleInputChange,
                          onKeyDown: this.handleKeyDown,
                          onMouseDown: this.handleOnMouseDown,
                          placeholder: 'Select',
                        }),
                        label: 'Sectors',
                      })}
                      {isOpen ? (
                        <Paper square>
                          {this.getSuggestions(inputValue2).map((suggestion, index) =>
                            this.renderSuggestion({
                              suggestion,
                              index,
                              itemProps: getItemProps({ item: suggestion.label }),
                              highlightedIndex,
                              selectedItem: selectedItem2,
                            }),
                          )}
                        </Paper>
                      ) : null}
                    </div>
                  )}
                </Downshift>
                )
              }
        }
    }
}
