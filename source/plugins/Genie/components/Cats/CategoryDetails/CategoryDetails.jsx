import {Input} from '@material-ui/core';
import {isEmpty} from 'lodash';

module.exports = {
    name: 'CategoryDetails',
    description: 'This is an example of a component',
    dependencies: [ 'Layouts.Column', 'Layouts.Row', 'Simple.Label', 'Simple.Badge', 'Inputs.IconMenu',
        'Genie.Generator', 'Genie.MockEditor', 'Genie.MockTable', 'Mongo.Handler', 'Inputs.IconButton',
        'Decorators.FileDownloader', 'popovers.PopupHandler', 'Genie.CategoryItemEditor', 'Simple.NoResults', 'Simple.Drawer' ],

        get( Column, Row, Label, Badge, IconMenu,
        Generator, MockEditor, MockTable, MongoHandler, IconButton,
        FileDownloader, PopupHandler, CategoryItemEditor, NoResults,Drawer
        ) {
        var seed = this;
        var { React, PropTypes, ComponentMixin, Branch } = seed.imports;

        return {
            mixins: [ ComponentMixin, Branch ],

            cursors: {
                currentLibrary: ['plugins','Genie','currentLibrary'],
                currentCategory: ['plugins','Genie','currentCategory'],
                originalData: ['plugins','Genie','data'],
                genie: ['plugins', 'access', 'genie'],
            },

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

            componentWillUnmount() {
                this.setState({
                    counter: 1,
                    open: false,
                });
            },

            componentDidMount() {
                setTimeout(() => {
                    this.setParentKey();
                    this.updateStateItems();
                }, 200);
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
                    root: {},
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

            setParentKey() {
                let parentKey = `${this.cursor.currentLibrary.get()}:${this.cursor.currentCategory.get()}`;
                this.setState(()=>{return {parentKey: parentKey}});
            },

            updateStateItems() {
                let {mode, parentKey} = this.state;

                if (mode === this.CREATE) {
                    this.handleGenerate();
                    this.setState({stateItems:{}});
                } else {
                    this.setState({codeData: {}});
                }
            },

            handleGenerate() {
                let {counter, parentKey} = this.state;
                let {items} = this.props;

                let genieData = this.cursor.genie.get();
                let currentCategory = genieData[parentKey]
                let model = currentCategory && currentCategory.items ? currentCategory.items : items;
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
                        seed.emit('notify', notify);
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
                let {parentKey} = this.state;
                let mock = this.serialize(this.cursor.genie.get());

                let newData = {
                    type: data.type
                };
                if (data && data.value) newData.value = data.value;
                if (data && data.count) newData.count = data.count;

                if (mode === 'edit') delete mock[parentKey][data.oldTitle];
                
                if (mode === 'remove') delete mock[parentKey][data];
                else mock[parentKey][data.title] = newData;

                this.setState((state,p)=>{
                    state.stateItems = mock[parentKey];
                    return state;
                });

                this.cursor.genie.set(mock);
            },

            handleUpdateItems(data) {
                this.setState({stateItems: data});
            },

            handleActions() {
                let {mode} = this.state;
                switch (mode) {
                    case this.CREATE:         return this.renderCreateActions();
                    case this.CODE:           return this.renderSaveToTreeButton();
                    case this.TABLE: default: return this.renderTableActions();
                }
            },

            renderCreateActions() {
                let {parentKey, codeData, counter} = this.state;
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
                    this.handleSaveToMongo(e, parentKey, codeData);
                };

                return (
                    <React.Fragment>

                        <IconButton key={'mongo'}
                                    hoverSize={ 5 }
                                    iconSize={this.dims.actionButtonIcon}
                                    onClick={saveMongo}
                                    title={seed.translate('Upload to MongoDB')}
                                    icon={this.icons.mongo} />

                        <FileDownloader
                            key={'download'}
                            content={codeData}
                            fileName={parentKey}
                            fileExtension={'json'} >

                            <IconButton key={'file'}
                                    hoverSize={ 5 }
                                    iconSize={this.dims.actionButtonIcon}
                                    title={seed.translate('Save to file')}
                                    icon={this.icons.save} />

                        </FileDownloader>

                        <Input
                            value={counter}
                            onChange={inputOnChange}
                            style={this.styles('createActionsInput')}
                            inputProps={inputProps}
                        />

                        <IconButton key={'generate'}
                                    hoverSize={ 5 }
                                    iconSize={this.dims.actionButtonIcon}
                                    onClick={this.handleGenerate}
                                    title={seed.translate('Generate code')}
                                    icon={this.icons.generate} />

                    </React.Fragment>
                );
            },

            handleSaveToTree(model) {
                let {parentKey} = this.state;
                if (!model || isEmpty(model)) return null;

                let isJSON = (model)=>{try {JSON.parse(model);} catch(e) {return false;}; return true;};

                if (typeof model === 'string' && isJSON(model)) {
                    model = JSON.parse(model);
                }

                let data = this.serialize(this.cursor.genie.get());
                data[parentKey] = model;

                this.cursor.genie.set(data);
                this.setState( { stateItems: {} } );
            },

            renderSaveToTreeButton() {
                let {stateItems, genie, parentKey, originalData} = this.state;

                if (originalData[parentKey] && genie[parentKey] && Object.is(originalData[parentKey], genie[parentKey] )) return null;

                const click = (e)=>{
                    let model = stateItems;
                    let isJSON = (model)=>{
                        try { JSON.parse(model); }
                        catch(e) { return false; };
                        return true;
                    };
                    
                    if (typeof model === 'string' && isJSON(model)) {
                        model = JSON.parse(model);
                    }
                    
                    this.handleSaveToTree(model);
                    seed.emit('genie_updateOriginalData');
                    seed.plugins.Settings.run('SaveSettings', { dir: 'genie', fileData: genie });
                };

                return (
                    <IconButton key={'SaveChanges'}
                                hoverSize={ 5 }
                                iconSize={this.dims.actionButtonIcon}
                                onClick={click}
                                title={seed.translate('Save Changes')}
                                icon={this.icons.save} />
                );
            },

            handleAddItem() {
                let {parentKey} = this.state;
                const change = ()=>{
                    let data = PopupHandler.getData();

                    this.handleUpdateTree(data, 'add');
                    PopupHandler.close();
                };

                PopupHandler.addData();

                PopupHandler.open({
                    parameters:{
                        title: seed.translate('Add new item to category'),
                        body: <CategoryItemEditor parentKey={parentKey}/>,
                        okButton: {
                            btnTitle: seed.translate('Add'),
                            btnFunc: change
                        }
                    }
                });
            },

            renderTableActions() {
                return (
                    <React.Fragment>

                        <IconButton 
                            key={'addItem'}
                            hoverSize={5}
                            iconSize={this.dims.actionButtonIcon}
                            onClick={this.handleAddItem}
                            title={seed.translate('Add Item')}
                            icon={this.icons.add}
                        />
                        {this.renderSaveToTreeButton()}
                    </React.Fragment>
                );
            },

            renderViewButton() {
                let {mode, stateItems} = this.state;
                let showIcon = [ this.icons.table, this.icons.code, this.icons.create ][mode];
                let modeTitle = [ 'Table', 'Code', 'Create' ][mode];
                const click = (value)=>{
                    this.handleSaveToTree(stateItems);
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
                        selected={mode}
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
                        <Row padding={0} width={'50%'}>
                            <Label label={title} width={'fit-content'} />
                            <Badge size={1} count={badge} />
                        </Row>
                        <Row padding={0} width={'50%'} style={this.styles('actions')}>
                            {this.handleActions()}
                            {this.renderViewButton()}
                        </Row>
                    </Row>
                );
            },

            renderBody() {
                let {mode, codeData, parentKey} = this.state;
                let {items} = this.props;

                switch (mode) {
                    case this.CREATE:
                        return (<MockEditor data={codeData} parentKey={parentKey}/>);

                    case this.CODE:
                        return (<MockEditor data={items}    parentKey={parentKey} cb={this.handleUpdateItems}/>);

                    case this.TABLE:
                    default:
                        return (<MockTable  items={items}   parentKey={parentKey} cb={this.handleUpdateTree}/>);
                };
            },

            addLibrary() {
                let {addLib} = this.props;
                return (
                    <div  onClick = { addLib } style={this.styles('welcome')}>
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
                let {addCat} = this.props;
                return (
                    <NoResults
                        onClick = { addCat }
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

            toggleDrawer(){
                let { open } = this.state;  

                if (open) seed.emit('closeSimpleDrawer',{id:'GenieCategoryDetails'});
                else      seed.emit('openSimpleDrawer',{id:'GenieCategoryDetails'});
          
                this.setState((state, props)=>{return {open: !state.open}});
            },

            render() {
                let {items, currentLibrary, currentCategory} = this.props;
                let {parentKey} = this.state;

                if (isEmpty(items) && isEmpty(currentLibrary) && isEmpty(currentCategory)) return this.addLibrary();
                if (isEmpty(items) && isEmpty(currentCategory)) return this.addCategory();
                if (isEmpty(items)) return this.addItem();

                return (
                    <Column id={'CategoryDetails'} width={this.dims.mainWidth} style={this.styles('root')}>
                        {this.renderTitle()}
                        <Column width={'100%'} height={this.dims.mainHeight} >
                            { this.renderBody() }
                        </Column>
                        <Drawer size={'calc(100% - 50px)'} offset={50} drawerId={'GenieCategoryDetails'}>
                            <CategoryItemEditor parentKey={parentKey}/>
                        </Drawer>
                    </Column>
                )
            } 
        }
    }
}
