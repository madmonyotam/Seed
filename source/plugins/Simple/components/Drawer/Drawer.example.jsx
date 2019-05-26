
module.exports = {
    dependencies: ['Layouts.Row','Simple.Label', 'Examples.ExampleHelper',
                   'Examples.SimpleExample','Simple.Drawer','Simple.Icon', 'Inputs.Button'],
    get(Row, Label, ExampleHelper, SimpleExample, Drawer, Icon, Button) {

        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            propScheme(){          
                return {
                    initialSize:{ type: 'number', group: 'initial' },
                    size: { type: 'number', group: 'initial' },
                    offset: { type: 'number' },
                    openFrom: { type: 'select', options: [ 'top', 'bottom', 'left', 'right' ] },
                    transition: { type: 'number' },
                    isLocked: { type: 'boolean' },
                };       
            },

            getInitialState() {
                let defaultProps = Drawer.getDefaultProps();
                return {
                    open: false,
                    ...defaultProps
                } 
            },

            componentWillMount () {
                this.initUnits();
            },

            initUnits(){
                this.icons={
                    info: core.icons('general.info'),
                    folder:core.icons('general.folder'),  
                    menu: core.icons('general.menu'),
                    more: core.icons('general.more'),
                }
            },

            styles(s){

                const styles = {

                    row: {
                        justifyContent: 'center',
                        zIndex:10
                    },

                    icon: {
                        marginRight: 10
                    }
                }

                return(styles[s]);
            },

            getCode(){
                let { initialSize, size, offset, openFrom, transition, isLocked } = this.state;

                return [
                    `<Drawer initialSize={${initialSize}}`,
                    `    size={${size}}`,
                    `    offset={${offset}}`,
                    `    openFrom={${openFrom}}`,
                    `    transition={${transition}}`,
                    // `    isLocked={${isLocked}}`,
                    `/>`,
                ].join('\n')
            },

            toggleDrawer(){
                let { open } = this.state;  

                if(open)  core.emit('closeSimpleDrawer',{id:'simple'});
                else      core.emit('openSimpleDrawer',{id:'simple'});
          
                this.setState({open:!open})
            },

            renderRows(){
                let rows = [
                    {
                        icon: this.icons.info,
                        label: core.translate('I am a drawer')
                    },
                    {
                        icon: this.icons.menu,
                        label: core.translate('find out more')
                    },
                    {
                        icon: this.icons.folder,
                        label: core.translate('ok then - change offset')
                    },
                    {
                        icon: this.icons.more,
                        label: core.translate('now open me from the left')
                    }
                ]

                return rows.map((row, key)=>{
                    return(
                        <Row key={key} height={50} boxShadow={true}>
                            <Icon icon={row.icon} size={18} style={this.styles('icon')}/>
                            <Label label={row.label}/>
                        </Row>
                    )
                })
            },

            render() {
                let { initialSize, size, offset, openFrom, transition, isLocked, open } = this.state;
                size = ExampleHelper.ifNumber_Convert(size);
                offset = ExampleHelper.ifNumber_Convert(offset);
                initialSize = ExampleHelper.ifNumber_Convert(initialSize);
                let label = open ? core.translate('CLOSE') : core.translate('OPEN');

                return (
                    <SimpleExample context={this} code={ this.getCode() } scheme={ this.propScheme() } >
                        <Button theme={ 'primary' } variant={ 'raised' }  onClick={this.toggleDrawer} >
                            { label } 
                        </Button>
                        <Drawer initialSize={initialSize}
                                size={size}
                                offset={offset}
                                openFrom={openFrom}
                                transition={transition}
                                // isLocked={isLocked}
                                drawerId={'simple'}>

                                { this.renderRows() }

                        </Drawer>
                    </SimpleExample>
                )
            }

        }
    }
}
