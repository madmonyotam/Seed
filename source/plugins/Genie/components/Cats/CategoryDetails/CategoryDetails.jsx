import {Input} from '@material-ui/core';
import {isEmpty} from 'lodash';

module.exports = {
    name: 'CategoryDetails',
    description: 'This is an example of a component',
    dependencies: [ 'Layouts.Column', 'Layouts.Row', 'Simple.Label', 'Simple.Badge', 'Inputs.IconMenu',
        'Genie.Generator', 'Genie.MockEditor', 'Genie.MockTable', 'Mongo.Handler', 'Simple.Icon',
        // 'Simple.FileDownloader', 
        'popovers.PopupHandler', 'Genie.CategoryItemEditor', 'Simple.NoResults' ],

        get( Column, Row, Label, Badge, IconMenu,
        Generator, MockEditor, MockTable, MongoHandler, Icon,
        // FileDownloader, 
        PopupHandler, CategoryItemEditor, NoResults
        ) {
        var seed = this;
        var { React, PropTypes, ComponentMixin } = seed.imports;

        return {
            mixins: [ ComponentMixin ],

            propsTypes: {},

            getDefaultProps(){
                return {};
            },

            getInitialState() {
                this.TABLE = 0;
                return {
                    mode: this.TABLE,
                    counter: 1,
                    stateItems: {},
                    codeData: {},
               };
            },

            componentWillMount () {
                this.initUnits();
            },

            componentDidMount() {
            },

            componentWillUnmount() {
                this.setState({
                    counter: 1,
                });
            },

            componentWillReceiveProps (nextProps) {
                if (this.props.currentCategory !== nextProps.currentCategory)
                    this.updateParentKeyAndStateItems(nextProps);
                if (nextProps.currentLibrary !== this.props.currentLibrary || nextProps.currentCategory !== this.props.currentCategory)
                    this.parentKey = `${nextProps.currentLibrary}:${nextProps.currentCategory}`;
                    this.setState({stateItems:{}});
            },

            initUnits(){
                // this.TABLE - see getInitialState
                this.CODE   = 1;
                this.CREATE = 2;

                this.units = {
                    maxCreate: 50000,
                    minCreate: 1,
                };
                this.colors = {
                    text: seed.theme('texts.default'),
                    generate: seed.theme('texts.primary'),
                    icon: seed.theme('texts.primary'),
                    border: seed.theme('borders.light'),
                    lib: seed.theme('Genie.lib_bg'),
                    cat: seed.theme('Genie.cat_bg')
                };
                this.backgrounds = {
                    default: seed.theme('backgrounds.default')
                };
                this.dims = {
                    mainHeight: 'calc(100% - 50px)',
                    mainWidth: '100%',
                    actionButtonIcon: 16,
                    createActionsInputWidth: 100,
                };
                this.icons = {
                    arrowUp: seed.icons('navigate.arrow_up'),
                    arrowDown: seed.icons('navigate.arrow_down'),
                    table: seed.icons('genie.table'),
                    code: seed.icons('genie.code'),
                    create: seed.icons('genie.create'),
                    mongo: seed.icons('genie.mongo'),
                    save: seed.icons('genie.save'),
                    generate: seed.icons('genie.generate'),
                    add: seed.icons('genie.add'),
                };
            },

            styles(s){
                const styles = {
                    root: {

                    },
                    titleRow: {
                        borderRadius: "4px 4px 0 0",
                    },
                    actions: {
                        justifyContent: 'flex-end',
                    },
                    createActionsInput: {
                        color: this.colors.text,
                        margin: '0 10px'
                    },
                    actionButton: {
                        margin: '0 10px'
                    },
                    createButton: {
                        margin: '0 10px'
                    },
                    button: {
                        margin: '0 10px',
                        background: this.backgrounds.title,
                    },
                    welcome: {
                        display: 'flex',
                        height: '100%',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: "center",
                        flexDirection: "column",
                        zIndex: 2,
                        background: this.colors.lib,
                        color: this.colors.text,
                        cursor: 'pointer',
                        userSelect: 'none', /* supported by Chrome and Opera */
                        WebkitUserSelect: 'none', /* Safari */
                        KhtmlUserSelect: 'none', /* Konqueror HTML */
                        MozUserSelect: 'none', /* Firefox */
                        MsUserSelect: 'none', /* Internet Explorer/Edge */
                    }
                }
                return(styles[s]);
            },

            updateParentKeyAndStateItems(props) {
                let data = this.serialize(seed.get('genie'));
                let stateItems = data[this.parentKey];
                
                if (this.state.mode === this.CREATE) {
                    this.handleGenerate(props);
                    this.setState({stateItems:{}});
                } else {
                    this.setState({stateItems, codeData: {}});
                }
            },

            handleGenerate(params) {
                let {counter} = this.state;
                let model = params && params.items ? params.items : this.props.items;
                let count = counter < this.units.maxCreate ? counter > this.units.minCreate ? counter : this.units.minCreate : this.units.maxCreate;

                let data = Generator.create({count, model}, true);

                this.setState({codeData: data, counter: count});
            },

            handleSaveToMongo(event, saveKey, data){
                if (event) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                const cb = (res) => {
                    if (res.success) {
                        setTimeout( MongoHandler.disconnect , 500 );
                        let notify = {
                            text: 'Saved to MongoDB Successfully!',
                            alertKind: 'success'
                        }
                        seed.emit('notify',notify);
                    }
                }
                let collectionName = seed.getCurrentUser().tenantId

                let saveItem = {
                    'key': saveKey.toLowerCase() ,
                    'data': data.res,
                    'total-results': data.res.length
                }

                let currentUser = seed.getCurrentUser();
                let dbName = currentUser ? currentUser.tenantId : undefined
                MongoHandler.automate(dbName, collectionName, saveItem, cb);
            },

            handleUpdateTree( data, mode ) {
                let mock = this.serialize(seed.get('genie'));

                let newData = {
                    type: data.type
                };
                if (data && data.value) newData.value = data.value;
                if (data && data.count) newData.count = data.count;

                if (mode === 'edit') delete mock[this.parentKey][data.oldTitle];
                
                if (mode === 'remove') delete mock[this.parentKey][data];
                else mock[this.parentKey][data.title] = newData;

                this.setState({stateItems: mock[this.parentKey]});
                seed.set('genie', mock);
            },

            handleUpdateItems(data) {
                this.setState({stateItems: data});
            },

            handleActions() {
                switch (this.state.mode) {
                    case this.CREATE:         return this.renderCreateActions();
                    case this.CODE:           return this.renderSaveToTreeButton();
                    case this.TABLE: default: return this.renderTableActions();
                }
            },

            renderCreateActions() {
                const inputOnChange = (e)=>{
                    this.setState({counter: e.target.value});
                };
                const inputProps = {
                    type: 'number',
                    max: this.units.maxCreate,
                    min: this.units.minCreate,
                    style: {textAlign: 'center'}
                };
                const saveMongo = (e)=>{
                    this.handleSaveToMongo(e, this.parentKey, this.state.codeData);
                };

                return (
                    <React.Fragment>
                         <Icon key={'mongo'}
                            color={this.colors.text}
                            icon={this.icons.mongo}
                            size={this.dims.actionButtonIcon}
                            onClick={saveMongo}
                            title={seed.translate('Upload to MongoDB')}
                        />
                        {/* <FileDownloader
                            key={'download'}
                            content={this.state.codeData}
                            fileName={this.parentKey}
                            fileExtension={'json'}
                        > */}
                            <Icon key={'file'}
                                color={this.colors.text}
                                icon={this.icons.save}
                                onClick={console.log('MISSING FILEDOWNLOADER')}
                                size={this.dims.actionButtonIcon}
                                title={seed.translate('Save to file')}
                            />
                        {/* </FileDownloader> */}

                        <Input
                            value={this.state.counter}
                            onChange={inputOnChange}
                            style={this.styles('createActionsInput')}
                            inputProps={inputProps}
                        />
                        <Icon key={'generate'}
                            color={this.colors.text}
                            onClick={this.handleGenerate}
                            icon={this.icons.generate}
                            size={this.dims.actionButtonIcon}
                            title={seed.translate('Generate code')}
                        />
                    </React.Fragment>
                );
            },

            handleSaveToTree(model) {
                if (!model || isEmpty(model)) return null;

                let isJSON = (model)=>{try {JSON.parse(model);} catch(e) {return false;}; return true;};

                if (typeof model === 'string' && isJSON(model)) {
                    model = JSON.parse(model);
                }

                let data = this.serialize(seed.get('genie'));
                    data[this.parentKey] = model;
                
                console.log('data :', data);
                seed.set('genie', data);
            },

            renderSaveToTreeButton() {
                if (!this.state.stateItems || isEmpty(this.state.stateItems)) return null;

                const click = (e)=>{
                    let model = this.state.stateItems;
                    let isJSON = (model)=>{try {JSON.parse(model);} catch(e) {return false;}; return true;};
                    
                    if (typeof model === 'string' && isJSON(model)) {
                        model = JSON.parse(model);
                    }
                    this.handleSaveToTree(model);
                };

                return (
                    <Icon
                        color={this.colors.text}
                        onClick={click}
                        icon={this.icons.save}
                        size={this.dims.actionButtonIcon}
                        title={seed.translate('Save Changes')}
                    />
                );
            },

            handleAddItem() {
                let all = seed.get('genie');

                const change = ()=>{
                    let data = PopupHandler.getData();
                    this.handleUpdateTree(data, 'add');
                    seed.emit('Popup.close');
                };

                PopupHandler.openSimpleModal({
                    title: seed.translate('Add new item to category'),
                    body: <CategoryItemEditor parentKey={this.parentKey}/>,
                    bodyStyle: {minHeight: 'unset'},
                    okButton: {
                        btnTitle: seed.translate('Add'),
                        btnFunc: change
                   }
                });
            },

            renderTableActions() {
                return (
                    <React.Fragment>
                        <Icon
                            color={this.colors.text}
                            onClick={this.handleAddItem}
                            icon={this.icons.add}
                            size={this.dims.actionButtonIcon}
                            title={seed.translate('Add Item')}
                        />
                        {this.renderSaveToTreeButton()}
                    </React.Fragment>
                );
            },

            renderViewButton() {
                let showIcon = [ this.icons.table, this.icons.code, this.icons.create ][this.state.mode];
                let modeTitle = [ 'Table', 'Code', 'Create' ][this.state.mode];
                const click = (value)=>{
                    this.handleSaveToTree(this.state.stateItems);
                    this.safeState({mode: value});
                    if (value === this.CREATE) { this.handleGenerate(); }
                };
                const items = [
                    {
                        text: 'Table', value: this.TABLE, iconProps: {icon: this.icons.table},
                        onClick: ()=>{ click(this.TABLE); }
                    }, {
                        text: 'Code', value: this.CODE, iconProps: {icon: this.icons.code},
                        onClick: ()=>{ click(this.CODE); }
                    }, {
                        text: 'Create', value: this.CREATE, iconProps: {icon: this.icons.create},
                        onClick: ()=>{ click(this.CREATE); }
                    },
                ];
                let title = `${seed.translate('View Mode')}: ${seed.translate(modeTitle)}`;

                return (
                    <IconMenu
                        key={'view'}
                        iconSize={14}
                        dropDown={true}
                        icon={showIcon}
                        iconColor={this.colors.icon}
                        menuTitle={title}
                        selected={this.state.mode}
                        menuItems={items}
                        style={this.styles('button')}
                    />
                );
            },

            renderTitle() {
                let {currentLibrary, currentCategory, items} = this.props; 
                if(!currentCategory) return null;

                let badge = items ? Object.keys( items ).length : 0;
                let cat = String(currentCategory).toUpperCase();
                let lib = String(currentLibrary).toUpperCase();
                let title = `${cat} at ${lib}`;

                return (
                    <Row color={this.backgrounds.default} style={this.styles('titleRow')}>
                        <Row padding={0}>
                            <Label label={title} />
                            <Badge size={1} count={badge} />
                        </Row>
                        <Row padding={0} style={this.styles('actions')}>
                            {this.handleActions()}
                            {this.renderViewButton()}
                        </Row>
                    </Row>
                );
            },

            renderBody() {
                let {mode, codeData} = this.state;
                let {items} = this.props;

                switch (mode) {
                    case this.CREATE:
                        return (<MockEditor data={codeData} parentKey={this.parentKey}/>);

                    case this.CODE:
                        return (<MockEditor data={items}    parentKey={this.parentKey} cb={this.handleUpdateItems}/>);

                    case this.TABLE:
                    default:
                        return (<MockTable  items={items}   parentKey={this.parentKey} cb={this.handleUpdateTree}/>);
                };
            },

            addLibrary() {
                return (
                    <div  onClick = { this.props.addLib } style={this.styles('welcome')}>
                        <Row width={'fit-contant'}>
                            <Label size={40} label={seed.translate('Welcome to  genie')} style={{textTransform: 'uppercase' }}/>
                        </Row>
                        <Row width={'fit-contant'} height={100}>
                            <Label size={20} label={seed.translate('Click here to start')}/>
                        </Row>
                    </div>
                );
            },

            addCategory() {
                return (
                    <NoResults
                        onClick = { this.props.addCat }
                        text={ seed.translate('add category') }
                        icon={ seed.icons('genie.add') }
                        color={ seed.theme('texts.default') }
                        background= { this.colors.cat }
                        size={6}
                    />
                );
            },

            addItem() {
                return (
                    <NoResults
                        onClick = { this.handleAddItem }
                        text={ seed.translate('Add Item') }
                        icon={ seed.icons('genie.add') }
                        color={ seed.theme('texts.default') }
                        background= { this.backgrounds.default }
                        size={6}
                    />
                );
            },

            render() {
                let {items, currentLibrary, currentCategory} = this.props;

                if (isEmpty(items) && isEmpty(currentLibrary) && isEmpty(currentCategory)) return this.addLibrary();
                if (isEmpty(items) && isEmpty(currentCategory)) return this.addCategory();
                if (isEmpty(items)) return this.addItem();

                return (
                    <Column id={'CategoryDetails'} width={this.dims.mainWidth} style={this.styles('root')}>
                        {this.renderTitle()}
                        <Column width={'100%'} height={this.dims.mainHeight} >
                            { this.renderBody() }
                        </Column>
                    </Column>
                )
            } 
        }
    }
}
