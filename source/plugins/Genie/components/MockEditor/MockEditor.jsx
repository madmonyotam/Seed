import AceEditor from 'react-ace';
import 'brace/theme/idle_fingers';
import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/ext/searchbox';
import "brace/ext/language_tools";

module.exports = {
    name: "MockEditor",
    description: '',
    propTypes: {},
    dependencies: ['Genie.Generator'],

    get(Generator) {
        let core = this;
        var { React, PropTypes, ComponentMixin, Branch } = core.imports;

        const units = {
            dims: {},
            colors: {},
            units: {},
        };

        return {
            mixins: [ ComponentMixin, Branch ],

            cursors: {
                selected: ['plugins','Genie','selected'],
            },

            propsTypes: {
                data: PropTypes.object,
                cb: PropTypes.func,
                height:  PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
            },

            componentWillMount() {
                this.initUnits();
            },

            getDefaultProps(){
                return {
                    data: {},
                    height: '100%',
                    clearCode: false,
                    cb: ()=>{},
                };
            },

            getInitialState() {
                return {
                    data: {},
                };
            },

            componentDidMount() {
                this._aceEditor = null;
                if (this.refs['mockEditor'] && this.refs['mockEditor'].editor) {
                    this._aceEditor = this.refs['mockEditor'].editor;
                    window.editor = this._aceEditor;
                    
                }
                this.setCodeValue(this.props.data)
            },

            componentWillReceiveProps(nextProps) {
                if (nextProps.data !== this.props.data) {
                    this.setCodeValue(nextProps.data)
                }
            },

            initUnits() {
                let lists = this.getAutoCompleteData();
                
                this.types = lists.types;
                this.schemes = lists.schemes;
                this.keyBindings = [
                    // {   // commands is array of key bindings.
                    //   name: 'handleSave', //name for the key binding.
                    //   bindKey: {win: 'Ctrl-s', mac: 'Command-s'}, //key combination used for the command.
                    //   exec: this.handleSave  //function to execute when keys are pressed.
                    // }
                ]
            },

            styles(propName) {
                let styles = {
                    editor: { 
                        height: this.props.height, 
                        width: '100%',
                    }
                }
                return styles[propName]
            },

            setCodeValue(data){
                let viewData = JSON.stringify(data, null, 4);

                const resetSession = () => {
                    setTimeout(() => {
                        if (this._aceEditor.getSession().getUndoManager().hasUndo()) {
                            this._aceEditor.getSession().getUndoManager().reset() 
                        }
                    }, 250);
                }

                this.setState({ data: viewData }, resetSession);
            },

            handleEditorChange(newValue){
                const parentUpdate = (data)=>{
                  if (this.props.cb) {
                      try {
                        this.props.cb(JSON.parse(data));
                      } catch (error) {}
                  }
                };

                this.setState({ data: newValue }, parentUpdate.bind(this, newValue));
            },

            getAutoCompleteData() {
                let {selected} = this.state;
                let data = Generator.getSchemes();

                let schemes = {};
                let types = data.map( d => {
                    schemes[d.type] = d.scheme
                    return d.type
                });
                types = types.sort();
                schemes = this.serialize(schemes);

                for (let i = 0; i < types.length; i++) {
                    let actualType = types[i]
                    let value = schemes[actualType].value;
                    if (value && value instanceof Array && value.length ) {
                        let newValue = [];
                            newValue = value.filter( sv => sv !== selected );
                            newValue = newValue.filter(Boolean);
                            newValue.sort();
                        schemes[actualType].value = newValue;
                    }
                }

                return {types, schemes};
            },

            mapCategories(actualType) {
                let schema = this.schemes[actualType];
                return schema.value && schema.value.map( k => {
                    return {caption: k, value: `"${k}"`, meta: core.translate('Category')}}
                );
            },

            mapTypes() {
                let types = this.types;
                return types.map( t => {
                    let value = `"${t}"`;
                    // let meta = 'Type';
                    let meta = '--';
                    let schema = this.schemes[t];
                    if (!!schema.value) {
                        value = value + `,\n        "value":`;
                        meta = 'Value';
                    }
                    if (!!schema.count) {
                        value = value + ` \n        "count": `;
                        meta = meta + '/Count';
                    }
                    return {caption: t, value: value, meta: core.translate(meta)}}
                );
            },

            wordCompleter() {
                const categoryType = (editor, pos)=>{
                    let lines = editor.selection.anchor.document.$lines;
                    let lastLine = lines[pos.row - 1];
                    let words = lastLine.split(' ');
                    let type = words[words.length - 1];
                        type = type.split(',')[0];
                        type = type.slice(1, -1);
                    return type;
                };

                const getList = (lastWord, editor, pos)=>{
                    if (lastWord === '"type":') return this.mapTypes();
                    else if (lastWord === '"value":') {
                        let actualType = categoryType(editor, pos);
                        return this.mapCategories(actualType);
                    }
                    return false;
                };

                const getLastWord = (editor, pos)=>{
                    let lines = editor.selection.anchor.document.$lines;
                    let selectedLine = lines[pos.row];
                    let cuttedLine = selectedLine.split(pos.row)[0];
                    let words = cuttedLine.split(' ');
                        words = words.filter(Boolean);

                    let lastWord = (words[words.length -1] === ',') ? words[words.length -2] : words[words.length -1];

                    return lastWord;
                };

                return {
                    getCompletions: (editor, session, pos, prefix, callback)=>{
                        let lastWord = getLastWord(editor, pos);
                        let wordList = getList(lastWord, editor, pos);
                        let mode = lastWord.slice(0, -1);
                            mode = mode.slice(1, -1);

                        if (wordList && wordList.length) {
                            callback(null, wordList.map( ({caption, value, meta}) => {
                                return { caption, value, meta };
                            }));
                        }
                    }
                };
            },

            render() {
                let {data} = this.state;

                return (
                    <AceEditor
                        ref={ 'mockEditor' }
                        style={ this.styles('editor') }
                        mode={ 'json' }
                        theme={'idle_fingers'}
                        wrapEnabled={ true }
                        debounceChangePeriod={ 150 }
                        value={ data != null ? `${data}` : '' }
                        editorProps={{ $blockScrolling: Infinity }}
                        onChange={ this.handleEditorChange }
                        commands={ this.keyBindings }
                        name={ '_jsonEditor' }
                        setOptions={{
                            enableBasicAutocompletion: [this.wordCompleter()],
                        }}
                    />
                )
            }
        }
    }
}
