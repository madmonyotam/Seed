module.exports = {
    dependencies: ['Layouts.Row', 'Layouts.Center', 'Simple.Label'],    
    get(Row, Center, Label) {
        
        var core = this;
        var { React, PropTypes, ComponentMixin } = core.imports;

        const units = {}

        return {
            mixins: [ ComponentMixin ],

            propsTypes: {
                firstDayInWeek: PropTypes.number,
                shortName: PropTypes.bool,
            },

            getDefaultProps(){
                return {
                    firstDayInWeek: 1,
                    shortName: true
                };
            },
            
            getInitialState() {
                let days = this.getInitDays();

                return {
                    days:days
                };
            },

            getInitDays() {
                let { firstDayInWeek } = this.props;
                let days = [
                    {
                        key: 1,
                        shortName: core.translate('sun'),
                        name: core.translate('sunday')
                    },
                    {
                        key: 2,
                        shortName: core.translate('mon'),
                        name: core.translate('monday')
                    },
                    {
                        key: 3,
                        shortName: core.translate('tue'),
                        name: core.translate('tuesday')
                    },
                    {
                        key: 4,
                        shortName: core.translate('wed'),
                        name: core.translate('wednesday')
                    },
                    {
                        key: 5,
                        shortName: core.translate('thu'),
                        name: core.translate('thursday')
                    },
                    {
                        key: 6,
                        shortName: core.translate('fri'),
                        name: core.translate('friday')
                    },
                    {
                        key: 7,
                        shortName: core.translate('sat'),
                        name: core.translate('saturday')
                    }
                ]

                if(firstDayInWeek > 7 || firstDayInWeek < 1) firstDayInWeek=1;
                while (firstDayInWeek!==days[0].key) {
                    let day = days.shift();
                    days.push(day);
                }
                
                return days;
            },

            componentWillMount () {

            },

            componentDidMount() {
            },

            componentWillReceiveProps (nextProps) {
            },

            componentWillUnmount () {
                
            },

            styles(s){

                const styles = {
                    row: {
                        justifyContent: 'space-between',
                        paddingRight: 0
                   },

                   label:{
                        textAlign: 'center', 
                        padding: 5
                   }
                
                }
                
                return(styles[s]);
            },

            renderDayLabel(day){
                let { shortName } = this.props;
                let label = shortName ? day.shortName : day.name;

                return (

                  <Center  key={day.key} width={"calc(100%/7)"} >
                    <Label label={label} width={ '100%' } height={ '100%' } style={this.styles('label')} />
                  </Center>
                ) 
            },
            
            renderDays(){
                let { days } = this.state;

                return days.map(this.renderDayLabel)
            },

            render() {

                return (
                    <Row style={this.styles('row')} padding={ '15px 0' } >
                        { this.renderDays() }
                    </Row>
                )
            } 

        }
    }
}
