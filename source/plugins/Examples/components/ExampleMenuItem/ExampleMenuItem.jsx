import { MenuItem } from '@material-ui/core/';

module.exports = {
  dependencies: ['Simple.Helper','Simple.Label','Simple.Icon'],
  get(Helper, Label, Icon) {
    
    var core = this;

    var { React, PropTypes, ComponentMixin } = core.imports;

    return {
      mixins: [ ComponentMixin ],

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
            padding: "10px 25px",
          },
        }
        return(styles[s]);
      },

      handleClick(){
        let { handleClick, item, selected } = this.props;

        if(!selected){
          return handleClick(item);
        }

      },

      render() {
        let { item, selected } = this.props;
        let name = Helper.openCamelCase(item.info.name);

        return (
          <MenuItem title={item.info.name} selected={selected} style={this.styles('innerListItem')}
                    onClick={this.handleClick}>
            
            <Label label={name}/>

          </MenuItem>
        )
      } 

    }
  }
}
