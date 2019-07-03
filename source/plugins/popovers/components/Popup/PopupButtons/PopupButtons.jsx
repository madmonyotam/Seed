module.exports = {
dependencies: ['Layouts.Row', 'Buttons.Button'],
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
                children: null,
                height: 50,
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
            this.backgrounds = {};
            this.icons = {};
        },

        styles(propName) {
            let {division, style, height} = this.props;

            let styles = {
                root: {
                    minHeight: height,
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

            let click = okDisabled || okLoading ? ()=>{} : okCB;
            let ripple = !(okDisabled || okLoading);

            return (
                <Button
                    variant={'raised'}
                    theme={'primary'}
                    disabled={okDisabled}
                    isLoading={okLoading}
                    ripple={ripple}
                    onClick={click}
                >
                    {okLabel}
                </Button>
            );
        },

        render() {
            let {children, cancelCB, height} = this.props;

            return (
                <Row id={'PopupButtons'} padding={this.dims.rowPadding} height={height}  style={this.styles('root')}>
                    <Row id={'Left'} padding={0}>
                        {children}
                    </Row>
                    <Row width={185} id={'Right'} padding={0} style={this.styles('right')}>
                        <Button theme={ 'default' } variant={'outlined'} onClick={cancelCB}>{core.translate('Cancel')}</Button>
                        {this.okButton()}
                    </Row>
                </Row>
            )
        }
    }
}}
