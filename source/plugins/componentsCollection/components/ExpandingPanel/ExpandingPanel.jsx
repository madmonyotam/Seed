import {
  Icon,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  TextField,
  IconButton,
  ClickAwayListener
} from '@material-ui/core/';

require('./customs.scss');

module.exports = {
  name: "ExpandingPanel",
  description: '',
  propTypes: {
      // name: 'string',
  },
  dependencies: ['componentsCollection.Loader','componentsCollection.Badge'],
  get(Loader, Badge) {

      var core = this;

      var { React, PropTypes } = core.imports;

      return {
          propsTypes: {
            sectionKey: PropTypes.string.isRequired,
            childRender: PropTypes.func.isRequired,
            onTitleDoubleClick: PropTypes.func,
            loadContent: PropTypes.func,
            iconSize: PropTypes.number,
            badge: PropTypes.number,
            badgePlacement: PropTypes.string, // left or right
            expandButton: PropTypes.bool,
            isLoading: PropTypes.bool,
            boxShadow: PropTypes.bool,
            open: PropTypes.bool,
            customClassName: PropTypes.string,
            actionButtons: PropTypes.array,
            onSearch: PropTypes.func,
            onClose: PropTypes.func,
            iconColor: PropTypes.string,
          },

          getDefaultProps(){
              return {
                badge: 0,
                iconSize: 16,
                iconColor: core.theme('colors.sectionsHeadLine'),
                expandButton: true,
                childRender: this.childRender,
                isLoading: false,
                open: false,
                customClassName: '',
                badgePlacement: 'right',
                headerBorder: core.theme('colors.border'),
                boxShadow: false,
                forceOpen: false,
                onSearch: () => {},
                onClose: () => {},
                loadContent: () => {},
              };
          },

          getInitialState() {
              return {
                  expanded: false,
                  inputValue:'',
              };
          },

          componentDidMount() {
            let { open } = this.props;

            core.on('openSection',this.openSection);

            this.setState({ expanded: open });
          },

          componentWillReceiveProps (nextProps) {
            let {editable, forceOpen, name} = nextProps;
            let {expanded} = this.state;

            if(editable && !expanded){
              this.setState( {expanded: true} )
            }

            if(forceOpen && !expanded && name == this.props.name){
              this.setState( {expanded: true} )
            }
          },

          componentWillMount() {
            this.clicks = {
              timer : 0,
              delay : 200,
              prevent : false
            };
          },

          componentWillUnmount () {
            core.off('openSection',this.openSection);
          },

          openSection(object){
            let { sectionKey } = this.props;
            if(sectionKey === object.sectionKey){
              this.setState( {expanded: true} );
            }
          },

          handleChange(){
            let { expanded } = this.state;
            let { isLoading, loadContent, onClose, editable } = this.props;

            if(isLoading || editable) return;

            const doClickAction = () => {
              if(!expanded){
                loadContent();
                if (onClose) onClose()
              }
              this.setState({ expanded: !expanded });
            }

            // this.clicks.timer = setTimeout( () => {
            //   if (!this.clicks.prevent) {
                doClickAction();
            //   }
            //   this.clicks.prevent = false;
            // }, this.clicks.delay);

          },

          handleKeyPress(event){
            let { editable, handleEdit } = this.props;
            let { inputValue } = this.state;

            if(!editable) return;

            switch (event.keyCode) {
              case 27:
                this.handleClose();
                break;

              case 13:
                handleEdit(inputValue);
                this.handleClose();
                break;
            }
          },

          handleClose(){
            this.setState({ inputValue:'' });
            this.props.handleEdit(null);
          },

          handleInputChange(e){
            this.setState({ inputValue:e.target.value });
            // this.props.handleEdit(e.target.value);
          },

          handleTitleDoubleClick(e){
            this.clicks.prevent = true;
            e.preventDefault();
            clearTimeout(this.clicks.timer);
            if (this.props.onTitleDoubleClick) this.props.onTitleDoubleClick()
          },

          handleTitleClick(e){
            e.preventDefault();
            let { onClick } = this.props;

            if(onClick) onClick();
          },

          renderInput(placeholder, padding){
            let { inputValue } = this.state

            return(
              <ClickAwayListener onClickAway={ this.handleClose }>
                  <TextField
                    placeholder={ placeholder }
                    style= {{...styles.search, paddingLeft: padding }}
                    onKeyDown={this.handleKeyPress}
                    onChange={ this.handleInputChange }
                    margin= 'normal'
                    type= 'text'
                    InputProps={{ style: { fontSize: 13, textTransform: 'uppercase' } }}
                    value= { inputValue }
                    autoFocus={ true }/>

              </ClickAwayListener>

            )
          },

          renderName(){
            let { name, icon, editable } = this.props;
            let { expanded } = this.state;
            let padding = icon && !_.isEmpty(icon) ? 0 : 30;
            if (editable) return this.renderInput(name, padding)

            return(
              <Typography style={{ color: core.theme('colors.sectionsHeadLine'), fontWeight: expanded ? 600 : 500, fontSize: 13, paddingLeft: padding }}>
                 { name }
              </Typography>
            )
          },

          renderBadge(){
            let { badge, badgePlacement, isLoading } = this.props;
            if (!badge) return null;
            return (
              <div style={{
                ...styles.badge,
                position: badgePlacement == 'right' ? 'absolute' : 'unset',
                color: core.theme('colors.primary'),
              }}>
                { isLoading ? '...' :  <Badge count={badge}/> }

              </div>
            )
          },

          renderIcon(){
            let { icon, iconSize, iconColor } = this.props;
            if (!icon) return null;
            return (
              <Icon style={{ fontSize: iconSize, color: iconColor, marginLeft: 25 ,marginRight: 10 }} >{ icon }</Icon>
            )
          },

          renderHeadline(){
            let { headerStyle, customClassName } = this.props;
            let { expanded } = this.state;
            return(
              <ExpansionPanelSummary style={{ ...styles.summary, ...headerStyle  }} onClick={ this.handleTitleClick }>
                <div style={{ ...styles.expandButton, height: headerStyle && headerStyle.maxHeight ? headerStyle.maxHeight : 40 }} onClick={ this.handleChange }  >
                  { this.renderExpandMoreIcon(expanded) }
                </div>

                <div style={{ display: 'flex', maxWidth: '85%', width: '100%' }} /*onDoubleClick={ this.handleTitleDoubleClick }*/ onClick={ this.handleChange } >
                    { this.renderIcon() }
                    { this.renderName() }
                    { this.renderBadge() }
                </div>
                { this.renderActionButtons() }
             </ExpansionPanelSummary>
            )
          },

          renderExpandMoreIcon(expanded){
            let {isLoading} = this.props;
            if(isLoading) return <Loader show={ true } size={15}/>

            return( <Icon style={{ fontSize: 20, color: core.theme('colors.actionIcons') }} >{ core.icons( expanded ? 'panel.expandLess' : 'panel.expandMore') }</Icon> )
          },

          renderActionButtons(){
            let { expanded } = this.state;
            let { headerStyle, actionButtons } = this.props;
            if (actionButtons) {
              return (
                <div style={{ ...styles.expandButton, width: 'auto', paddingRight: 0, left: 'unset', right: 5, height: headerStyle && headerStyle.maxHeight ? headerStyle.maxHeight : 40 }}
                     onClick={e=>{ e.preventDefault() }}>
                  { actionButtons }
                </div>
              )
            }
            return null;
          },

          childRender(content, itemKey){
            if (this.props.childRender)  { return this.props.childRender(content, itemKey); }
            else {
              return  _.map(content, (per, idx)=>{
                return <div key={idx}>{ per.name }</div>
              });
            }
          },

          render() {

              let { customClassName, style, isLoading, childWrapStyle, boxShadow } = this.props;
              let { expanded } = this.state;

              return (
                <ExpansionPanel className={ customClassName+` ${ boxShadow ? '' : 'no_boxshadow'}` }
                                style={{ ...style }}
                                expanded={ expanded }>

                    { this.renderHeadline() }

                  <ExpansionPanelDetails style={{ display: 'flex', flexDirection: 'column', padding: 0, ...childWrapStyle }}>
                    { this.childRender() }
                  </ExpansionPanelDetails>

                </ExpansionPanel>
              )

          }
      }
  }
}
let styles = {
  expandButton: {
    position: 'absolute',
    width: '25px',
    height: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    left: '10px',
    top: 0
  },

  badge: {
    marginLeft: 5,
    fontSize: 13,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: '55px'
  },
  summary: {
    padding: '0 10px',
    display: 'flex',
    alignItems:'center',
    maxHeight: 40,
    minHeight: 40,
    textTransform: 'uppercase'
  },

  searchCont:{
    display: 'flex',
    width: '100%',
    alignItems: 'center'
  },

  search:{
    width: '100%',
    marginBottom: 15,
    fontSize: 13,
    textTransform: 'uppercase'
  }

}
