
module.exports = {
    dependencies: ['SimpleSwitch.Mixin', 'Layouts.Row', 'Simple.Label'],
    get(Mixin, Row, Label) {
        
        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ],

            propsTypes: {
                id: PropTypes.string,
                title: PropTypes.string,
                background: PropTypes.string,
                required: PropTypes.bool,
                titlePosition: PropTypes.oneOf(['top', 'left']),
                titleWidth: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, ]),
                textSize: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, ]),
                width: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, ]),
                height: PropTypes.oneOfType([ PropTypes.string, PropTypes.number, ]),

                style: PropTypes.object,
                titleStyle: PropTypes.object,
                titleLabelStyle: PropTypes.object,
                componentStyle: PropTypes.object,
            },

            getDefaultProps(){
                return {
                    id: 'LabeledComponent',
                    title: 'Component Title',
                    background: core.theme('backgrounds.secondary'),
                    required: false,
                    titlePosition: 'left',
                    titleWidth: 150,
                    textSize: 13,

                    width: '100%',
                    height: 'fit-content',

                    style: {},
                    titleStyle: {},
                    titleLabelStyle: {},
                    componentStyle: {},
                };
            },

            componentWillMount () {
                this.initUnits();
            },

            initUnits(){
                this.colors={
                    required: core.theme('notify.error'),
                }
            },

            styles(s){
                let { style, titleStyle, titleLabelStyle, componentStyle, titlePosition, titleWidth, textSize } = this.props;
                let styles = {
                    root: {
                        display: 'flex',
                        background: this.props.background,
                        fontSize: textSize,
                        flexDirection: titlePosition === 'left' ? 'row' : 'column',
                        ...style
                    },
                    labelWrap: {
                        display: 'flex',
                        flexDirection: 'row',
                        fontSize: textSize,
                        width: (titlePosition === 'left') ? titleWidth : '100%',
                        padding: (titlePosition === 'left') ? 10 : '0 0 10px',
                        height: '100%',
                        minHeight: textSize * 2,
                        ...titleStyle
                    },
                    titleLabel: {
                        ...titleLabelStyle,
                    },
                    required: {
                        color: this.colors.required,
                        fontSize: textSize,
                        marginLeft: 5,
                    },
                    childrenWrap: {
                        width: (titlePosition === 'left') ? `calc(100% - ${titleWidth}px)` : '100%',
                        height: '100%',
                        fontSize: textSize,
                        ...componentStyle
                    }
                }
                return(styles[s]);
            },

            renderRequired() {
                let { required } = this.props;

                if ( required )
                    return (
                        <span style={ this.styles('required') }> * </span>
                    );

                return null;
            },

            render() {
                let {id, width, height, title, children, textSize} = this.props;

                return (
                    <Row id={id} width={ width } height={ height } style={ this.styles('root') }>
                        <Row style={ this.styles('labelWrap') }>
                            <Label label={ title } size={ textSize } width={'fit-content'} style={this.styles('titleLabel')}/> 
                            { this.renderRequired() }
                        </Row>
                        <Row padding={0} style={ this.styles('childrenWrap')}>
                            { children }
                        </Row>
                    </Row>
                )
            } 

        }
    }
}
