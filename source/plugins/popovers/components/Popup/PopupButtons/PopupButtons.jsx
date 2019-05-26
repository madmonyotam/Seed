module.exports = {
dependencies: ['Layouts.Row', 'Inputs.Button'],
get(Row, Button) {
    var core = this;
    var { React, PropTypes, ComponentMixin } = core.imports;

    return {
        mixins: [ ComponentMixin ],

        propsTypes: {
            okLabel: PropTypes.string,
            okCB: PropTypes.func,
            okDisabled: PropTypes.bool,
            okLoading: PropTypes.bool,
            cancelCB: PropTypes.func,
            division: PropTypes.bool,
            children: PropTypes.object,
            height: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
            style: PropTypes.object,
        },

        getDefaultProps() {
            return {
                okLabel: 'Ok',
                okCB: ()=>{},
                okDisabled: true,
                okLoading: false,
                cancelCB: ()=>{},
                division: false,
                height: 50,
                children: null,
                style: {},
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
            this.dims = {
                rowPadding: 0,
            };
            this.colors = {
                border: core.theme('borders.default'),
            };
            this.backgrounds = {
                default: core.theme('backgrounds.default'),
            };
            this.icons = {};
        },

        styles(propName) {
            let {division, style} = this.props;

            let styles = {
                root: {
                    borderTop: (division) ? `1px solid ${this.colors.border}` : 'none',
                    ...style,
                },
                right: {
                    minWidth: 185,
                    minHeight: this.dims.rowHeight,
                    marginLeft: 10,
                    justifyContent:'space-around',
                }
            };
            return styles[propName]
        },

        okButton() {
            let {okLabel ,okDisabled ,okLoading ,okCB} = this.props;

            if (!okLabel) return null;

            let click = okDisabled ? ()=>{} : okCB;

            return (
                <Button
                    variant={'flat'}
                    backgroundColor={this.backgrounds.default}
                    disabled={okDisabled}
                    isLoading={okLoading}
                    ripple={!okDisabled}
                    onClick={click}
                >
                    {okLabel}
                </Button>
            );
        },

        render() {
            let {children, cancelCB, height} = this.props;

            return (
                <Row id={'PopupButtons'} padding={this.dims.rowPadding} height={height} color={this.backgrounds.default} style={this.styles('root')}>
                    <Row id={'Left'} padding={0}>
                        {children}
                    </Row>
                    <Row width={185} id={'Right'} padding={0} style={this.styles('right')}>
                        <Button theme={'secondary'} onClick={cancelCB}>{core.translate('Cancel')}</Button>
                        {this.okButton()}
                    </Row>
                </Row>
            )
        }
    }
}}
