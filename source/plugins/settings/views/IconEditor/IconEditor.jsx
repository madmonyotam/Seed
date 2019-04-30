
import { Typography, Icon, IconButton } from '@material-ui/core';

module.exports = {
    name: "IconEditor",
    description: '',
    propTypes: {},
    dependencies: ['SimpleSwitch.Helper', 'Simple.NoResults', 'Simple.ExpandingPanel', 'SimpleSwitch.NestedMenu'],

    get(Helper, NoResults, ExpandingPanel, NestedMenu) {

        var core = this;

        var { React, PropTypes, Branch, ComponentMixin } = core.imports;

        return {

            mixins: [ Mixin, Branch, ComponentMixin ],

            cursors: {
              config: ['plugins','Settings','config'],
            },

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
                  icons: [],
                  colorPickerAnchorEl: null,
                };
            },

            componentDidMount() {
                this.setState({ icons: this.props.data });
                this.iconContainer = React.createRef();
                this.isUnmounted = false;
            },

            componentWillUnmount() {
                this.isUnmounted = true;
            },

            componentWillReceiveProps(nextProps) {
              if (nextProps.data && !_.isEqual(nextProps.data, this.props.data)) {
                this.setState({ icons: nextProps.data });
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
                  position: 'relative' },
                list: { 
                  padding: '15px',
                  maxHeight: 220,
                  minHeight: 115,
                  overflow: 'auto',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6, 2fr)',
                  gridGap: '15px' 
                },
                noResults: { height: '120px', position: 'relative', width: '130px', margin: '0 auto', cursor: 'pointer' },
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
            
            getClonedIcons(){
              core.plugins.Settings.get(['config', 'icons']);
              let clonedIcons = JSON.parse(JSON.stringify(icons));
              return clonedIcons;
            },

            handleChangeColor(item, newValue){
              core.plugins.Settings.set(['config', 'icons', item.parentKey, item.key], newValue);
            },

            handleRemoveColor(parentKey, itemKey){
              let clonedIcons = this.getClonedIcons();
              delete clonedIcons[parentKey][itemKey];

              core.emit('config:changed', { key: 'icons', data: clonedIcons })
            },

            handleTitleEdit(newTitle){
              var oldTitle = Helper.makeCamelCase(this.state.editable);
              if (!newTitle) this.setState({ editable: null })
              else {
                newTitle = Helper.makeCamelCase(newTitle);
                var icons = { ...core.plugins.Settings.get(['config', 'icons']) };
                var data = icons[oldTitle];
                icons[newTitle] = data;
                delete icons[oldTitle];
                core.emit('config:changed', { key: 'icons', data: icons })
                this.setState({ editable: null })
              }
            },

            handleRemoveSection(sectionTitle){
              var deleteTitle = Helper.makeCamelCase(sectionTitle);
              var icons = { ...core.plugins.Settings.get(['config', 'icons']) };
              delete icons[deleteTitle];
              core.emit('config:changed', { key: 'icons', data: icons })
            },

            toggleEditSection(sectionTitle){
              if (this.setState.editable === sectionTitle) {
                this.setState({ editable: null })
              } else this.setState({ editable: sectionTitle })
            },

            getActionList(iconSection){
              return [{
                onClick: () => { this.toggleEditSection(iconSection.title) },
                label: core.translate('Edit name'),
                key: 'edit_section'
              },
              { divider: true },
              {
                onClick: () => { this.handleRemoveSection(iconSection.title) },
                label: core.translate('Remove')+' '+iconSection.title,
                key: 'remove_section'
              }]
            },

            renderList(data, iconSection){ 
              if (!data || _.isEmpty(data)) {
                return (
                  <div style={ this.styles('noResults') } onClick={ e => { console.info('missing function') } }>
                    <NoResults text={ core.translate('Please add icons') } size={ 5 } icon={ core.icons('general.add') } />
                  </div>
                )
              }

              return (
                <div style={ this.styles('list') } ref={ this.iconContainer }>
                    { this.renderSectionData(data, iconSection)  }
                </div>
              )
            },

            renderSectionData(data, iconSection){
              return  _.map(data, (item, i)=>{
                  return (
                    <div key={ i } style={{ textAlign: 'center', margin: '0 auto' }}>
                      <Typography title={ item.data } style={ this.styles('sectionTitle') }>
                      { item.title }
                      </Typography>
                      <IconButton>
                        <Icon>
                          { core.icons(`${iconSection.key}.${item.key}`) }
                        </Icon>
                      </IconButton>

                    </div>
                  );
                })
            },

            renderIconSection(iconSection, idx) {
              let { title, data } = iconSection;
              return (
                <ExpandingPanel
                  item={ iconSection }
                  name={ title }
                  handleEdit={ this.handleTitleEdit }
                  sectionKey={ title }
                  editable={ this.state.editable == title }
                  badge={ data && data.length }
                  badgePlacement={ 'left' }
                  actionButtons={[
                    <NestedMenu key={ 'nestedMenu' } list={ this.getActionList(iconSection) } />,
                  ]}
                  childRender={  this.renderList.bind(this, data, iconSection)  }
                  key={ idx }
                />
              )
            },

            render() {
              let { icons } = this.state;
              return (
                  <div id={'root.iconsEditor'} style={ this.styles('root') }>
                    {
                      _.map(icons, this.renderIconSection)
                    }
                  </div>
              )


            }
        }
    }
}
