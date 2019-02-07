
import { Typography, Input, Paper, Icon, Button, Popover  } from '@material-ui/core';
import { SketchPicker  } from 'react-color';
require('./colorPicker.scss')
module.exports = {
    name: "ColorPicker",
    description: '',
    propTypes: {},
    dependencies: ['SimpleSwitch.Helper', 'Simple.NoResults', 'Simple.Loader', 'Simple.ExpandingPanel'],

    get(Helper, NoResults, Loader, ExpandingPanel) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                colorItem: PropTypes.object,
                anchorEl: PropTypes.object,
                picker: PropTypes.bool, // only to pick colors, not setting or editing new ones.
                handleClose: PropTypes.func,
                onColorPick: PropTypes.func,
                mode:  PropTypes.string // 'edit' || 'new'
            },

            getInitialState() {
              return {
                pickedColor: '',
                newItem: { title: '', data: '' }
              };
            },

            getDefaultProps(){
                return {
                  colorItem: { title: 'test' },
                  anchorEl: null,
                  picker: false,
                  mode: 'edit',
                };
            },

            componentDidMount() {
              let { colorItem } = this.props;
              this.setState({ pickedColor: colorItem && colorItem.data ? colorItem.data : ''  });
              this.isUnmounted = false;
            },

            componentWillReceiveProps(nextProps) {
              let { colorItem, mode } = nextProps;

              if (colorItem.data !== this.props.colorItem.data) {
                this.setState({ pickedColor: colorItem.data  });
              }

            },

            componentWillUnmount() {
                this.isUnmounted = true;
            },

            handleClose(){
              this.setState({
                pickedColor: '',
                newItem: { title: '', data: '' }
              });
              if (this.props.handleClose) this.props.handleClose()
            },

            handleColorPick(){
              let { mode, onColorPick, picker } = this.props;
              let { pickedColor, newItem } = this.state;


              if (onColorPick) {
                if (mode == 'edit' || picker){
                  onColorPick(pickedColor)
                } else if (!newItem.title) {
                  let notify = {
                      title: 'Color Name Error ',
                      text: 'Please enter valid color name',
                      alertKind: 'error'
                  }
                  return core.emit('notify', notify);
                } else onColorPick({ ...newItem, data: pickedColor });

                this.setState({
                  pickedColor: '',
                  newItem: { title: '', data: '' }
                });
              }
            },

            handleChangeComplete(color, e){
              this.setState({ pickedColor: color.hex });
            },

            handleChangeName(e){
              var str = e.target.value;
              this.setState({ newItem: { ...this.state.newItem, title: str } })
            },

            renderTitle(){
              let { colorItem, mode, picker } = this.props;
              let { newItem } = this.state;
              if (picker) return null;
              if (mode == 'edit') {
                return (
                  <Typography style={{ fontSize: '14px', fontWeight: 500 }}>
                  { colorItem.title }
                  </Typography>
                );
              }
              return (
                <div>
                  <Input
                    id={ 'input-colorName' }
                    inputProps={{ style: { fontSize: 13 } }}
                    fullWidth={ true }
                    required={ true }
                    value={ newItem.title }
                    onChange={ this.handleChangeName }
                    autoFocus={ true }
                    placeholder={ core.translate('colorName', 'Color Name')  }
                  />
                  <Typography style={{ color: core.theme('colors.gray'), fontSize: 11, marginTop: 10 }}>
                    {'*'+core.translate('emptySpaces','Empty spaces will be saved as underscore')}
                  </Typography>
                </div>
              )

            },

            render() {
              let { anchorEl } = this.props;
              let { pickedColor } = this.state;

              const open = Boolean(anchorEl);

              return (

                <Popover
                  id="simple-popper"
                  open={open}
                  PaperProps={{ style: { padding: 15 } }}
                  anchorEl={anchorEl}
                  onClose={this.handleClose}
                  anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
                  transformOrigin={{ vertical: 'top', horizontal: 'center', }}>

                  { this.renderTitle() }

                  <div style={{ margin: '15px 0', display: 'flex', justifyContent: 'center' }}>
                    <SketchPicker color={ pickedColor } onChangeComplete={ this.handleChangeComplete } />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={ this.handleColorPick } color="primary" size={ 'small' } >{core.translate('pick')}</Button>
                    <Button onClick={ this.handleClose } color="secondary" size={ 'small' } >{core.translate('cancel')}</Button>
                  </div>

                </Popover>

              )


            }
        }
    }
}
