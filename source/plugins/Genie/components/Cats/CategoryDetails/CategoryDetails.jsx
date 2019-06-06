import {isEmpty} from 'lodash';

module.exports = {
    name: 'CategoryDetails',
    description: 'This is an example of a component',
    dependencies: [ 'Layouts.Column', 'Layouts.Row', 'Simple.Label', 'Simple.Badge', 'Inputs.IconMenu',
        'Genie.Generator', 'Genie.MockEditor', 'Genie.MockTable', 'Mongo.Handler', 'Inputs.IconButton',
        'Decorators.FileDownloader', 'popovers.PopupHandler', 'Genie.CategoryItemEditor', 'Simple.NoResults', 'Genie.CategoryMoveRename',
        'Inputs.Input', 'Decorators.Margin'
     ],

        get( Column, Row, Label, Badge, IconMenu,
            Generator, MockEditor, MockTable, MongoHandler, IconButton,
            FileDownloader, PopupHandler, CategoryItemEditor, NoResults, CategoryMoveRename,
            Input, Margin
        ) {
        var seed = this;
        var { React, PropTypes, ComponentMixin, Branch } = seed.imports;

        const units = {
            TABLE:  0,
            CODE:   1,
            CREATE: 2,

            maxCreate: 50000,
            minCreate: 1,
            
            colors: {
                text: seed.theme('texts.default'),
                generate: seed.theme('texts.primary'),
                icon: seed.theme('texts.primary'),
                border: seed.theme('borders.light'),
                lib: seed.theme('Genie.lib_bg'),
                cat: seed.theme('Genie.cat_bg')
            },
            backgrounds: {
                default: seed.theme('backgrounds.default')
            },
            dims: {
                mainHeight: 'calc(100% - 50px)',
                mainWidth: '100%',
                actionButtonIcon: 16,
                createActionsInputWidth: 100,
            },
            icons: {
                arrowUp: seed.icons('navigate.arrow_up'),
                arrowDown: seed.icons('navigate.arrow_down'),
                table: seed.icons('genie.table'),
                code: seed.icons('genie.code'),
                create: seed.icons('genie.create'),
                mongo: seed.icons('genie.mongo'),
                save: seed.icons('genie.save'),
                generate: seed.icons('genie.generate'),
                add: seed.icons('genie.add'),
                edit: seed.icons('genie.edit'),
            },
        };

        return {
            mixins: [ ComponentMixin, Branch ],

            cursors: {
                currentLibrary: ['plugins','Genie','currentLibrary'],
                currentCategory: ['plugins','Genie','currentCategory'],
                originalData: ['plugins','Genie','data'],
                selected: ['plugins','Genie','selected'],
                genie: ['plugins', 'access', 'genie'],
            },

            propsTypes: {},

            getDefaultProps(){
                return {};
            },

            getInitialState() {
                
                return {
                    mode: units.TABLE,
                    counter: 1,
                    stateItems: {},
                    codeData: {},
               };
            },

            componentWillUnmount() {
                this.setState({
                    counter: 1,
                    open: false,
                });
            },

            componentDidMount() {
                this.updateStateItems();
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
                        maxWidth: 75,
                        height: 25,
                    },
                    createActionsInput_input: {
                        height: 25,
                        textAlign: 'center'
                    },
                    actionButton: {
                        margin: '0 10px'
                    },
                    createButton: {
                        margin: '0 10px'
                    },
                    button: {
                        margin: '0 10px',
                        background: units.backgrounds.title,
                    },
                    welcome: {
                        display: 'flex',
                        height: '100%',
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: "center",
                        flexDirection: "column",
                        zIndex: 2,
                        background: units.colors.lib,
                        color: units.colors.text,
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

            updateStateItems() {
                let {mode} = this.state;

                if (mode === units.CREATE) {
                    this.handleGenerate();
                    this.setState({stateItems:{}});
                } else {
                    this.setState({codeData: {}});
                }
            },

            handleGenerate() {
                let {counter, selected, genie} = this.state;
                let {items} = this.props;

                let currentCategory = genie[selected];
                let model = currentCategory && currentCategory.items ? currentCategory.items : items;
                let count = counter < units.maxCreate ? counter > units.minCreate ? counter : units.minCreate : units.maxCreate;

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
                let {selected, genie} = this.state;
                let mock = this.serialize(genie);

                let newData = {
                    type: data.type
                };
                if (data && data.value) newData.value = data.value;
                if (data && data.count) newData.count = data.count;

                if (mode === 'edit') delete mock[selected][data.oldTitle];
                
                if (mode === 'remove') delete mock[selected][data];
                else mock[selected][data.title] = newData;

                this.setState((state,p)=>{
                    state.stateItems = mock[selected];
                    return state;
                });

                this.cursor.genie.set(mock);
            },

            handleUpdateItems(data) {
                let {selected, genie} = this.state;
                let mock = this.serialize(genie);
                    mock[selected] = data;

                this.setState({stateItems: data});
                this.cursor.genie.set(mock);
            },

            handleActions() {
                let {mode} = this.state;
                switch (mode) {
                    case units.CREATE:         return this.renderCreateActions();
                    case units.CODE:           return this.renderSaveToTreeButton();
                    case units.TABLE: default: return this.renderTableActions();
                }
            },

            renderCreateActions() {
                let {selected, codeData, counter} = this.state;
                const inputOnChange = (counter)=>{ this.setState({counter}) };

                const saveMongo = (e)=>{
                    this.handleSaveToMongo(e, selected, codeData);
                };

                return (
                    <Row padding={0} style={{justifyContent: 'flex-end'}}>
                        <Margin right={10}>
                        {/* <IconButton
                                key={'mongo'}
                                hoverSize={ 5 }
                                iconSize={units.dims.actionButtonIcon}
                                onClick={saveMongo}
                                title={seed.translate('Upload to MongoDB')}
                                icon={units.icons.mongo}
                            />*/}

                            <FileDownloader
                                key={'download'}
                                content={codeData}
                                fileName={selected}
                                fileExtension={'json'}
                            >
                                <IconButton
                                    key={'file'}
                                    hoverSize={ 5 }
                                    iconSize={units.dims.actionButtonIcon}
                                    title={seed.translate('Save to file')}
                                    icon={units.icons.save}
                                />
                            </FileDownloader>

                            <Input
                                value={counter}
                                label={null}
                                onChange={inputOnChange}
                                theme={'outlined'}
                                type={'number'}
                                style={this.styles('createActionsInput')}
                                inputStyle={this.styles('createActionsInput_input')}
                                inputProps={{
                                    max: units.maxCreate,
                                    min: units.minCreate,
                                }}
                            />

                            <IconButton 
                                key={'generate'}
                                hoverSize={ 5 }
                                iconSize={units.dims.actionButtonIcon}
                                onClick={this.handleGenerate}
                                title={seed.translate('Generate code')}
                                icon={units.icons.generate}
                            />
                        </Margin>

                    </Row>
                );
            },

            handleSaveToTree(model) {
                let {selected, genie} = this.state;
                if (!model || isEmpty(model)) return null;

                let isJSON = (model)=>{try {JSON.parse(model);} catch(e) {return false;}; return true;};

                if (typeof model === 'string' && isJSON(model)) {
                    model = JSON.parse(model);
                }

                let data = this.serialize(genie);
                data[selected] = model;

                this.cursor.genie.set(data);
                this.setState( { stateItems: {} } );
            },

            renderSaveToTreeButton() {
                let {stateItems, genie, selected, originalData, mode} = this.state;

                const handleStateItems = (stateItems) => {
                    let model = stateItems;

                    let isJSON = (model)=>{
                        try { JSON.parse(model); }
                        catch(e) { return false; };
                        return true;
                    };

                    if (typeof model === 'string' && isJSON(model)) {
                        return JSON.parse(model);
                    }

                    return model;
                };

                if (originalData[selected] && genie[selected] && Object.is(originalData[selected], genie[selected] )) return null;

                const click = (e)=>{
                    let model = handleStateItems(stateItems);
                    this.handleSaveToTree(model);
                    seed.emit('genie_updateOriginalData');
                    seed.plugins.Settings.run('SaveSettings', { dir: 'genie', fileData: genie, notify: true });
                };

                return (
                    <IconButton key={'SaveChanges'}
                                hoverSize={ 5 }
                                iconSize={units.dims.actionButtonIcon}
                                onClick={click}
                                title={seed.translate('Save Changes')}
                                icon={units.icons.save} />
                );
            },

            handleAddItem() {

                const change = ()=>{
                    let data = PopupHandler.getData();

                    this.handleUpdateTree(data, 'add');
                    PopupHandler.close();
                };

                PopupHandler.addData();

                PopupHandler.open({
                    parameters:{
                        title: seed.translate('Add new item to category'),
                        body: <CategoryItemEditor/>,
                        height: 330,
                        okButton: {
                            btnTitle: seed.translate('Add'),
                            btnFunc: change
                        }
                    }
                });
            },

            handleMoveRenameCategory() {
                const change = ()=>{
                    let {selected, genie} = this.state;
                    let mock = this.serialize(genie);
                    let data = PopupHandler.getData();

                    let mockData = mock[selected];
                    let newSelect = `${data.library}:${data.category}`;

                    if (selected !== newSelect) {
                        delete mock[selected];
                        mock[newSelect] = mockData;

                        this.cursor.genie.set(mock);
                        this.cursor.currentLibrary.set(data.library);
                        setTimeout(() => {
                            this.cursor.currentCategory.set(data.category);
                            this.cursor.selected.set(newSelect);
                        }, 200);
                    }

                    PopupHandler.close();
                };

                PopupHandler.addData();

                PopupHandler.open({
                    parameters:{
                        title: seed.translate('Rename / Move current category'),
                        body: <CategoryMoveRename/>,
                        height: 200,
                        width: 500,
                        okButton: {
                            btnTitle: seed.translate('Save'),
                            btnFunc: change
                        }
                    }
                });
            },

            renderTableActions() {
                return (
                    <React.Fragment>
                        {this.renderSaveToTreeButton()}
                        <IconButton 
                            key={'addItem'}
                            hoverSize={5}
                            iconSize={units.dims.actionButtonIcon}
                            onClick={this.handleAddItem}
                            title={seed.translate('Add Item')}
                            icon={units.icons.add}
                        />
                    </React.Fragment>
                );
            },

            renderViewButton() {
                let {mode, stateItems} = this.state;
                let showIcon = [ units.icons.table, units.icons.code, units.icons.create ][mode];
                let modeTitle = [ 'Table', 'Code', 'Create' ][mode];

                const click = (value)=>{
                    this.handleSaveToTree(stateItems);
                    this.safeState({mode: value});
                    if (value === units.CREATE) { this.handleGenerate(); }
                };

                const items = [
                    {
                        text: 'Table', value: units.TABLE, iconProps: {icon: units.icons.table},
                        onClick: ()=>{ click(units.TABLE); }
                    }, {
                        text: 'Code', value: units.CODE, iconProps: {icon: units.icons.code},
                        onClick: ()=>{ click(units.CODE); }
                    }, {
                        text: 'Create', value: units.CREATE, iconProps: {icon: units.icons.create},
                        onClick: ()=>{ click(units.CREATE); }
                    },
                ];
                let title = `${seed.translate('View Mode')}: ${seed.translate(modeTitle)}`;

                return (
                    <IconMenu
                        key={'view'}
                        iconSize={14}
                        dropDown={true}
                        icon={showIcon}
                        iconColor={units.colors.icon}
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
                    <Row color={units.backgrounds.default} style={this.styles('titleRow')}>
                        <Row padding={0} width={'50%'}>
                            <Label label={title} width={'fit-content'} />
                            <Badge size={1} count={badge} />
                        </Row>
                        <Row padding={0} width={'50%'} style={this.styles('actions')}>
                            {this.handleActions()}
                            <IconButton 
                                key={'editCategory'}
                                hoverSize={5}
                                iconSize={units.dims.actionButtonIcon}
                                onClick={this.handleMoveRenameCategory}
                                title={seed.translate('Edit Category')}
                                icon={units.icons.edit}
                            />
                            {this.renderViewButton()}
                        </Row>
                    </Row>
                );
            },

            renderBody() {
                let {mode, codeData} = this.state;
                let {items} = this.props;

                switch (mode) {
                    case units.CREATE:
                        return (<MockEditor data={codeData}/>);

                    case units.CODE:
                        return (<MockEditor data={items} cb={this.handleUpdateItems}/>);

                    case units.TABLE:
                    default:
                        return (<MockTable  data={items} cb={this.handleUpdateTree}/>);
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
                        background= { units.colors.cat }
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
                        background= { units.backgrounds.default }
                        size={6}
                    />
                );
            },

            render() {
                let {items, currentLibrary, currentCategory} = this.props;
                let {selected} = this.state;

                if (isEmpty(items) && isEmpty(currentLibrary) && isEmpty(currentCategory)) return this.addLibrary();
                if (isEmpty(items) && isEmpty(currentCategory)) return this.addCategory();
                if (isEmpty(items)) return this.addItem();

                return (
                    <Column id={'CategoryDetails'} width={units.dims.mainWidth} style={this.styles('root')}>
                        {this.renderTitle()}
                        <Column width={'100%'} height={units.dims.mainHeight} >
                            { this.renderBody() }
                        </Column>
                    </Column>
                )
            } 
        }
    }
}
