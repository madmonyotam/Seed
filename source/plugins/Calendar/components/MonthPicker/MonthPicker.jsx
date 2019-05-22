module.exports = {
    dependencies: ['Layouts.Row','Simple.Label','Layouts.Column','Layouts.Center'],    
    get(Row, Label, Column, Center) {
        
        var core = this;
        var { React, PropTypes, ComponentMixin } = core.imports;

        const units = {
            background: core.theme('buttons.primary'),
            border: core.theme('borders.default'),
        }

        return {
            mixins: [ ComponentMixin ],

            propsTypes: {
                correntMonth: PropTypes.number,
                shortName: PropTypes.bool,
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

            componentDidMount() {
            },

            styles(s){

                const styles = {
                    cell: {
                        border: `1px solid ${units.border}`,
                        flex:1
                    },
                    row: {
                        minHeight: 50
                    }
                
                }
                
                return(styles[s]);
            },

            renderThreeMonth(startMonth){
                let { shortName } = this.props;

                let Months= [
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
                        shortName: core.translate('Apr'),
                        name: core.translate('April')
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

                let MonthsToRender = Months.slice(startMonth,startMonth+3);
                return MonthsToRender.map((m)=>{

                    let label = shortName ? m.shortName : m.name;

                    return(
                        <Center key={m.key}  width={'unset'} color={units.background} style={this.styles('cell')}>
                            <Label label={label} width={'fit-content'} height={'fit-content'}/>
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
