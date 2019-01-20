import { Typography } from '@material-ui/core';

module.exports = {
    name: "ThemeEditor",
    description: '',
    propTypes: {},
    dependencies: ['SimpleSwitch.Helper', 'componentsCollection.NoResults', 'componentsCollection.Loader', 'componentsCollection.ExpandingPanel', 'Settings.ColorPicker', 'Settings.ColorBox', 'SimpleSwitch.NestedMenu'],
    bindings: {
      config: ['config'],
    },

    get(Helper, NoResults, Loader, ExpandingPanel, ColorPicker, ColorBox, NestedMenu) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                data: PropTypes.object,
                path: PropTypes.array,
                testEdit: PropTypes.bool,
            },

            getDefaultProps(){
                return {
                  data: {},
                };
            },

            getInitialState() {

                return {
                  theme: [],
                  colorPickerAnchorEl: null,
                };
            },

            componentDidMount() {
                this.setState({ theme: this.props.data });
                this.colorContainer = React.createRef();
                this.colorAnchor = React.createRef();
                this.isUnmounted = false;
            },

            componentWillUnmount() {
                this.isUnmounted = true;
            },

            componentWillReceiveProps(nextProps) {
              if (nextProps.data && !_.isEqual(nextProps.data, this.props.data)) {
                this.setState({ theme: nextProps.data });
              }
            }, 

            styles(propName){
              var styles = {
                root: { 
                  height: '100%', 
                  width: '70%', 
                  marginLeft: '15%',
                  display: 'flex',  
                  flexDirection: 'column', 
                  position: 'relative' 
                },
                list: { 
                  padding: '15px',
                  maxHeight: 220,
                  minHeight: 115,
                  overflow: 'auto',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6, 2fr)',
                  gridGap: '15px' 
                },
                noResult: { height: '120px', position: 'relative', width: '130px', margin: '0 auto', cursor: 'pointer' },
                sectionTitle: { 
                  textTransform: 'capitalize',
                  padding: '5px 5px 5px 0',
                  fontSize: 12,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                  whiteSpace: 'nowrap' 
                }
              }
              return styles[propName]
            },

            getClonedTheme(){
              var theme = core.plugins.Settings.get(['config', 'theme']);
              let clonedTheme = JSON.parse(JSON.stringify(theme));
              return clonedTheme;
            },

            handleChangeColor(item, newValue){
              core.plugins.Settings.set(['config', 'theme', item.parentKey, item.key], newValue);
            },

            handleRemoveColor(parentKey, itemKey){
              let clonedTheme = this.getClonedTheme();
              delete clonedTheme[parentKey][itemKey];

              core.emit('config:changed', { key: 'theme', data: clonedTheme })
            },


            handleTitleEdit(newTitle){
              var oldTitle = Helper.makeCamelCase(this.state.editable);
              if (!newTitle) this.setState({ editable: null })
              else {
                newTitle = Helper.makeCamelCase(newTitle);
                var theme = { ...core.plugins.Settings.get(['config', 'theme']) };
                var data = theme[oldTitle];
                theme[newTitle] = data;
                delete theme[oldTitle];
                core.emit('config:changed', { key: 'theme', data: theme })
                this.setState({ editable: null })
              }
            },

            handleRemoveSection(sectionTitle){
              var deleteTitle = Helper.makeCamelCase(sectionTitle);
              var theme = { ...core.plugins.Settings.get(['config', 'theme']) };
              delete theme[deleteTitle];
              core.emit('config:changed', { key: 'theme', data: theme })
            },

            handleClosePicker(){
              this.setState({ colorPickerAnchorEl: null, colorKey: null })
            },

            handleAddColor(newColor){
              let { colorKey } = this.state;
              let clonedTheme = this.getClonedTheme();
              let newTitle = Helper.makeCamelCase(newColor.title);
              clonedTheme[colorKey][newTitle] = newColor.data;
              core.plugins.Settings.set(['config', 'theme'], clonedTheme);
              this.handleClosePicker();
            },

            handleOpenColorPicker(themeSection){
              let colorKey = Helper.makeCamelCase(themeSection);
              this.setState({ colorPickerAnchorEl: this.colorAnchor.current, colorKey: colorKey })
            },

            toggleEditSection(sectionTitle){
              if (this.setState.editable === sectionTitle) {
                this.setState({ editable: null })
              } else this.setState({ editable: sectionTitle })
            },

            getActionList(themeSection){
              return [{
                onClick: () => { this.toggleEditSection(themeSection.title) },
                label: core.translate('Edit name'),
                key: 'edit_section'
              },{
                onClick: (e) => {
                  this.handleOpenColorPicker(themeSection.title);
                  core.emit('openSection',{ sectionKey: themeSection.title });
                },
                label: core.translate('Add color'),
                key: 'add_color'
              },
              { divider: true },
              {
                onClick: () => { this.handleRemoveSection(themeSection.title) },
                label: core.translate('Remove')+' '+themeSection.title,
                key: 'remove_section'
              }]
            },

            renderList(data, themeSection){  
              if (!data || _.isEmpty(data)) {
                return (
                  <div style={ this.styles('noResult') } onClick={ e => this.handleOpenColorPicker(themeSection.title) }>
                    <NoResults text={ core.translate('Please add colors') } size={ 5 } icon={ core.icons('general.add') } />
                  </div>
                )
              }

              return (
                <div style={ this.styles('list') }
                      ref={ this.colorContainer }>
                    { this.renderSectionData(data, themeSection)  }
                </div>
              )
            },

            renderSectionData(data, themeSection){
              return  _.map(data, (item, i)=>{
                  return (
                    <div key={ i } >
                      
                      <Typography title={ item.data } style={ this.styles('sectionTitle') }>
                      { item.title }
                      </Typography>

                      <ColorBox
                        colorItem={ item }
                        parentKey={ themeSection.key }
                        handleRemove={ this.handleRemoveColor }
                        handleChange={ this.handleChangeColor } />

                    </div>
                  );
                })
            },

            renderThemeSection(themeSection, idx) {
              let { title, data } = themeSection;
              return (
                <ExpandingPanel
                  item={ themeSection }
                  name={ title }
                  handleEdit={ this.handleTitleEdit }
                  sectionKey={ title }
                  editable={ this.state.editable == title }
                  badge={ data && data.length }
                  badgePlacement={ 'left' }
                  actionButtons={[
                    <NestedMenu key={ 'nestedMenu' } list={ this.getActionList(themeSection) } />,
                  ]}
                  childRender={  this.renderList.bind(this, data, themeSection)  }
                  key={ idx }
                />
              )
            },

            render() {
              let { theme, colorPickerAnchorEl } = this.state;
              return (
                  <div id={'root.themeEditor'} ref={ this.colorAnchor }  style={ this.styles('root') }>
                    {
                      _.map(theme, this.renderThemeSection)
                    }

                    <ColorPicker
                      anchorEl={ colorPickerAnchorEl }
                      handleClose={ this.handleClosePicker }
                      onColorPick={ this.handleAddColor }
                      mode={ 'new' } />
                  </div>
              )


            }
        }
    }
}
