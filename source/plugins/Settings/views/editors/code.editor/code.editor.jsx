import AceEditor from 'react-ace';
import 'brace/theme/clouds_midnight';
import 'brace/theme/xcode';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/ext/searchbox';
import 'brace/ext/language_tools';
import { Paper } from '@material-ui/core';

module.exports = {
    name: "CodeEditor",

    description: '',

    dependencies: [ ] ,

    get( ) {

        var core = this;

        var { React, PropTypes, Branch, ComponentMixin } = core.imports;

        return {
            mixins: [  Branch, ComponentMixin ],

            propsTypes: {
              data: PropTypes.object,
              parentKey: PropTypes.string
            },

            cursors: {
              config: ['plugins', 'access', 'config'],
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
              this.setCodeValue(this.props.data, this.props.parentKey)
            },

            componentWillUnmount() {
              this.isUnmounted = true;
            },

            componentWillReceiveProps(nextProps) {
              if (nextProps.data && !_.isEqual(nextProps.data, this.props.data)) {
                this.setCodeValue(nextProps.data, nextProps.parentKey)
              }
            },

            styles(propName) {
              let styles = {
                editor: {
                  height: '100%',
                  width: '100%',
                  borderRadius: 4,
                  font: `14px/normal 'Consolas', 'Monaco', 'Menlo', 'Ubuntu Mono', 'source-code-pro', monospace`
                }
              }
              return styles[propName]
            },

            setCodeValue(data, parentKey){
              var viewData;

              if (data) viewData = JSON.stringify(data, null, 4);

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
              let { parentKey, userID } = this.props;
              this.setState({ data: newValue });

              let UID = parentKey;
              let DATA = newValue;
              let COLLECTION_NAME = userID;

              // core.setMongoCache(UID, DATA, COLLECTION_NAME);
            },

            render() {
              let { data, keyBindings } = this.state;
              return (
                  <Paper id={'root.codeEditor'} style={{ height: '100%', width: '100%' }}>
                    <AceEditor
                        ref={ 'aceEditor' }
                        style={ this.styles('editor') }
                        mode={ 'json' }
                        theme={ 'clouds_midnight' }
                        wrapEnabled={ true }
                        debounceChangePeriod={ 150 }
                        value={ data != null ? `${data}` : '' }
                        editorProps={{ $blockScrolling: Infinity }}
                        onChange={ this.handleEditorChange }
                        commands={ keyBindings }
                        enableBasicAutocompletion={ true }
                        enableLiveAutocompletion={ true }
                        name={ '_jsonEditor' } />
                  </Paper>
              )
            }
        }
    }
}
