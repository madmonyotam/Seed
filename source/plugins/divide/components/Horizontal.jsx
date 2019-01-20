
var React = require('react');
var ReactDom = require('react-dom');
var PropTypes = require('prop-types');

var style = {
  position: 'absolute',
  left: 0,
  right: 0,
  overflow: 'auto',
};
var boxStyle = {
  ...style,
  top: 0,
  bottom: 0
}

module.exports = {
  name: 'Horizontal',
  dependencies: ['divide.HorizontalLine'],
  get(HorizontalLine){
      return {
      propTypes: {
        ns: PropTypes.string,
        height: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ]),
        from: PropTypes.oneOf(['top', 'bottom']),
        disabled: PropTypes.bool
      },
      getInitialState(){
        var height;
        if(this.props.ns) height = localStorage.getItem(`${this.props.ns}.height`);
        this.height = height || this.props.height || '50%';
        this.isActive = false;
        return null;
      },
      componentDidMount(){
        this.el = this.refs.box;
        // window.addEventListener('mouseup', this.deactivate, false);
      },
      activate(){
        if(this.props.disabled) return;
        this.isActive = true;
      },
      deactivate(){
        this.isActive = false;
      },
      onMouseMove(e){
        if(!this.isActive){ return; }
        e.preventDefault();
        var height, top = e.nativeEvent.offsetY;
        var target = e.target;
        var from = this.props.from;
        while(target && (target !== this.el)){
          top += target.offsetTop;
          target = target.parentElement;
        }
        if(from === 'bottom'){
          height = (this.el.clientHeight - top) + 'px';  // removed this.state.top :/
        }
        else if(from === 'top'){
          height = top + 'px';
        }
        else{
          height = ((this.el.clientHeight / top) * 100) + '%';
        }
        if(this.props.ns) localStorage.setItem(`${this.props.ns}.height`, height);
        this.height = height;
        this.moveLine(height);
      },
      moveLine(height){
        var el = this.el;
        var from = this.props.from;
        var topElement = el.children[0];
        var lineElement = el.children[1];
        var bottomElement = el.children[2];
        if(!from || from === 'top'){
          topElement.style.height = height;
          lineElement.style.top = height;
          bottomElement.style.top = height;
        }
        else{
          topElement.style.bottom = height;
          lineElement.style.bottom = height;
          bottomElement.style.height = height;
        }
      },
      renderTop(height){
        var from = this.props.from;
        var topStyle = {
            ...style,
            top: 0
        };
        if(!from || from === 'top'){
          topStyle.height = height;
        }
        else{
          topStyle.right = height;
        }
        // var child = this.props.children ? (this.props.children[0] || null) : null;
        return (
          <div style={ topStyle }>
            { this.props.children[0] }
          </div>
        );
      },
      renderBottom(height){
        var from = this.props.from;
        var bottomStyle = {
            ...style,
            bottom: 0
        };
        if(from === 'bottom'){
          bottomStyle.height = height;
        }
        else{
          bottomStyle.top = height;
        }
        // var child = this.props.children ? (this.props.children[1] || null) : null;
        return (

          <div style={ bottomStyle }>
            { this.props.children[1] }
          </div>
        );
      },
      renderLine(top, bottom){
        if(this.props.disabled) return null;
        return (
          <HorizontalLine top={ top } bottom={ bottom } onMouseDown={ this.activate }/>
        );
      },
      render(){
        var top, bottom, height = this.height;
        if(this.props.from === 'bottom') bottom = height;
        else top = height;
        return (
          <div style={ boxStyle } onMouseMove={ this.onMouseMove } onMouseUp={ this.deactivate } ref="box">
            { this.renderTop(height) }
            { this.renderLine(top, bottom) }
            { this.renderBottom(height) }
          </div>
        );
      }
    };
  }
}
