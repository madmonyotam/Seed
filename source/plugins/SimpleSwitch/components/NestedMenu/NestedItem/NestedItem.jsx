
import {
  Typography, IconButton,
  Paper, Icon, Menu, Divider,
  MenuItem, Popper
} from '@material-ui/core';

module.exports = {
    name: "NestedItem",
    description: '',
    dependencies: [],

    get() {
        var core = this;
        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {
                nested: PropTypes.array,
            },

            getDefaultProps(){
                return {
                    nested: []
                };
            },

            getInitialState() {
                return {
                  anchorEl: null,
                  anchorEl: null,
                  menuAnchorIdx: null,
                };
            },

            componentDidMount() {
              this.setState({ nested: this.props.nested })
            },

            componentWillReceiveProps(nextProps) {
              if (nextProps.nested && (!_.isEqual(nextProps.nested, this.props.nested))) {
                this.setState({ nested: nextProps.nested })
              }
            },

            openInnerMenu(e, idx){
              this.setState({ anchorEl: e.currentTarget })
              setTimeout(()=>{
                this.setState({ menuAnchorIdx: idx })
              }, 250)
            },

            closeInnerMenu(e){
              this.setState({ anchorEl: null, menuAnchorIdx: null })
            },

            closeMenus(){
              this.closeMenu();
              this.closeInnerMenu();
            },

            itemClick(item){
              if (item.onClick) item.onClick();
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

            renderMenuItem(item, idx){
              if (!item) return null;
              if (item.divider) return ( <Divider key={ idx } style={{ margin: '5px 0' }} /> );

              return (<MenuItem key={ idx } style={ styles.menuItem } onClick={ () => { this.itemClick(item) } }>  { item.label }</MenuItem>)
            },

            renderInnerMenu(items){
              if (!items || !items.length) return null;
              return (
                <Paper elevation={ 4 } style={{ width: 220, padding: '3px 0' }}>
                {
                  _.map(items, this.renderMenuItem)
                }
                </Paper>
              )
            },

            render() {
                let { nested, anchorEl, menuAnchorIdx } = this.state;
                let { label, idx } = this.props;
                console.debug('nested > ', nested);
                if (!nested) return null
                return (
                  <MenuItem id={'nestingItem'} key={ idx } style={ styles.menuItem } onMouseEnter={ e => this.openInnerMenu(e, idx) } onMouseLeave={ this.closeInnerMenu }>
                    { label }
                    <Icon style={{ position: 'absolute', right: 5, color: core.theme('colors.dark') }}>{ core.icons('arrow_right') }</Icon>
                    <Popper
                          onMouseLeave={ this.closeInnerMenu }
                          anchorEl={ anchorEl }
                          open={ Boolean(anchorEl) && menuAnchorIdx === idx }
                          placement={ this.getPosition() }
                          style={{ zIndex: 1301 }}
                          onClose={ this.closeInnerMenu }>

                          { this.renderInnerMenu(nested) }

                    </Popper>
                  </MenuItem>
                )
            }
        }
    }
};

let styles = {
  menuItem: {
    height: 'auto',
    padding: '5px 5px 5px 24px',
    fontSize: '12px',
    height: '20px',
  }
}
