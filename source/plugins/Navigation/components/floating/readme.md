var React = require('react');
var PropTypes = require('prop-types');
var core = require('core');
var _ = require('lodash');
import Draggable from 'react-draggable';

core.Component('Add.Widget', ['webint.mixin', 'widgetDrawer.button'], (mixin, WDButton)=> {
  return {
    mixins: [mixin],

    propTypes : {
      onReset   : PropTypes.func,
      onClear   : PropTypes.func,
      onToggle  : PropTypes.func,
    },

    bindings : {
      loading : ['widgetDrawer', 'loading'],
      currentUser : ['currentUser']
    },

    getInitialState() {
      return { open : false, dragging: false }
    },

    componentWillUnmount(){
      this.setState({ open : false, dragging: false })
    },    

    handleRoute(e){
      e.preventDefault();
      if (this.route.get('dev') === 'true') this.route.remove('dev');
      else this.route.set('dev', 'true');
    },

    onDrag(e){
      e.preventDefault();
      this.setState({ open: false, dragging: true })
    },

    onDragEnd(e, data){
      e.preventDefault();
      console.log(data)
      setTimeout(()=>{
        this.setState({ dragging: false });
        this.onMouseEnter(e);
      }, 150)
    },

    handleToggle(e){
      if (this.state.dragging) return;
      this.props.onToggle(e)
    },

    onMouseEnter(e){
      if (this.state.dragging) return;
      this.setState({ open: true })
    },

    onMouseLeave(e){
      if (this.state.dragging) return;
      this.setState({ open: false })
    },

    render() {
      let { open, dragging, currentUser } = this.state;
      let { onReset, onClear } = this.props;
      return (
        <Draggable 
          disabled={ currentUser.id != 'JohnConnor' }
          onStop={ this.onDragEnd } 
          onDrag={this.onDrag } 
          onStart={ this.onDragStart } 
          bounds={ 'body' }
          onMouseDown={ this.onMouseDown }>

        <div style={{ ...add.main, zIndex:  dragging ? 99999999 : 1299 ,height: open ? 170 : 60, bottom: location.href.indexOf('discover') > -1 ? 20 : 15 }}
             onContextMenu={ this.handleRoute }
             onMouseEnter={ this.onMouseEnter } 
             onMouseLeave={ this.onMouseLeave }>

          <WDButton
            onClick={ this.handleToggle }
            size={ 'large' }
            theme={ 'primary' }
            isDragging={ dragging }
            willAnimate={ true }
            isMenuOpen={ open }
            tooltip={ this.translate('addWidget', 'Add widget') }
            iconClass={ 'add' } />

          <WDButton
            onClick={ (e)=>{ onReset(e) } }
            size={ 'medium' }
            theme={ 'secondary' }
            willAnimate={ false }
            tooltip={ this.translate('restoreLayout', 'Restore layout') }
            style={{ position: 'absolute', ...add.openStyle(open), bottom: 65 }}
            iconClass={ 'restore_page' } />

          <WDButton
            onClick={ (e)=>{ onClear(e) } }
            size={ 'medium' }
            theme={ 'success' }
            willAnimate={ false }
            tooltip={ this.translate('clearLayout', 'Clear layout') }
            style={{ position: 'absolute', ...add.openStyle(open), bottom: 115, transition: 'transform 0.2s ease 0.10s' }}
            iconClass={ 'delete' } />

        </div>
        </Draggable>

      );
    }
  }
});

let add = {
  main: {
    position:'fixed',
    right: 25,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  button: {
    display:'flex', alignItems:'center', justifyContent:'center'
  },
  
  openStyle: (open)=> {
    return {
      transition: 'transform 0.2s ease 0.05s, opacity 0.1s ease-in 0.051s',
      opacity: open ? 1 : 0,
      transform: open ? 'scale3D(1,1,1)' : 'scale3D(0,0,0)',
    }
  }
}
