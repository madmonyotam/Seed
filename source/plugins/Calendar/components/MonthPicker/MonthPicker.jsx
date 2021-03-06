module.exports = {
    dependencies: ['Layouts.Row','Layouts.Column','Layouts.Center','Buttons.Button'],    
    get(Row, Column, Center, Button) {
        
        var core = this;
        var { React, PropTypes, ComponentMixin } = core.imports;

        const units = {
            colors: {
                text: core.theme('calendar.text'),
                textSelected: core.theme('calendar.textSelected'),
                border: core.theme('borders.default')
            }
          }

        return {
            mixins: [ ComponentMixin ],

            propsTypes: {
                currentMonth: PropTypes.number,
                shortName: PropTypes.bool,
                onSelect: PropTypes.func,
            },

            getDefaultProps(){
                return {
                    shortName: false
                };
            },
            
            getInitialState() {

                return {
                };
            },

            
            componentWillMount () {
                this.months= [
                    {
                        key: 1,
                        shortName: core.translate('jen'),
                        name: core.translate('january')
                    },
                    {
                        key: 2,
                        shortName: core.translate('feb'),
                        name: core.translate('february')
                    },
                    {
                        key: 3,
                        shortName: core.translate('mar'),
                        name: core.translate('march')
                    },
                    {
                        key: 4,
                        shortName: core.translate('apr'),
                        name: core.translate('april')
                    },
                    {
                        key: 5,
                        shortName: core.translate('may'),
                        name: core.translate('may')
                    },
                    {
                        key: 6,
                        shortName: core.translate('jun'),
                        name: core.translate('june')
                    },
                    {
                        key: 7,
                        shortName: core.translate('jul'),
                        name: core.translate('july')
                    },
                    {
                        key: 8,
                        shortName: core.translate('aug'),
                        name: core.translate('august')
                    },
                    {
                        key: 9,
                        shortName: core.translate('sep'),
                        name: core.translate('september')
                    },
                    {
                        key: 10,
                        shortName: core.translate('oct'),
                        name: core.translate('october')
                    },
                    {
                        key: 11,
                        shortName: core.translate('nov'),
                        name: core.translate('november')
                    },
                    {
                        key: 12,
                        shortName: core.translate('dec'),
                        name: core.translate('december')
                    }
                ]  
            },

            componentDidMount() {
            },

            styles(s){

                const styles = {
                    cell: {
                        border: `1px solid ${units.colors.border}`,
                        flex:1
                    },
                    button: {
                        textTransform: "uppercase",
                    },
                    row: {
                        minHeight: 50
                    }
                
                }
                
                return(styles[s]);
            },

            handleMonthSelect(event, month){
              if (this.props.onSelect) this.props.onSelect(month)
            },

            renderThreeMonth(startMonth){
                let { shortName, currentMonth } = this.props;

                let MonthsToRender = this.months.slice(startMonth,startMonth+3);
                return MonthsToRender.map((m)=>{

                    let label = shortName ? m.shortName : m.name;
                    let isCurrent = currentMonth === m.key;
                    let textColor = isCurrent ? units.colors.textSelected :  units.colors.text;;

                    return(
                        <Center key={m.key}  width={'unset'} style={this.styles('cell')}>
                            <Button style={ this.styles('button') }
                                    theme={ isCurrent ? 'primary' : 'default' }
                                    variant={ 'flat' } 
                                    round={ false } 
                                    textColor={ textColor }
                                    width={ '100%' } 
                                    height={ '100%' } 
                                    onClick={ e => { this.props.onSelect(m) } }> 

                                    { label }

                            </Button>
                        </Center>
                    )
                })
            },

            renderRowMonth(startMonth){

                return (
                    <Row key={ startMonth } height={'25%'} padding={0} style={this.styles('row')}>
                        { this.renderThreeMonth(startMonth) }
                    </Row>
                )
            },
            
            renderMonths(){
                let mapArray = [0,3,6,9];
                return mapArray.map((startMonth)=>{ return this.renderRowMonth(startMonth) })
            },

            render() {

                return (
                    <Column width={'100%'} height={'calc(100% - 50px)'}>
                        { this.renderMonths() } 
                    </Column>
                )
            } 

        }
    }
}
