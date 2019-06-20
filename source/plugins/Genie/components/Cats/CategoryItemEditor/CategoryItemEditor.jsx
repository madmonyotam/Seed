module.exports = {
    name: 'CategoryItemEditor',
    dependencies: [ 'Simple.Icon', 'Layouts.Column', 'popovers.PopupHandler', 'Inputs.Input','Genie.Generator',
                    'Decorators.Tooltip', 'Simple.Label'],
    get(Icon, Column, PopupHandler, Input, Generator,
        Tooltip, Label) {

        var core = this;
        var { React, PropTypes, ComponentMixin, Branch } = core.imports;

        
        const units = {
            dims: {},
            icons: {},
            colors: {
                border: core.theme('borders.default'),
                white: core.theme('colors.white'),
                text: core.theme('texts.default'),
            },
            backgrounds: {},
        };

        return {
            mixins: [ ComponentMixin, Branch ],
            
            cursors: {
                selected: ['plugins','Genie','selected'],
            },

            propsTypes: {
                mode: PropTypes.string,
            },

            getDefaultProps(){
                return {
                    mode: 'add',
                };
            },

            getInitialState() {
                let types = Generator.getTypes();
                let mapedTypes = types.map((type)=>{
                    return { 
                        label: type, 
                        value: type, 
                        info: Generator.getTypeInfo(type),
                        group: Generator.getTypeGroup(type),
                    }
                });
                let groups = Generator.getGroups();
                let mapedGroups = groups.map((group)=>{
                    return {
                        label: group, 
                        value: group,
                    }
                })

                return {
                    oldTitle: '',
                    title: '',
                    allTypes: types.sort(),
                    type: '',
                    inputValue: '',
                    value: '',
                    allTypesOptions: mapedTypes,
                    typesOptions: mapedTypes,
                    groupOptions: mapedGroups,
                    currentGroup: '',
                    count: null,
                    currentType: null,
                    categoriesOptions: undefined,
                };
            },

            componentDidMount() {
                this.getData();
                this.handleCategoriesOptions(this.state.currentType);
            },

            componentWillUnmount() {
                PopupHandler.disableOkButton();
            },

            componentWillReceiveProps (nextProps) {
            },

            styles(s){
                const styles = {
                    root: {
                        width: '100%',
                        maxWidth: '100%',
                        padding: 15,
                    },
                    title:{
                        marginBottom: 15,
                    },
                    typeWrap: {
                        margin: '15px 0',
                        position: 'relative',
                        width: '70%',
                    },
                    groupWrap: {
                        margin: '15px 0',
                        position: 'relative',
                        width: '30%',
                        paddingLeft: 15,
                    },
                    typeInfoIcon: {
                        position: 'absolute',
                        top: 0,
                        right: 0,
                    },
                    tooltipLabel: {
                        textTransform: 'capitalize',
                        fontSize: 12,
                        fontWeight: 400,
                        color: units.colors.white
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
                        borderBottom: `1px solid ${units.colors.border}`
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
                let {oldTitle, title, type, value, count, currentType} = this.state;
                let needsCount = type === 'categoryList';
                let needsValue = currentType && currentType.type;

                let hasTitle = title && title.length;
                let hasValue = value && value.length;
                let hasCount = count && count > 0;

                if (needsCount) {
                    if (!hasTitle || !hasValue || !hasCount)
                        PopupHandler.disableOkButton();
                    else {
                        PopupHandler.addData({data: {oldTitle, title, type, value, count}});
                        PopupHandler.enableOkButton();
                    }
                }
                else {
                    if (needsValue) {
                        if (!hasTitle || !hasValue)
                            PopupHandler.disableOkButton();
                        else {
                            PopupHandler.addData({data: {oldTitle, title, type, value}});
                            PopupHandler.enableOkButton();
                        }
                    } else {
                        if (!hasTitle)
                            PopupHandler.disableOkButton();
                        else {
                            PopupHandler.addData({data: {oldTitle, title, type}});
                            PopupHandler.enableOkButton();
                        }
                    }
                }
            },

            renderTitle() {
                return (
                    <Input
                        type={ 'text' }
                        label={ core.translate('Title') }
                        theme={ 'filled' }
                        placeholder={ core.translate('inputCategoryTitle','Set category title...') }
                        value={ this.state.title }
                        autoFocus={true}
                        onChange={ value => { this.handleChange('title', value) } }
                        style={this.styles('title')}
                    />
                )
            },

            handleChange (stateName, value){
              let newState = {...this.state};
              let newValue = ( value && typeof value == 'string' && value.length) ? value.trim() : value;

              newState[stateName] = newValue;
              this.setState(newState, this.handleCB);
            },

            handleTypeChange(type, CLEAR=false) {
                let currentType = Generator.getTypeScheme(type); 
                this.handleChange('type', type);

                this.handleCategoriesOptions(currentType);

                if (CLEAR) {
                    this.setState({currentType, value: '', count: null});
                } else {
                    this.setState({currentType});
                }
            },

            handleGroupChange(group){
                let typesOptions = [...this.state.typesOptions]
                this.setState({
                    currentGroup: group,
                    currentType:null,
                    type:''
                },()=>{
                    let filterOptions = typesOptions.filter((item,idx)=>{
                        return item.group===group
                    })

                    if(group!=='') this.setState({typesOptions: filterOptions})
                    else this.setState({typesOptions: this.state.allTypesOptions})
                });

            },

            handleCategoriesOptions(currentType) { 
                let {selected} = this.state;
                let categoriesOptions = undefined;

                if (currentType && currentType.options ) {
                    let keys = currentType.options.sort();
                    keys = keys.filter( key => key !== selected );

                    categoriesOptions = keys.map( op =>{ return { label : op, value: op } });
                }

                this.setState({categoriesOptions});
            },

            renderType() { 
                const CLEAR = true;

                return (
                    <div style={this.styles('typeWrap')}>
                        <Input 
                            type={ 'autocomplete' } 
                            theme={ 'filled' } 
                            label={ core.translate('Type') } 
                            value={ this.state.type }
                            openOnFocus={ true }
                            placeholder={ core.translate('inputCategoryType','Search for type...') }
                            options={ this.state.typesOptions } 
                            onChange={ (type)=>{this.handleTypeChange(type, CLEAR)} }
                        />
                        <Tooltip
                            position={'bootom-left'}
                            content={this.renderTooltip()}
                            style={this.styles('typeInfoIcon')}
                        >
                            <Icon size={16} color={units.colors.text}/>
                        </Tooltip>
                    </div>
                )
            },

            handleOnFocus(){
                let {currentGroup} = this.state;
                if(currentGroup!=='') {
                    this.setState({type: '',currentType:null})
                    this.handleGroupChange('')
                }
            },

            renderGroup(){
                return(
                    <div style={this.styles('groupWrap')}>
                        <Input 
                            type={ 'autocomplete' } 
                            theme={ 'filled' } 
                            label={ core.translate('Group') } 
                            value={ this.state.currentGroup }
                            openOnFocus={ true }
                            placeholder={ core.translate('inputCategoryGroup','Search for group...') }
                            options={ this.state.groupOptions } 
                            onChange={ (group)=>{this.handleGroupChange(group)} }
                            onFocus={ this.handleOnFocus }
                        />
                    </div>
                )
            },

            renderTooltip(){
                let {type} = this.state;
                let currentInfo = Generator.getTypeInfo(type);
                return (
                    <Label
                        color={units.colors.white}
                        transform={'lowercase'}
                        label={ currentInfo || core.translate('Select Type') }
                        size={12}
                        weight={400}
                    />
                )
            },

            getPlaceholder(){
                let { currentType } = this.state;

                if (currentType.placeholder) {
                    return currentType.placeholder;
                  } else return core.translate('inputCategoryValue','Place value here...')
            },

            renderValueByType(){
                let { currentType } = this.state;
                if (!currentType || !currentType.type) return null;

                switch (currentType.type) {
                    case 'string':
                    case 'number':
                    case 'autocomplete': 
                        return this.renderValue();

                    case 'autocompleteArray':
                        return this.renderAutocompleteArray();
                    case 'array':
                        return this.renderValueMultiple();

                    default:
                        break;
                };

                return(
                   <Label label='missing type'/>
                );
            },

            renderValueMultiple(){
                let { currentType, value } = this.state;
                
                return (
                  <div style={{ margin: '15px 0' }}>
                    <Input  type={ currentType.type }
                            theme={ 'outlined' }  
                            label={ core.translate('Value') } 
                            value={ value }
                            placeholder={ this.getPlaceholder() }
                            openOnFocus={ true }
                            isMultipleValues={ true }
                            handleKeyDown={ v => { this.handleChange('value', v) }  }
                    />
                  </div>
                );
            },

            renderAutocompleteArray(){
                let { value, categoriesOptions } = this.state;
                
                return (
                  <div style={{ margin: '15px 0' }}>
                    <Input  type={ 'autocomplete' }
                            theme={ 'outlined' }  
                            label={ core.translate('Value') } 
                            value={ value }
                            placeholder={ this.getPlaceholder() }
                            openOnFocus={ true }
                            isMultipleValues={ true }
                            options={ categoriesOptions } 
                            onChange={ v => { this.handleChange('value', v) }  }
                    />
                  </div>
                );
            },

            renderValue() {
                let { currentType, value, categoriesOptions } = this.state;

                return (
                  <div style={{ margin: '15px 0' }}>
                    <Input  type={ currentType.type }
                            theme={ 'outlined' }  
                            label={ core.translate('Value') } 
                            value={ value }
                            placeholder={ this.getPlaceholder() }
                            openOnFocus={ true }
                            options={ categoriesOptions } 
                            onChange={ v => { this.handleChange('value', v) } } />
                  </div>
                );
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
                        <div style={{display:'flex'}}>
                            { this.renderType() }
                            { this.renderGroup() }
                        </div>
                        { this.renderValueByType() }
                        { this.renderCount() }
                    </Column>
                );
            },
        }
    }
}