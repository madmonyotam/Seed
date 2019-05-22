module.exports = {
    dependencies: ['Layouts.Column'],    
    get(Column) {
        
        var core = this;
        var { React, PropTypes, ComponentMixin } = core.imports;

        const units = {}

        return {
            mixins: [ ComponentMixin ],

            propsTypes: {
                text: PropTypes.string,
            },

            getDefaultProps(){
                return {
                    text: 'my first  calendar',
                };
            },
            
            getInitialState() {
                return {
                    picker: 'day'
                };
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
                    root: {
                       border: '1px solid black'
                    },
                
                }
                
                return(styles[s]);
            },

            renderMainCont(){
                let { picker } = this.state

                // switch (picker) {
                //     case 'month':
                //         return this.renderMonthPicker()
                //     case 'day':
                //         return this.renderWeeks()

                // }
            },

            render() {

                return (
                    <Column boxShadow={true} >
                        {/* { this.renderMonthYearsBar() }
                        { this.renderDaysBar() }
                        { this.renderMainCont() } */}

                    </Column>
                )
            } 

        }
    }
}
