import Select from "react-select";
import { TextField,Typography,Paper,MenuItem,Chip } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';


module.exports = {
    name: "ReactSelect",
    description: 'ReactSelect',
    dependencies: [],    
    get() {
        
        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

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
                        flexGrow: 1,
                        height: 250,
                      },
                      input: {
                        display: 'flex',
                        padding: 0,
                      },
                      valueContainer: {
                        display: 'flex',
                        flexWrap: 'wrap',
                        flex: 1,
                        alignItems: 'center',
                      },
                      chip: {
                        margin: 3,
                      },
                      chipFocused: {
                    
                      },
                      noOptionsMessage: {
                        padding: `1px 4px`,
                      },
                      singleValue: {
                        fontSize: 16,
                      },
                      placeholder: {
                        position: 'absolute',
                        left: 2,
                        fontSize: 16,
                      },
                      paper: {
                        // backgroundColor: 'red',
                        position: 'absolute',
                        zIndex: 2000,
                        marginTop: 2,
                        left: 0,
                        right: 0,
                      },
                      divider: {
                        height: 4,
                      },
                }
                
                return(styles[s]);
            },

            NoOptionsMessage(props) {
                return (
                  <Typography
                    color="textSecondary"
                    style={this.styles('noOptionsMessage')}
                    {...props.innerProps}
                  >
                    {props.children}
                  </Typography>
                );
            },
              
            inputComponent({ inputRef, ...props }) {
                return <div ref={inputRef} {...props} />;
            },
              
            Control(props) {
                return (
                  <TextField
                    fullWidth
                    InputProps={{
                      inputComponent:this.inputComponent,
                      inputProps: {
                        style:{display:'flex',padding:0},
                        // className: props.selectProps.classes.input,
                        inputRef: props.innerRef,
                        children: props.children,
                        ...props.innerProps,
                      },
                    }}
                    {...props.selectProps.textFieldProps}
                  />
                );
            },
              
            Option(props) {
                return (
                  <MenuItem
                    buttonRef={props.innerRef}
                    selected={props.isFocused}
                    component="div"
                    style={{
                      fontWeight: props.isSelected ? 500 : 400,
                    }}
                    {...props.innerProps}
                  >
                    {props.children}
                  </MenuItem>
                );
            },
              
            Placeholder(props) {
                return (
                  <Typography
                    color="textSecondary"
                    style={this.styles('placeholder')}
                    {...props.innerProps}
                  >
                    {props.children}
                  </Typography>
                );
            },
              
            SingleValue(props) {
                return (
                  <Typography style={this.styles('singleValue')} {...props.innerProps}>
                    {props.children}
                  </Typography>
                );
            },
              
            ValueContainer(props) {
                return <div style={this.styles('valueContainer')}>{props.children}</div>;
            },
              
            MultiValue(props) {
                return (
                  <Chip
                    tabIndex={-1}
                    label={props.children}
                    style={this.styles('chip')}
                    onDelete={props.removeProps.onClick}
                    deleteIcon={<CancelIcon {...props.removeProps} />}
                  />
                );
            },
              
            Menu(props) {
                return (
                  <Paper square style={this.styles('paper')} {...props.innerProps}>
                    {props.children}
                  </Paper>
                );
            },

            IndicatorSeparator (){
              return null
            },


            render() {         
              let {options,handleSelectChange} = this.props;

              return (
                <Select
                    menuPosition={"absolute"}
                    style={{
                      marginBottom: '20px',
                    }}
                    autoFocus={false}
                    textFieldProps={{
                        label: 'Sectors',
                        InputLabelProps: {
                          shrink: true,
                        },
                      }}
                    options={options}
                    components={{
                        Control: this.Control,
                        Menu: this.Menu,
                        NoOptionsMessage: this.NoOptionsMessage,
                        inputComponent: this.inputComponent,
                        Option: this.Option,
                        Placeholder: this.Placeholder,
                        SingleValue:this.SingleValue,
                        ValueContainer: this.ValueContainer,
                        MultiValue:this.MultiValue  ,
                        IndicatorSeparator :this.IndicatorSeparator ,
                    }}
                    isMulti={true}
                    onChange={ handleSelectChange }
                    closeMenuOnSelect={true}
                    openMenuOnClick = {true}
                />
          
              )
            }
        }
    }
}


