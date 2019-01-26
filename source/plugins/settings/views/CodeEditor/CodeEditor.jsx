
import AceEditor from 'react-ace';
import 'brace/theme/idle_fingers';
import 'brace/theme/xcode';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/ext/searchbox';

module.exports = {
    name: "CodeEditor",
    description: '',
    propTypes: {},
    dependencies: ['SimpleSwitch.Mixin', 'SimpleSwitch.Helper'],
    bindings: {
      config: ['config'],
    },

    get(Mixin, Helper) {

        var core = this;

        var { React, PropTypes, Branch } = core.imports;

        return {

            mixins: [ Mixin, Branch ],

            cursors: {
              config: ['plugins','Settings', 'config'],
            },
            
            propsTypes: {
              data: PropTypes.object,
              parentKey: PropTypes.string
            },

            getDefaultProps(){
                return {
                  data: {},
                  parentKey: ''
                };
            },

            getInitialState() {
                return {
                  data: {},
                  keyBindings: [
                    {   // commands is array of key bindings.
                      name: 'handleSave', //name for the key binding.
                      bindKey: {win: 'Ctrl-s', mac: 'Command-s'}, //key combination used for the command.
                      exec: this.handleSave  //function to execute when keys are pressed.
                    },
                    {   
                      name: 'handleRestore', 
                      bindKey: {win: 'Ctrl-Shift-r', mac: 'Command-Shift-r'},
                      exec: this.handleRestore 
                    },
                    {   
                      name: 'handleUndo', 
                      bindKey: {win: 'Ctrl-z', mac: 'Command-z'},
                      exec: this.handleUndo 
                    },
                    {   
                      name: 'handleRedo', 
                      bindKey: {win: 'Ctrl-Shift-z', mac: 'Command-Shift-z'},
                      exec: this.handleRedo 
                    },
                    {   
                      name: 'handleView', 
                      bindKey: {win: 'Ctrl-u', mac: 'Command-u'},
                      exec: () => {  core.emit('settings:changeView'); }
                    }
                  ]
                };
            },

            componentDidMount() {
              this.isUnmounted = false;
              this._aceEditor = null;
              if (this.refs['aceEditor'] && this.refs['aceEditor'].editor) {
                this._aceEditor = this.refs['aceEditor'].editor;
                window.editor = this._aceEditor;
              }
              this.setCodeValue(this.props.data)
            },
              
            componentWillUnmount() {
              this.isUnmounted = true;
            },
            
            componentWillReceiveProps(nextProps) {
              if (nextProps.data && !_.isEqual(nextProps.data, this.props.data)) {
                this.setCodeValue(nextProps.data)
              }
            }, 

            styles(propName) {
              let styles = {
                editor: { 
                  height: '99%', 
                  width: '100%', 
                  borderRadius: 4, 
                  boxShadow: `0px 1px 3px 0px rgba(0, 0, 0, 0.2),
                              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
                              0px 2px 1px -1px rgba(0, 0, 0, 0.12)` 
                }
              }
              return styles[propName]
            },

            setCodeValue(data){
              var viewData = Helper.arrayToObject(data, 'key', 'data');
              if (viewData) viewData = JSON.stringify(viewData, null, 4);
              
              const resetSession = () => { 
                setTimeout(() => {
                  if (this._aceEditor.getSession().getUndoManager().hasUndo()) {
                    this._aceEditor.getSession().getUndoManager().reset() 
                  }
                }, 250);
              }
              this.setState({ data: viewData }, resetSession);
            },

            handleUndo(){
              this._aceEditor.undo();
            },
           
            handleRedo(){
              this._aceEditor.redo();
            },

            handleSave(){
              let { parentKey } = this.props;
              let { data } = this.state;
              core.emit('config:changed', { key: parentKey, data: data, code: true })
            },

            handleRestore(){
              let { parentKey } = this.props;
              core.emit('config:restore', { key: parentKey })
            },

            handleEditorChange(newValue){
              this.setState({ data: newValue })
            },

            render() {
              let { data, keyBindings } = this.state;
              return (
                  <div id={'root.codeEditor'} style={{ height: '100%', width: '100%' }}>
                    <AceEditor
                        ref={ 'aceEditor' }
                        style={ this.styles('editor') }
                        mode={ 'json' }
                        theme={ 'idle_fingers' }
                        wrapEnabled={ true }
                        debounceChangePeriod={ 150 }
                        value={ data != null ? `${data}` : '' }
                        editorProps={{ $blockScrolling: Infinity }}
                        onChange={ this.handleEditorChange }
                        commands={ keyBindings }
                        name={ '_jsonEditor' } />
                  </div>
              )
            }
        }
    }
}
