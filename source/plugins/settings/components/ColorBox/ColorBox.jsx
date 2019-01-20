
import { Typography, AppBar, Paper, Icon, Tabs, Tab } from '@material-ui/core';
import { SketchPicker } from 'react-color';

module.exports = {
    name: "ColorBox",
    description: '',
    propTypes: {},
    dependencies: ['SimpleSwitch.Helper', 'Settings.ColorPicker', 'componentsCollection.Loader', 'componentsCollection.ExpandingPanel'],

    get(Helper, ColorPicker, Loader, ExpandingPanel) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                colorItem: PropTypes.object,
            },

            getInitialState() {
              return {
                showButtons: false,
                anchorEl: null,
                newColor: ''
              };
            },

            getDefaultProps(){
                return {
                  colorItem: { title: 'test' },
                };
            },

            componentDidMount() {
                this.isUnmounted = false;
            },

            componentWillUnmount() {
                this.isUnmounted = true;
            },

            openColorPicker(e){
              this.setState({ anchorEl: e.currentTarget, showButtons: false })
            },

            handleCopy(e){
              let { colorItem } = this.props;
              Helper.CopyToClipboard(colorItem.data);
              this.setState({ showButtons: false });
            },

            handleClosePicker(){
               this.setState({ anchorEl: null })
            },

            onColorPick(newColor){
              let { handleChange, colorItem, parentKey } = this.props;
              if (handleChange) handleChange({...colorItem, parentKey: parentKey}, newColor);
              this.handleClosePicker();
            },

            styles(propName){
              let { showButtons, newColor } = this.state;
              let { colorItem } = this.props;

              let styles = {
                icon: { fontSize: 13, color: core.theme('colors.white'), cursor: 'pointer' },
                iconsContainer: {
                  position: 'absolute',
                  bottom: '0',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  height: '30px',
                  justifyContent: 'space-between',
                  padding: '0 5px',
                  background: showButtons ? `linear-gradient(transparent 0, rgb(85, 85, 85) 100%)` : 'transparent',
                  opacity: showButtons ? 1 : 0,
                  borderBottomLeftRadius: '4px',
                  borderBottomRightRadius: '4px',
                  transition: 'background 0.25s linear, opacity 0.25s ease-in-out 0.15s'
                },
                paper: { flex: 1, height: 60, background: newColor || this.getBackground(colorItem.data), position: 'relative' }
              }
              return styles[propName]
            },

            getBackground(data){
              if (data.indexOf('/') > -1) {
                return `url("${data}") no-repeat 100%`
              } else return data;
            },

            handleRemoveColor(){
              let { handleRemove, colorItem, parentKey } = this.props;
              handleRemove(parentKey, colorItem.key)
            },

            renderActionIcons(colorItem){
              return (
                <div style={ this.styles('iconsContainer') }>

                  <Icon title={ core.translate('Delete color') } onClick={ this.handleRemoveColor } style={ this.styles('icon') }>
                    { core.icons('navigate.close') }
                  </Icon>

                  <div>
                    <Icon title={ core.translate('Copy color to clipboard') } onClick={ this.handleCopy } style={ this.styles('icon') }>
                      { core.icons('files.copy') }
                    </Icon>
                    <Icon title={ core.translate('Change color') } onClick={ this.openColorPicker } style={{ ...this.styles('icon'), marginLeft: 15 }}>
                      { core.icons('files.edit') }
                    </Icon>
                  </div>

                </div>
              );
            },

            render() {
              let { colorItem } = this.props;
              let { anchorEl, showButtons } = this.state;
              return (

                <Paper  elevation={ 1 }
                        onMouseEnter={ e => { this.setState({ showButtons: true }) } }
                        onMouseLeave={ e => { this.setState({ showButtons: false }) } }
                        style={ this.styles('paper') }>

                  { this.renderActionIcons(colorItem) }

                  <ColorPicker
                    anchorEl={ anchorEl }
                    colorItem={ colorItem }
                    handleClose={ this.handleClosePicker }
                    onColorPick={ this.onColorPick } />
                </Paper>

              )


            }
        }
    }
}
