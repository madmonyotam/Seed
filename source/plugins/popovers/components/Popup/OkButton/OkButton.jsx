module.exports = {
dependencies: ['Layouts.Button', 'Simple.Loader', 'Simple.Label'],
get(Button, Loader, Label) {
    var core = this;
    var { React, PropTypes, ComponentMixin } = core.imports;

    return {
        mixins: [ ComponentMixin ],

        propsTypes: {
        },

        getDefaultProps() {
            return {
                disabled: false,
                isLoading: false,
                label: core.translate('Ok'),
                labelColor: core.theme('buttons.white'),
                backgroundColor: core.theme('buttons.white'),
                style: {},
                labelStyle: {},
                onClick: ()=>{},
            };
        },

        getInitialState() {
            return {};
        },

        componentWillMount() {
            this.initUnits();
        },

        componentWillReceiveProps(nextProps) {},

        initUnits(){
            this.dims = {};
            this.colors = {
                disabled: core.theme('buttons.dark'),
            };
            this.backgrounds = {
                disabled: core.theme('buttons.disabled'),
            };
            this.icons = {};
        },

        styles(propName) {
            let {style} = this.props;

            let styles = {
                root: {
                    ...style
                },
            };
            return styles[propName]
        },

        okLabel() {
            let {disabled, isLoading, label, labelColor, labelStyle} = this.props;

            let color = (disabled) ? this.colors.disabled : labelColor;
            
            if (isLoading) { return ( <Loader size={20}/> ); }
            return ( <Label color={color} label={label} style={labelStyle}/> )
        },

        render() {
            let {disabled, backgroundColor, onClick} = this.props;

            let bgColor = (disabled) ? this.backgrounds.disabled : backgroundColor,

            return (
                <Button
                    id={'OkButton'}
                    variant={'flat'}
                    disabled={disabled}
                    onClick={onClick}
                    backgroundColor={bgColor}
                    style={this.styles('root')}
                >
                    {this.okLabel()}
                </Button>
            )
        }
    }
}}
