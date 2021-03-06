import ReactTable from "react-table";
import './cssfix.scss'; // import 'react-table/react-table.css';
import moment from 'moment';
import {isEmpty} from 'lodash';

module.exports = {
    name: 'MockTable',
    dependencies: [ 
        'Layouts.Row', 'Simple.Label', 'Popovers.PopupHandler', 'Genie.CategoryItemEditor',
        'Buttons.IconButton', 'Layouts.Center', 'Simple.Chip', 'Decorators.Tooltip', 'Layouts.Column',
        'Attributers.Margin'
    ],
    get(
        Row, Label, PopupHandler, CategoryItemEditor,
        IconButton, Center, Chip, Tooltip, Column,
        Margin
    ) {
        
        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        const units = {
            dims: {
                actionButtonIcon: 16,
                tableCornerRadius: 2,
                actionWidth: 55,
                regularColumnWidth: 175,
                defaultPageSize: 10,
            },
            dateFormat: core.general('dateFormatFull'),
            icons: {
                edit: core.icons('genie.edit'),
                remove: core.icons('genie.remove'),
            },
            colors: {
                border: core.theme('borders.default'),
                text: core.theme('texts.default'),
                whiteText: core.theme('texts.alternate'),
                disabled: core.theme('texts.disabled'),
            },
            backgrounds: {
                white: core.theme('backgrounds.default'),
                title: core.theme('genie.title_bg'),
            },
        };

        return {
            mixins: [ ComponentMixin ],

            propsTypes: {
                data: PropTypes.object,
                cb: PropTypes.func,
            },

            getDefaultProps(){
                return {
                    data: {},
                    cb: ()=>{},
                };
            },
            
            getInitialState() {
                return {};
            },

            componentDidMount() {
            },

            componentWillUnmount() {
            },

            componentWillReceiveProps (nextProps) {
            },

            styles(s){
                const styles = {
                    root: {
                    },
                    valueString: {
                    },
                    arrayCellCenter: {
                        minHeight: 20,
                        minWidth: 'fit-content',
                        maxWidth: 100,
                        background: units.backgrounds.white,
                    },
                    arrayCell: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: 20,
                        minWidth: 'fit-content',
                        maxWidth: 100,
                        background: units.backgrounds.white,
                        border: `1px solid ${units.colors.border}`,
                        borderRadius: 5,
                        padding: '0 7px',
                        margin: '0 2px 2px 0',
                    },
                    actionButton: {
                        color: units.colors.text,
                        margin: '0 7px'
                    },
                }
                return(styles[s]);
            },

            formatData() {
                let data = this.props.data;
                let newData = [];

                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const dataKey = data[key];
                        let dataItem = {title: key}
                        for (const k in dataKey) {
                            if (dataKey.hasOwnProperty(k)) {
                                const newCol = dataKey[k];
                                dataItem[k] = newCol;
                            }
                        }
                        newData.push(dataItem);
                    }
                }
                return newData;
            },

            handleColumns() {
                return [
                    { Header: core.translate('Title'), accessor: 'title',                  Cell: cell => { return this.renderNonValue(cell.value); }   },
                    { Header: core.translate("Type"),  accessor: 'type',    maxWidth: 300, Cell: cell => { return this.renderNonValue(cell.value); }   },
                    { Header: core.translate("Value"), accessor: 'value',   maxWidth: 400, Cell: cell => { return this.renderValue(cell.value); }      },
                    { Header: core.translate("Count"), accessor: 'count',   maxWidth: 100, Cell: cell => { return this.renderNonValue(cell.value); }   },
                    { Header: "",                      accessor: 'actions', maxWidth: 100, Cell: cell => { return this.renderActions(cell.original); } }
                ];
            },

            renderNonValue(cellContent) {
                let content = cellContent && cellContent.length ? <Label label={cellContent} /> : <div />;
                return this.renderCell(content);
            },

            renderValue(value) {
                let valueRowStyle = this.styles('valueString');
                let component = <div />;

                const dateRender = (value) => {
                    return (
                        <React.Fragment>
                            <Row padding={0} style={{justifyContent: "space-between",}}>
                                <Label label={core.translate('From :')}/>
                                <Label label={moment(value.from).format(units.dateFormat)}/>
                            </Row>
                            <div style={{minWidth:40}} />
                            <Row padding={0} style={{justifyContent: "space-between",}}>
                                <Label label={core.translate('To :')}/>
                                <Label label={moment(value.to).format(units.dateFormat)}/>
                            </Row>
                        </React.Fragment>
                    );
                };

                const arrayRender = (value) => {
                    let len = value.length;
                    const template = (tValue, key)=>{
                        return (
                            <Row key={key} height={25}>
                                <Label label={tValue} tooltip={tValue}/>
                            </Row>
                        );
                    }
                    const tooltipContent = ()=>{
                        return (
                            <Column width={150} style={{maxHeight: 300, overflow: 'auto'}}>
                                { value.map(template) }
                            </Column>
                        )
                    }

                    if (len == 1) {
                        return (<Chip text={value[0]} variant={'outlined'}/>);
                    } else {
                        return (
                            <Center>
                                <Margin left={3}>
                                    <Chip text={value[0]} variant={'outlined'}/>
                                    <Tooltip position={'bottom-right'} theme={'light'} offsetX={-2} offsetY={-27} content={tooltipContent()}>
                                        <Chip text={`+${value.length}`} variant={'outlined'} />
                                    </Tooltip>
                                </Margin>
                            </Center>
                        );
                    }
                };

                const stringRender = (value)=>{
                    return (
                        <Label label={value} />
                    );
                };

                if (value && value.from) {
                    component = dateRender(value);

                } else if (value && value.length) {
                    if (value instanceof Array) {
                        let arrayStyleFix = {
                            overflow: 'hidden auto',
                            flexWrap: 'wrap',
                            maxHeight: 40,
                            minHeight: 40,
                            height: 'unset',
                            position: 'absolute',
                            top: -7,
                        }

                        valueRowStyle = {...valueRowStyle, ...arrayStyleFix}

                        component = arrayRender(value);
                        return (
                            <div style={{position:'relative', width: '100%', height: '100%'}} >
                                {this.renderCell(component, valueRowStyle)}
                            </div>
                        )
                    } else {
                        if (!isNaN(value)) valueRowStyle.justifyContent = 'center';
                        component = stringRender(value);
                    }
                }

                return this.renderCell(component, valueRowStyle);
            },

            renderEditButton(rowData) {
                const click = event => { 

                    PopupHandler.addData({data: rowData})

                    const change = ()=>{
                        let data = PopupHandler.getData();
                        this.props.cb(data, 'edit');
                        PopupHandler.close();
                    };
    
                    PopupHandler.open({
                        parameters: {
                            title: core.translate('Edit category item'),
                            body: <CategoryItemEditor mode={'edit'}/>,
                            height: 330,
                            okButton: {
                                btnTitle: core.translate('Save'),
                                btnFunc: change
                           }
                        }
                    });
                };

                return (
                    <IconButton    
                        onClick={ click }
                        icon={ units.icons.edit } 
                        iconSize= { units.dims.actionButtonIcon }
                        background= 'transparent' />
                );
            },

            renderRemoveButton(title) {

                const handleRemove = ()=>{
                    core.plugins.Popovers.Caution(
                        core.translate('Do you want to remove this item'),
                        core.translate('Remove Category Item'),
                        ( sure )=>{
                            if (sure) this.props.cb(title, 'remove');
                        }
                    )
                };

                return(
                    <IconButton    
                        onClick={ handleRemove }
                        icon={ units.icons.remove } 
                        iconSize= { units.dims.actionButtonIcon }
                        background= 'transparent' />
                );
            },

            renderActions(rowData) {
                let component = <div />;
                if (rowData && !isEmpty(rowData)) {
                    let {title} = rowData;
                    component = (
                        <React.Fragment>
                            {this.renderEditButton(rowData)}
                            {this.renderRemoveButton(title)}
                        </React.Fragment>
                    );
                }
                return this.renderCell(component, {justifyContent: "space-around"});
            },

            renderCell(content, style={}) {
                return (
                    <Row padding={'0 10px'} height={35} style={style} >
                        {content}
                    </Row>
                );
            },

            render() {
                let data = this.formatData();
                let dataLength = data && data.length;

                if (!dataLength) return <div/>;

                return (
                    <ReactTable 
                        data={data}
                        columns={this.handleColumns()}
                        minRows={dataLength}
                        resizable={false}
                        pageSize={dataLength}
                        showPagination={false}
                        showPageSizeOptions={false}
                        noDataText={core.translate('No Data')}
                        className="-highlight -striped"
                    />
                );
            },
        }
    }
}
