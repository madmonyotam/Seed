import { Typography } from '@material-ui/core'
module.exports = {
    name: 'CategoryItemEditor',
    dependencies: ['Simple.Icon', 'Layouts.Column', 'popovers.PopupHandler', 
                    'Inputs.Input',
                    // 'Simple.Input_L1',
                    'Genie.Generator',
                ],
    get(Icon, Column, PopupHandler, Input, Generator,) {

        var core = this;
        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            propsTypes: {
                mode: PropTypes.string,
                parentKey: PropTypes.string,
            },

            getDefaultProps(){
                return {
                    mode: 'add',
                    parentKey: '',
                };
            },

            getInitialState() {
                let types = Generator.getTypes(); 
                return {
                    oldTitle: '',
                    title: '',
                    allTypes: types.sort(),
                    type: '',
                    inputValue: '',
                    value: '',
                    typesOptions: types.map((type)=>{
                      return { label: type, value: type, info: Generator.getTypeInfo(type)  }
                    }),
                    count: null,
                    currentType: null,
                    categoriesOptions: undefined,
                };
            },

            componentWillMount () {
                this.initUnits();
            },

            componentDidMount() {
                this.getData();
                this.handleCategoriesOptions(this.state.currentType);
            },

            componentWillUnmount() {
                PopupHandler.disableOkBtn();
            },

            componentWillReceiveProps (nextProps) {
            },

            initUnits(){
                this.dims = {
                    minTitleWidth: 100,
                    padding: '10px 0px'
                };
                this.icons = {
                };
                this.colors = {
                    border: core.theme('borders.default'),
                    white: core.theme('colors.white'),
                    text: core.theme('texts.default'),
                };
                this.backgrounds = {
                };
            },

            styles(s){
                const styles = {
                    root: {
                        width: 500,
                        maxWidth: 500,
                    },
                    textField: {
                        marginTop: 0,
                        marginBottom: 0
                    },
                    sortText: {
                        padding: 0
                    },
                    countInput: {
                        padding: `0px 10px`,
                        zIndex: 2,
                        fontSize: 13,
                        backgroundColor: "transparent",
                        border: 0,
                        width: "100%",
                        height: "100%",
                        borderBottom: `1px solid ${this.colors.border}`
                    },
                }
                return(styles[s]);
            },

            getData() {
                if ( this.props.mode === 'edit') {
                    let data = PopupHandler.getData();
                    let editState = {
                        ...this.state,
                        oldTitle: data.title,
                        title: data.title,
                        type: data.type,
                    };
                    if (data && data.value) editState.value = data.value;
                    if (data && data.count) editState.count = data.count;

                    this.setState(editState, ()=>{this.handleTypeChange(data.type)});

                } else return; 
            }, 

            handleCB(){
                let {oldTitle, title, type, value, count} = this.state;
                let needsCount = type === 'categoryList';
                let needsValue = !!(['arrayElement', 'arraySubArray', 'category', 'categoriesArray', 'categoryList', 'dateFuture', 'datePast', 'fixedValue', ].indexOf(type) > -1);

                let hasTitle = title && title.length;
                let hasValue = value && value.length;
                let hasCount = count && count > 0;

                if (needsCount) {
                    if (!hasTitle || !hasValue || !hasCount)
                        PopupHandler.disableOkBtn();
                    else {
                        PopupHandler.addData({oldTitle, title, type, value, count});
                        PopupHandler.enableOkBtn();
                    }
                }
                else {
                    if (needsValue) {
                        if (!hasTitle || !hasValue)
                            PopupHandler.disableOkBtn();
                        else {
                            PopupHandler.addData({oldTitle, title, type, value});
                            PopupHandler.enableOkBtn();
                        }
                    } else {
                        if (!hasTitle)
                            PopupHandler.disableOkBtn();
                        else {
                            PopupHandler.addData({oldTitle, title, type});
                            PopupHandler.enableOkBtn();
                        }
                    }
                }
            },

            renderTitle() {
                return (
                  <div style={{ margin: '15px 0' }}>
                    <Input type={ 'text' }
                           label={ core.translate('Title') }
                           theme={ 'filled' }
                           placeholder={ core.translate('inputCategoryTitle','Set category title...') }
                           value={ this.state.title }
                           autoFocus={true}
                           onChange={ value => { this.handleChange('title', value) } }/>
                  </div>
                ) 
            },

            handleChange (stateName, value){
              let newState = {...this.state};
              newState[stateName] = value;
              this.setState(newState, this.handleCB);
            },

            handleTypeChange(type, CLEAR=false) {
              let currentType = Generator.getTypeScheme(type); 
              this.handleChange('type', type); 

              this.handleCategoriesOptions(currentType);

              if (CLEAR) this.setState({currentType, value: '', count: null});
              else this.setState({currentType});
            },

            handleCategoriesOptions(currentType) { 
                let categoriesOptions = undefined;

                if (currentType && currentType.value && Array.isArray(currentType.value) ) {
                    let keys = currentType.value.sort();
                    keys = keys.filter( key => key !== this.props.parentKey );

                    categoriesOptions = keys.map( op =>{ return { label : op, value: op } });
                }

                this.setState({categoriesOptions});
            },

            renderType() { 
              let currentInfo = Generator.getTypeInfo(this.state.type); 
              const CLEAR = true;

              return (
                <div style={{ margin: '15px 0', position: 'relative' }}>
                  <Input type={ 'autocomplete' } 
                         theme={ 'filled' } 
                         label={ core.translate('Type') } 
                         value={ this.state.type }
                         placeholder={ core.translate('inputCategoryType','Search for type...') }
                         options={ this.state.typesOptions } 
                         onChange={ (type)=>{this.handleTypeChange(type, CLEAR)} } />

                    <Icon
                        title={ this.renderTooltip(currentInfo) } 
                        style={{ position: 'absolute', top: 0, right: 0 }}
                        size={ 16 }
                        color={this.colors.text}
                    />

                </div>
              )                
            },

            renderTooltip(text){
              return (
                <Typography style={{ textTransform: 'capitalize', fontSize: 12, fontWeight: 400, color: this.colors.white }}>
                    { text || core.translate('Select Type') }
                </Typography>
              )
            },

            renderValue() {
                if (!this.state.currentType || !this.state.currentType.value) return null;

                const getPlaceholder = () => {
                  if (this.state.currentType.value && core.isString(this.state.currentType.value)) {
                    return this.state.currentType.value;
                  } else return core.translate('inputCategoryValue','Place value here...')
                };

                return (
                  <div style={{ margin: '15px 0' }}>
                    <Input  type={ this.state.currentType.type }
                            theme={ 'outlined' } 
                            // theme={ 'filled' } 
                            label={ core.translate('Value') } 
                            value={ this.state.value }
                            placeholder={ getPlaceholder() }
                            options={ this.state.categoriesOptions } 
                            onChange={ v => { this.handleChange('value', v) } } />
                  </div>
                )
            },

            renderCount() {

              let { currentType } = this.state;
              if (!currentType || !currentType.count) return null;
              return (
                <div style={{ margin: '15px 0' }}>
                  <Input type={ 'number' } 
                         label={ core.translate('Count') } 
                         theme={ 'default' }
                         value={ this.state.count || '' }
                         onChange={ value => { this.handleChange('count', value) } } />
                </div>
              ) 
            },

            render () {
                return (
                    <Column id={'CategoryItemEditor'} style={this.styles('root')} >
                        { this.renderTitle() }
                        { this.renderType() }
                        { this.renderValue() }
                        { this.renderCount() }
                    </Column>
                );
            },
        }
    }
}