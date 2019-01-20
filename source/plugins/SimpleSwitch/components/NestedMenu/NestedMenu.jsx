
import {
  Typography, IconButton,
  Paper, Icon, Divider,
  MenuItem, Popper
} from '@material-ui/core';

module.exports = {
    name: "NestedMenu",
    description: '',
    dependencies: [],

    get() {
        var core = this;
        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                size: PropTypes.number,
                count: PropTypes.number,
            },

            getDefaultProps(){
                return {
                    size:1,
                    count:0
                };
            },

            getInitialState() {
                return {
                  anchorEl: null,
                  menuAnchorEl: null,
                  menuAnchorIdx: null,
                };
            },
            
            componentWillMount() {
              this.initUnits()
            },
            
            componentDidMount() {
              this.isUnmounted = false;
              this.setState({ list: this.props.list })
            },

            componentWillReceiveProps(nextProps) {
              if (nextProps.list && (!_.isEqual(nextProps.list, this.props.list))) {
                this.setState({ list: nextProps.list })
              }
            },

            componentWillUnmount() {
              this.isUnmounted = true;
            },

            componentDidCatch(err){
              console.debug('err > ', err);
            },

            initUnits(){
              this.suffixColor = core.theme('colors.gray');
              this.menuItemIconColor = core.theme('colors.dark');
            },

            styles(propName){
              let style = {
                root: { display: 'flex', alignItems: 'center', justifyContent:'center' },
                button: { height: 30, width: 30 },
                icon: { cursor: 'pointer', fontSize: 18 },
                parentPaper: { width: 300, padding: '3px 0' },
                childPaper: { width: 220, padding: '3px 0' },
                menuItem: {
                  height: 'auto',
                  padding: '5px 5px 5px 24px',
                  fontSize: '12px',
                  height: '20px',
                },
                menuItemIcon: { position: 'absolute', right: 5, color: this.menuItemIconColor },
                suffix: { 
                  position: 'absolute',
                  right: 30,
                  fontSize: 12, 
                  color: this.suffixColor
                }
              };

              return style[propName] 
            },

            openMenu(e){
              this.setState({ anchorEl: e.currentTarget })
            },

            closeMenu(e){
              this.setState({ anchorEl: null })
            },

            openInnerMenu(e, idx){
              var ct = e.currentTarget;
              // this.closeInnerMenu();
              // setTimeout(()=>{
                this.setState({ menuAnchorEl: ct }, ()=>{
                  this.setState({ menuAnchorIdx: idx })
                })
              // }, 250)
            },

            closeInnerMenu(e){
              this.setState({ menuAnchorEl: null, menuAnchorIdx: null })
            },

            closeMenus(){
              this.closeMenu();
              this.closeInnerMenu();
            },

            itemClick(item){
              if (item.onClick) item.onClick();
              if (this.isUnmounted) return;
              else setTimeout(this.closeMenus, 250)
            },

            getPosition(elId = 'nestingItem'){
              var nestingItem = document.getElementById(elId);
              var defaultPos = 'right-start';
              if (!nestingItem) return defaultPos;
              var windowWidth = window.innerWidth;

              var pos = nestingItem.getBoundingClientRect()
              if (pos.right > (windowWidth/2)) {
                defaultPos = 'left-start'
              }
              return defaultPos;
            },

            renderItemSuffix(suffixText){
              if (!suffixText) return null;
              else return (<Typography className={'item_suffix'} style={ this.styles('suffix') } > { suffixText } </Typography>)
            },

            renderMenuItem(item, idx){
              if (!item) return null;
              if (item.divider) return ( <Divider key={ idx } style={{ margin: '5px 0' }} /> );
              if (item.nested && item.nested.length) return this.renderNestedItem(item, idx);
              return (
                <MenuItem key={ idx } style={ this.styles('menuItem') } onClick={ () => { this.itemClick(item) } }>  
                { item.label }
                { this.renderItemSuffix(item.suffix) }
                </MenuItem>
              );
            },

            renderNestedItem(item, idx){
              let { nested, label, key, suffix } = item;
              let { menuAnchorEl, menuAnchorIdx  } = this.state;
              return (

                <MenuItem id={'nestingItem'} key={ key } style={ this.styles('menuItem') } onMouseEnter={ e => this.openInnerMenu(e, key) } onMouseLeave={ this.closeInnerMenu }>
                  { label }
                  { this.renderItemSuffix(suffix) }
                  <Icon style={ this.styles('menuItemIcon') }>{ core.icons('navigate.arrow_right') }</Icon>
                  <Popper
                        onMouseLeave={ this.closeInnerMenu }
                        anchorEl={ menuAnchorEl }
                        open={ Boolean(menuAnchorEl) && menuAnchorIdx === key }
                        placement={ this.getPosition() }
                        style={{ zIndex: 1301 }}
                        onClose={ this.closeInnerMenu }>

                        { this.renderInnerMenu(nested) }

                  </Popper>
                </MenuItem>
              );
            },

            renderInnerMenu(items){
              if (!items || !items.length) return null;
              return (
                <Paper elevation={ 4 } style={ this.styles('childPaper') } square={ true }>
                {
                  _.map(items, this.renderMenuItem)
                }
                </Paper>
              )
            },

            render() {
                let { list, anchorEl } = this.state;
                if (!list) return null;
                return (
                    <div style={ this.styles('root') }>
                      <IconButton
                              style={ this.styles('button') }
                              size={ 'small' }
                              id={ 'icon_button' }
                              onClick={ this.openMenu }>
                        <Icon style={ this.styles('icon') } >{ core.icons('general.more') }</Icon>
                      </IconButton>
                      <Popper
                            onMouseLeave={ this.closeMenu }
                            anchorEl={ anchorEl }
                            open={ Boolean(anchorEl) }
                            placement={ this.getPosition() }
                            style={{ zIndex: 1301 }}
                            onClose={ this.closeMenu }>

                            <Paper elevation={ 2 } style={ this.styles('parentPaper') } square={ true }>
                              { _.map(list, this.renderMenuItem) }
                            </Paper>

                      </Popper>
                    </div>
                )
            }
        }
    }
};
