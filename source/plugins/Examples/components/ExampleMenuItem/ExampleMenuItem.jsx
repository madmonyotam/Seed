import { MenuItem } from '@material-ui/core/';

module.exports = {
  dependencies: ['SimpleSwitch.Mixin','SimpleSwitch.Helper','Simple.Label','Simple.Icon'],
  get(Mixin, Helper, Label, Icon) {
    
    var core = this;

    var { React, PropTypes } = core.imports;

    return {
      mixins: [ Mixin ],

      propsTypes: {
        handleClick: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        selected: PropTypes.bool,
      },

      getDefaultProps(){
        return {
          selected: false
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

      componentWillUnmount() {
      },

      componentWillReceiveProps (nextProps) {
      },

      initUnits(){
        this.colors = {
          info: core.theme('colors.primary')
        }
      },

      styles(s){
        const styles = {
          innerListItem:{
            padding: "10px 10px",
          },
        }
        return(styles[s]);
      },

      handleClick(){
        let { handleClick, item, selected } = this.props;

        if(!selected){
          return handleClick(item);
        }

        //openDrawer()

      },

      renderInfoIcon(){
        let { selected } = this.props;
        if(!selected) return null

        return(
          <Icon size={20} color={ this.colors.info } icon={ core.icons('general.info') } />
        )
      },

      render() {
        let { item, selected } = this.props;
        let name = Helper.openCamelCase(item.info.name);

        return (
          <MenuItem title={item.info.name} selected={selected} style={this.styles('innerListItem')}
                    onClick={this.handleClick}>
            
            <Label label={name}/>
            { this.renderInfoIcon() }

          </MenuItem>
        )
      } 

    }
  }
}
