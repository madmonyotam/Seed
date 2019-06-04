import { uniq, isEmpty } from 'lodash';

module.exports = {
dependencies: ['Simple.NoResults', 'Genie.LibraryItem', 'Inputs.IconButton', 'Layouts.Row', 'Inputs.Input'],
get(NoResults, LibraryItem, IconButton, Row, Input) {
    var seed = this;
    var { React, PropTypes, ComponentMixin, Branch } = seed.imports;

    
    const units = {
        colors: {
            text: seed.theme('texts.default')
        },
        backgrounds: {
            default: seed.theme('backgrounds.default')
        },
        icons: {
            clear: seed.icons('genie.clear')
        },
    };

    return {
        mixins: [ ComponentMixin, Branch ],

        cursors: {
            currentLibrary: ['plugins','Genie','currentLibrary'],
            currentCategory: ['plugins','Genie','currentCategory'],
            genie: ['plugins','access','genie']
        },

        propsTypes: {
            addIsOpen: PropTypes.bool,
            searchValue: PropTypes.string,
            closeAdd: PropTypes.func,
        },

        getDefaultProps() {
            return {
                addIsOpen: false,
                searchValue: '',
                closeAdd: ()=>{},
            };
        },

        getInitialState() {
            return {
                labels: [],
                addIsOpen: false
            };
        },

        componentDidMount() {
            this.setState({labels: this.getLibrariesLabels()});
        },

        componentWillReceiveProps(nextProps) {
            if (!seed.isUndefined(nextProps.addIsOpen)) this.setState({addIsOpen: nextProps.addIsOpen});
        },

        styles(s) {
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
                }
            }
            
            return(styles[s]);
        },
        

        getLibrariesLabels() {
            let { genie } = this.state;

            let keys = Object.keys(genie);
            if (isEmpty(keys)) return [];

            let libraries = keys.map( k => {
                let [lib, cat] = k.split(':');
                return lib;
            });

            libraries = uniq(libraries);
            libraries = libraries.filter(Boolean);
            return libraries;
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

        handleLibraryRemove( value ) {
            const getOtherLibName = ( libs, label ) => {
                for (let i = 0; i < libs.length; i++) {
                    const libLabel = libs[i];
                    if ( libLabel !== label ) return libLabel;
                }
                return '';
            };

            let { genie, labels } = this.state;

            let newLabels = ComponentMixin.serialize(labels);
                newLabels.splice( newLabels.indexOf(value), 1);

            let data = ComponentMixin.serialize(genie);
            let dataEntries = Object.entries( data ).sort();
            let libraries = uniq( dataEntries.map( e => e[0].split(':')[0] ) );

            let newLabel = getOtherLibName( libraries, value );

            for (let i = 0; i < dataEntries.length; i++) {
                const [indicator, values] = dataEntries[i];
                const entryLib = indicator.split(':')[0];

                data[indicator] = this.updateDynamicLists( values, value, newLabel );

                if ( entryLib === value ) delete data[indicator];
            }

            if ( !data || isEmpty(data) ) data = {};

            this.setState((state, props)=>{
                this.cursor.genie.set(data);
                return {
                    labels: newLabels,
                }
            });

            if (newLabels && newLabels.length) this.handleSelect( newLabels[0] );
            else this.handleSelect('');
        },

        handleAdd(value) {
            let { labels } = this.state;

            if ( !labels || isEmpty(labels) ) {
                labels = [value];
            }
            else if(labels.includes(value)) {
                let notify = {
                    text: seed.translate('this library name is already exist'),
                    alertKind: 'error'
                }
                seed.emit('notify',notify);
                return 
            } else {
                labels.unshift(value);
            }

            this.safeState({labels});
            this.handleSelect(value);
        },

        handleRename(oldValue, value) {
            let { labels, genie } = this.state;
            let newLabels = ComponentMixin.serialize( labels );
                newLabels[newLabels.indexOf(oldValue)] = value;

            let data = {...genie};
            let dataEntries = Object.entries( data ).sort();

            for (let i = 0; i < dataEntries.length; i++) {
                const [indicator, values] = dataEntries[i];
                const [entryLib, entryCat] = indicator.split(':');
                const newIndicator = `${value}:${entryCat}`;

                data[indicator] = this.updateDynamicLists( values, oldValue, value );

                if ( entryLib === oldValue ) {
                    delete data[indicator];
                    data[newIndicator] = values;
                }
            }

            this.setState((s,p)=>{
                this.cursor.genie.set(data);
                return { labels: newLabels }
            });

            this.handleSelect( value );
        },

        handleRemove(value) { 
            let text = seed.translate('Do you want to remove the library', 'Do you want to remove the ${libraryName} library', {libraryName: value});
            let head = seed.translate('Remove Library');

            seed.plugins.popovers.Caution( text, head,
                ( sure )=>{ return (sure) ? this.handleLibraryRemove(value): null; }
            )
        },

        handleSelect(value) {
            let { genie } = this.state;
            seed.emit('MenuTitleBar_closeSearch');
            this.cursor.currentLibrary.set(value);

            let keys = Object.keys(genie);

            for (let i = 0; i < keys.length; i++) {
                if(keys[i].indexOf(value)>-1){
                    let cat = keys[i].split(':')[1];
                    this.cursor.currentCategory.set(cat);
                    break
                }
            }

        },

        handleMapLibs(){
            let {labels} = this.state;
            let {searchValue} = this.props;

            labels = labels.filter(Boolean);

            if ( !labels || isEmpty(labels) ) return this.renderNoResults();

            let showLabels = labels.filter( t => t.toLowerCase().includes( searchValue.toLowerCase() ) );
                showLabels = showLabels.sort();

            return showLabels.map( this.renderLine );
        },

        handleCloseAdd() {
            let { closeAdd } = this.props;
            if (closeAdd) closeAdd();
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
                    icon={ seed.icons('genie.add') }
                    color={ seed.theme('texts.default') }
                    background= { seed.theme('Genie.lib_bg') }
                    size={6}
                />
            );
        },

        renderLine( label ){
            let { currentLibrary } = this.state;
            let isSelected = label === currentLibrary;

            return (
                <LibraryItem
                    key={ label }
                    isSelected={ isSelected }
                    selectCB={ this.handleSelect }
                    removeCB={ this.handleRemove }
                    renameCB={ this.handleRename }
                    itemValue={ label }
                    rowHeight={ 40 }
                />
            )
        },

        renderAdd() {
            let {addIsOpen} = this.state;
            if (!addIsOpen) return null;

            let inputStyle = { height:28, paddingLeft: 2 }
            let rowStyle = { paddingRight: 5 }

            return (
                <Row height={ 40 } color={units.backgrounds.default} boxShadow={true} style={rowStyle} >
                    <Input
                        label={''}
                        inputStyle={inputStyle}
                        autoFocus={ true }
                        onKeyDown={ this.handleAddKeyDown }
                        placeholder={ seed.translate('Add Library') }
                    />
                    <IconButton    
                        onClick={ this.handleCloseAdd }
                        icon={units.icons.clear} 
                        hoverSize= { 5 }
                        iconSize= { 16 }
                        background= 'transparent' />
                </Row>
            );
        },

        render() {
            return (
                <div id={'Libraries'} style={ this.styles('root') }>
                    {this.renderAdd()}
                    <div style={ this.styles('mapWrapper') }>
                        { this.handleMapLibs() }
                    </div>
                </div>
            )
        }
    }
}
}
