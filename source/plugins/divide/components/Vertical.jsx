
var React = require('react');
var ReactDom = require('react-dom');
var PropTypes = require('prop-types');

var style = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  overflow: 'auto',
};
var boxStyle = {
  ...style,
  left: 0,
  right: 0
}

module.exports = {
  name: 'Vertical',
  dependencies: [
    'divide.VerticalLine'
  ],
  get(VerticalLine){
    return {
      propTypes: {
        ns: PropTypes.string,
        onMoveComplete: PropTypes.func,
        width: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ]),
        from: PropTypes.oneOf(['left', 'right']),
        min: PropTypes.number,
        disabled: PropTypes.bool,
        lineStyle: PropTypes.object,
        paneStyle: PropTypes.object,
      },
      getInitialState(){
        var width;
        if(this.props.ns) width = localStorage.getItem(`${this.props.ns}.width`);
        this.width = width || this.props.width || '50%';
        this.isActive = false;
        this.containerLeft = 0;
        return null;
      },
      componentDidMount(){
        this.el = this.refs.box;
        document.body.addEventListener('mouseleave', this.onWindowMouseLeave, false);
      },
      componentWillUnmount(){
        document.body.removeEventListener('mouseleave', this.onWindowMouseLeave, false);
      },
      componentWillReceiveProps(newProps){
          if(newProps.width !== this.props.width){
            this.width = newProps.width;
            this.moveLine(newProps.width);
          }
      },
      activate(){
        if(this.props.disabled) return;
        this.isActive = true;
        var left = 0;
        var target = this.el;
        while(target){
          left += target.offsetLeft;
          target = target.offsetParent;
        }
        this.containerLeft = left;
      },
      onWindowMouseLeave(e){
        if(e.target === document.body){ this.deactivate(); }
      },
      deactivate(){
        if(this.isActive){
          this.isActive = false;
          if(this.props.onMoveComplete){
            this.props.onMoveComplete(this.width);
          }
        }
      },
      onMouseMove(e){
        if(!this.isActive){ return; }
        var { ns, from, min = 0 } = this.props;
        e.preventDefault();
        var pageX = e.nativeEvent.pageX;
        var left = pageX - this.containerLeft;
        if(from === 'right'){
          width = Math.max(this.el.clientWidth - left, min) + 'px';  // removed this.state.left :/
        }
        else if(from === 'left'){
          width = Math.max(left, min) + 'px';
        }
        else{
          width = Math.max((left / this.el.clientWidth) * 100, min) + '%';
        }
        if(ns) localStorage.setItem(`${ns}.width`, width);
        this.width = width;
        this.moveLine(width);
      },
      moveLine(width){
        var el = this.el;
        var from = this.props.from;
        var leftElement = el.children[0];
        var lineElement = el.children[1];
        var rightElement = el.children[2];
        
        if(!from || from === 'left'){
          leftElement.style.width = width;
          lineElement.style.left = width;
          rightElement.style.left = width;
        }
        else{
          leftElement.style.right = width;
          lineElement.style.right = width;
          rightElement.style.width = width;
        }
      },
      renderLeft(width){
        var { from, paneStyle } = this.props;
        var leftStyle = {
            ...style,
            left: 0,
            ...paneStyle
        };
        if(!from || from === 'left'){
          leftStyle.width = width;
        }
        else{
          leftStyle.right = width;
        }
        // var child = this.props.children ? (this.props.children[0] || null) : null;
        return (
          <div style={ leftStyle }>
            { this.props.children[0] }
          </div>
        );
      },
      renderRight(width){
        var { from, paneStyle } = this.props;
        var rightStyle = {
            ...style,
            right: 0,
            ...paneStyle
        };
        if(from === 'right'){
          rightStyle.width = width;
        }
        else{
          rightStyle.left = width;
        }
        // var child = this.props.children ? (this.props.children[1] || null) : null;
        return (

          <div style={ rightStyle }>
            { this.props.children[1] }
          </div>
        );
      },
      renderLine(left, right){
        // if(this.props.disabled) return null;
        return (
          <VerticalLine 
            left={ left }
            right={ right }
            onMouseDown={ this.activate }
            lineStyle={ this.props.lineStyle }
            disabled={ this.props.disabled }/>
        );
      },
      render(){
        var left, right, width = this.width;
        if(this.props.from === 'right') right = width;
        else left = width;
        return (
          <div style={ boxStyle } onMouseMove={ this.onMouseMove } onMouseUp={ this.deactivate } ref="box">
            { this.renderLeft(width) }
            { this.renderLine(left, right) }
            { this.renderRight(width) }
          </div>
        );
      }
    };
  }
}
