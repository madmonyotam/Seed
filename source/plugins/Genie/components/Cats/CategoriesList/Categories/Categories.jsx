import { uniq, isEmpty } from 'lodash';
import { Input } from '@material-ui/core';

module.exports = {
    dependencies: [ 'Simple.NoResults', 'Genie.CategoryItem', 'Simple.Icon', 'Layouts.Row' ],
    get( NoResults, CategoryItem, Icon, Row ) {
        var seed = this;
        var { React, PropTypes, ComponentMixin, Branch } = seed.imports;

        return {
            mixins: [ ComponentMixin, Branch ],

            cursors: {
                currentCategory: ['plugins','Genie','currentCategory'],
            },

            propsTypes: {
                labels: PropTypes.array,
                currentCategory: PropTypes.string,
                currentLibrary: PropTypes.string,
                addIsOpen: PropTypes.bool,
                querry: PropTypes.string,
                closeAdd: PropTypes.func,
            },

            getDefaultProps() {
                return {
                    labels: [],
                    currentCategory: null,
                    currentLibrary: null,
                    showTitleBar: PropTypes.bool,
                    addIsOpen: false,
                    querry: '',
                    closeAdd: ()=>{},
                };
            },

            getInitialState() {
                return {
                    labels: [],
                    searchValue: '',
                    addIsOpen: false
                };
            },

            componentWillMount() {
                let { labels } = this.props;
                this.initUnits()

                if ( !labels || isEmpty(labels) ) this.setState({lables:[]});
                else this.setState({labels});
            },

            componentWillReceiveProps(nextProps) {
                let {labels, querry} = this.props;

                let noLabels = !labels || isEmpty(labels);
                let noNextLabels = !nextProps.labels || isEmpty(nextProps.labels);
                let nextLabels = noNextLabels ? nextProps.currentCategory ? [nextProps.currentCategory]: [] : nextProps.labels.concat([nextProps.currentCategory]);
                    nextLabels = uniq(nextLabels);

                if ( noLabels || noNextLabels || !this.compareLabels( labels, nextProps.labels) )
                    this.setState({labels: nextLabels});
                if (nextProps.querry !== querry)
                    this.handleSearch(nextProps.querry);
                if (nextProps.addIsOpen)
                    this.setState({addIsOpen:nextProps.addIsOpen});
            },

            initUnits(){
                this.dims = {
                    fontSize: 13,
                    iconSize: 16,
                    buttonIconSize: 27,
                    rowHeight: 40,
                };
                this.colors = {
                    text: seed.theme('texts.default'),
                };
                this.backgrounds = {
                    default: seed.theme('backgrounds.default'),
                };
                this.icons = {
                    clear: seed.icons('genie.clear')
                };
            },

            styles(propName) {
                let styles = {
                    root: {
                        display: 'flex',
                        position: 'relative',
                        flexDirection: 'column',
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                        boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 2px -1px"
                    },
                    mapWrapper: {
                        position: "relative",
                        width: "100%",
                        height: "100%",
                    },
                    input: {
                        fontSize: this.dims.fontSize,
                        marginRight: 10,
                    },
                    button: {
                        width: this.dims.buttonIconSize, 
                        height: this.dims.buttonIconSize,
                        color: this.colors.text,
                    },
                }
                return styles[propName]
            },

            compareLabels( labels1, labels2) {
                let bothExist  = labels1 && labels2;
                if ( !bothExist ) return false;

                let sameLength = labels1.length === labels2.length;
                let sameValues = labels1.sort().every(function(value, index) { return value === labels2.sort()[index]});

                return bothExist && sameLength && sameValues;
            },

            handleAdd(value) {
                let { labels } = this.state;
                let { currentLibrary } = this.props;

                if ( !labels || isEmpty(labels) ) labels = [value];
                else {
                    if(labels.includes(value)) {
                        let notify = {
                            text: seed.translate('this category name is already exist'),
                            alertKind: 'error'
                        }
                        seed.emit('notify',notify);
                        return 
                    }
                    labels.unshift(value);
                }
                    
                this.setState({labels})

                let data = this.serialize(seed.plugins.Genie.getMock());
                let indicator = `${currentLibrary}:${value}`;
                
                if ( data[indicator] ) {
                    let errorText = seed.translate('category is already exist');
                    seed.emit('notify', { text: errorText, alertKind: 'error' });
                    return null;
                }
                
                data[indicator] = {};
                seed.plugins.Genie.setMock(data);
                this.handleSelect(value);
            },

            handleRename(oldValue, value) {
                let { labels } = this.state;
                let { currentLibrary } = this.props;

                let data = this.serialize(seed.plugins.Genie.getMock());
                let indicator = `${currentLibrary}:${value}`;
                let oldIndicator = `${currentLibrary}:${oldValue}`;
                
                if ( data[indicator] ) {
                    let errorText = seed.translate('category is already exist');
                    seed.emit('notify', { text: errorText, alertKind: 'error' });
                    return null;
                }

                data[indicator] = data[oldIndicator];
                delete data[oldIndicator]; 
                seed.plugins.Genie.setMock(data);                

                let newLabels = this.serialize( labels );
                let place = newLabels.indexOf(oldValue);
                newLabels[place] = value;
                this.setState({ labels: newLabels });
                this.handleSelect( value );
            },

            handleRemove(value) { 
                let { currentLibrary } = this.props;
                let { labels } = this.state;
                let data = this.serialize(seed.plugins.Genie.getMock());
                let indicator = `${currentLibrary}:${value}`;
                
                let text = seed.translate(`Are you sure that do you want to remove the "${value}" category from "${currentLibrary}" library`);
                let head = seed.translate(`Remove "${value}" category`);
                
                seed.plugins.popovers.Caution( text, head,
                    ( sure )=>{
                        if ( sure ) {
                            
                            delete data[indicator];
                            seed.plugins.Genie.setMock(data);

                            let newLabels = [...labels];
                            newLabels.splice( newLabels.indexOf(value), 1);
                            this.setState({ labels: newLabels });
                            this.handleSelect( newLabels[0] );
                        }
                    }
                )
            },

            handleSearch(value) {
                this.safeState({searchValue: value});
            },

            handleSelect(value) {
                seed.emit('MenuTitleBar_closeSearch');

                this.cursor.currentCategory.set(value)
            },

            handleMapLibs(){
                let { labels, searchValue } = this.state;

                if ( !labels || isEmpty(labels) ) return this.renderNoResults();
                
                let showLabels = labels.filter( t => t.toLowerCase().includes( searchValue.toLowerCase() ) );
                    showLabels = showLabels.sort();

                return showLabels.map( this.renderLine );
            },

            handleCloseAdd() {
                if (this.props.closeAdd)
                    this.props.closeAdd();
                this.setState({addIsOpen:false})
            },

            handleAddKeyDown( e ) {
                let addValue = e.target.value;

                switch (e.keyCode) {
                    case 27: // ESC
                        this.safeState({addValue: '' });
                        this.handleCloseAdd();
                        break;
                    case 13: // Enter
                        if (addValue.trim().length) {
                            this.handleAdd(addValue);
                            this.handleCloseAdd();
                        }
                        break;
                }
                return;
            },

            add(){
                this.setState({addIsOpen:true});
            },

            renderNoResults() {
                return (
                    <NoResults
                        onClick = { this.add }
                        text={ '' }
                        icon={ seed.icons('general.add') }
                        color={ seed.theme('texts.default') }
                        background= { seed.theme('Genie.cat_bg') }
                        size={6}
                    />
                );
            },

            renderLine( label ){
                let { currentCategory } = this.props;
                let isSelected = label === currentCategory;

                return (
                    <CategoryItem
                        key={ label }
                        isSelected={ isSelected }
                        selectCB={ this.handleSelect }
                        removeCB={ this.handleRemove }
                        renameCB={ this.handleRename }
                        itemValue={ label }
                        rowHeight={this.dims.rowHeight}
                        style={ this.styles('editText') }
                    />
                )
            },

            renderAdd() {
                let {addIsOpen} = this.state;
                if (!addIsOpen) return null;

                return (
                    <Row height={this.dims.rowHeight} color={this.backgrounds.default} boxShadow={true}>
                        <Input
                            style={ this.styles('input')}
                            autoFocus={ true }
                            onKeyDown={ this.handleAddKeyDown }
                            placeholder={ seed.translate('Add Category') }
                        />
                        <Icon 
                            color={this.colors.text}
                            icon={this.icons.clear}
                            size={this.dims.iconSize}
                            onClick={this.handleCloseAdd}
                            title={seed.translate('Clear')}
                        />
                    </Row>
                );
            },

            render() {
                let {currentLibrary} = this.props;
                if(!currentLibrary) return null;

                return (
                    <div id={'Categories.root'} style={ this.styles('root') }>
                        {this.renderAdd()}
                        <div style={ this.styles('mapWrapper')}>
                            { this.handleMapLibs() }
                        </div>
                    </div>
                )
            }
        }
    }
}
