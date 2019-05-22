import { uniq, isEmpty } from 'lodash';
import { Input } from '@material-ui/core';

module.exports = {
dependencies: ['Simple.NoResults', 'Genie.LibraryItem', 'Simple.Icon', 'Layouts.Row'],
get(NoResults, LibraryItem, Icon, Row) {
    var core = this;
    var { React, PropTypes, ComponentMixin, Branch } = core.imports;

    return {
        mixins: [ ComponentMixin, Branch ],

        cursors: {
            currentLibrary: ['plugins','Genie','currentLibrary'],
            currentCategory: ['plugins','Genie','currentCategory'],
        },

        propsTypes: {
            labels: PropTypes.array,
            currentLibrary: PropTypes.string,
            currentCategory: PropTypes.string,
            addIsOpen: PropTypes.bool,
            querry: PropTypes.array,
            closeAdd: PropTypes.func,
        },

        getDefaultProps() {
            return {
                labels: [],
                currentLibrary: '',
                currentCategory: '',
                addIsOpen: false,
                querry: undefined,
                closeAdd: ()=>{},
            };
        },

        getInitialState() {
            return {
                labels: [],
                removed: [],
                search: undefined,
                addIsOpen: false
            };
        },

        componentWillMount() {
            let { labels } = this.props;
            this.initUnits()

            if (labels && !this.compareArrays( labels, this.state.labels))
                this.setState({labels: this.state.labels.concat(labels)} );
        },

        componentWillReceiveProps(nextProps) {
            let noLabels = !this.props.labels || isEmpty(this.props.labels);
            let hasNextLabels = nextProps.labels && !isEmpty(nextProps.labels);
            let nextLabels = [];
            
            if (hasNextLabels) {
                nextLabels = nextProps.labels.concat(nextProps.labels);
                nextLabels = uniq(nextLabels);
            }
            if (nextProps.currentLibrary) {
                nextLabels = this.state.labels.concat([nextProps.currentLibrary]);
                nextLabels = uniq(nextLabels);
            }

            let labels = this.state.labels;

            if ( noLabels || !hasNextLabels || !this.compareLabels( this.props.labels, nextProps.labels) ) {
                labels = this.state.labels.concat(nextLabels);
                labels = uniq(labels);
            }

            if (this.state.removed && this.state.removed.length) {
                labels = labels.filter(lab => !this.state.removed.includes(lab) );
            }
            this.setState({labels});

            if (nextProps.querry !== this.props.querry)
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
                text: core.theme('texts.default')
            };
            this.backgrounds = {
                default: core.theme('backgrounds.default')
            };
            this.icons = {
                clear: core.icons('genie.clear')
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
                    overflow: 'hidden'
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

        compareArrays( first, second ) {
            if (!first || !second) return false;
            if (first.length !== second.length) return false;
            for (let i = 0; i < first.length; i++) {
                let f = first[i];
                if (f instanceof Array && second[i] instanceof Array) {
                    if (!this.compareArrays(f, second[i])) return false;
                } else if ( f !== second[i]) return false;
            }
            return true;
        },

        handleLibraryOpen( library ) {
            this.cursor.currentLibrary.set(library);
        },

        getOtherLibName( libs, label ) {
            for (let i = 0; i < libs.length; i++) {
                const libLabel = libs[i];
                if ( libLabel !== label ) return libLabel;
            }
            return 'noLibrary';
        },

        updateDynamicLists( values, oldLabel, newLabel) {
            let newValues = {...values};
            let keys = Object.keys(values);
            for (let i = 0; i < keys.length; i++) {
                const k = keys[i];
                const vKey = values[k];

                if ( vKey.type !== 'dynamicList' ) continue;

                let [lib, cat] = vKey.value.split(':');

                let sameLib = lib === oldLabel;

                if ( sameLib ) {
                    let indicator = `${newLabel}:${cat}`
                    newValues[k].value = indicator;
                }
            }
            return newValues;
        },

        handleLibraryRename( oldLabel, newLabel) {
            let data = ComponentMixin.serialize( seed.plugins.Genie.getMock() );
            let dataEntries = Object.entries( data ).sort();

            for (let i = 0; i < dataEntries.length; i++) {
                const [indicator, values] = dataEntries[i];
                const [entryLib, entryCat] = indicator.split(':');
                const newIndicator = `${newLabel}:${entryCat}`;

                data[indicator] = this.updateDynamicLists( values, oldLabel, newLabel );

                if ( entryLib === oldLabel ) {
                    delete data[indicator];
                    data[newIndicator] = values;
                }
            }
            seed.plugins.Genie.setMock(data);
        },

        handleLibraryRemove( label ) {
            let data = ComponentMixin.serialize( seed.plugins.Genie.getMock() );
            let dataEntries = Object.entries( data ).sort();
            let libraries = uniq( dataEntries.map( e => e[0].split(':')[0] ) );

            let newLabel = this.getOtherLibName( libraries, label );

            for (let i = 0; i < dataEntries.length; i++) {
                const [indicator, values] = dataEntries[i];
                const entryLib = indicator.split(':')[0];

                data[indicator] = this.updateDynamicLists( values, label, newLabel );

                if ( entryLib === label ) delete data[indicator];
            }
            if ( !data || isEmpty(data) ) data = {};
            seed.plugins.Genie.setMock(data);
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

            if ( !labels || isEmpty(labels) ) labels = [value];
            else {
                if(labels.includes(value)) {
                    let notify = {
                        text: core.translate('this library name is already exist'),
                        alertKind: 'error'
                    }
                    core.emit('notify',notify);
                    return 
                }
                labels.unshift(value);
            } 

            this.safeState({labels});
            this.handleSelect(value);
        },

        handleRename(oldValue, value) {
            let { labels } = this.state;
            let newLabels = this.serialize( labels );
                newLabels[newLabels.indexOf(oldValue)] = value;

            this.setState({ labels: newLabels });
            this.handleLibraryRename(oldValue, value);
            this.handleSelect( value );
        },

        handleRemove(value) { 
            core.plugins.popovers.Caution(
                core.translate('Do you want to archive the library', 'Do you want to archive the ${libraryName} library', {libraryName: value}),
                core.translate('Remove Library'),
                ( sure )=>{
                    if ( sure ) {
                        let { labels } = this.state;
                        let newLabels = [...labels];
                            newLabels.splice( newLabels.indexOf(value), 1);

                        this.handleLibraryRemove( value );
                        let removed = [...this.state.removed, value];
                        this.setState({ labels: newLabels, removed: removed });
                        if (newLabels && newLabels.length) this.handleSelect( newLabels[0] );
                        else this.handleSelect('');
                    }
                }
            )
        },

        handleSearch(querry) {
            this.safeState({search: querry});
        },

        handleSelect(value) {
            this.handleLibraryOpen( value );
            core.emit('MenuTitleBar_closeSearch');
        },

        handleMapLibs(){
            let { labels, search } = this.state;

            labels = labels.filter(Boolean);

            if ( !labels || isEmpty(labels) ) return this.renderNoResults();

            let showLabels = labels;
            if (search && search.length) {
                showLabels = labels.filter( label => {
                    let list = [];
                    search.forEach( s => {
                        list.push(label.includes(s));
                    });
                    return list.includes(true);
                });
            }
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
                    if (addValue.length) {
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
                    text={ core.translate('add your first library') }
                    icon={ null }
                    color={ core.theme('texts.default') }
                    background= { core.theme('Genie.lib_bg') }
                    size={6}
                />
            );
        },

        renderLine( label ){
            let { currentLibrary } = this.props;
            let isSelected = label === currentLibrary;

            return (
                <LibraryItem
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
                        fullWidth={ true }
                        autoFocus={ true }
                        onKeyDown={ this.handleAddKeyDown }
                        placeholder={ core.translate('Add Library') }
                    />
                    <Icon
                        size={ this.dims.iconSize }
                        onClick={ this.handleCloseAdd }
                        title={ core.translate('Clear') }
                        icon={this.icons.clear}
                    />
                </Row>
            );
        },

        render() {
            return (
                <div id={'Libraries'} style={ this.styles('root') }>
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
