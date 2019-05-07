import { debounce } from 'lodash';

module.exports = {
    dependencies: [],
    get() {
        
        var core = this;

        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            propsTypes: {
                onChange: PropTypes.func.isRequired,
                checked: PropTypes.bool,
                size: PropTypes.number,
                backgroundOff: PropTypes.string,
                backgroundOn: PropTypes.string,
                circleColorOff: PropTypes.string,
                circleColorOn: PropTypes.string,
            },

            getDefaultProps(){
                return {
                    checked: false,
                    size: 2,
                    backgroundOff: '#D8D8D8',
                    backgroundOn: '#adcaf5',
                    circleColorOff: '#F1F1F1',
                    circleColorOn: '#0288d1'
                };
            },
            
            getInitialState() {
                return {
                    active: this.props.checked
                };
            },

            componentWillReceiveProps (nextProps) {
                let {active} = this.props;
                if(active!==nextProps.active){
                    this.setState({active:nextProps.active});
                }
            },

            componentWillMount () {
                this.initUnits();
            },

            componentDidMount() {
                let { onChange } = this.props;

                this.onChange = debounce((active)=>{
                    onChange(active)
                }, 500)
            },

            componentWillUnmount() {
            },

            componentWillReceiveProps (nextProps) {
            },

            initUnits(){
            },

            styles(s){
                let { active } = this.state;
                let { size, backgroundOff, backgroundOn, circleColorOff, circleColorOn } = this.props;

                let width = size*14.5;
                let reduceWidth = size*10;
                let frontSize = size*10;

                const styles = {
                    root: {
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        height: size*7,
                        width: width,
                        background: active ? backgroundOn : backgroundOff,
                        borderRadius: 4*size,
                        cursor: 'pointer'
                    },
                    front: {
                        position: 'absolute',
                        left: active ? width-reduceWidth+5 : -7.5,
                        height: frontSize,
                        width: frontSize,
                        transition: 'all 0.25s linear',
                        background: active ? circleColorOn : circleColorOff,
                        borderRadius: '50%',
                        boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0,0.12)'
                        
                    }
                }
                return(styles[s]);
            },

            change(){
                let { active } = this.state;
                
                this.setState({active:!active});
                this.onChange(!active)
            },

            renderFront(){
                return(
                    <div style={this.styles('front')}/>
                )
            },

            render() {

                return (
                    <div style={this.styles('root')} onClick={this.change}>
                        { this.renderFront() }
                    </div>
                )
            } 

        }
    }}
