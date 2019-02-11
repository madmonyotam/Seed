
module.exports = {
    name: "ExpandingPanelEx",
    description: '',
    dependencies: ['SimpleSwitch.Mixin','Layouts.Column','Layouts.Row','Layouts.SimpleExpandingPanel',
     'Examples.ExampleWrapper', 'Examples.ControlWrapper', 'Examples.ComponentWrapper','Simple.Label'],
    get(Mixin, Column, Row, SimpleExpandingPanel, ExampleWrapper, ControlWrapper, ComponentWrapper, Label) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ],

            propScheme(){ // TODO:  
                return {
                    anchorHeight: { type: 'number', context: this },
                    panelHeight:  { type: 'number', context: this },
                    uniqOpen:  { type: 'boolean', context: this },
                    showMargin: { type: 'boolean', context: this },
                    transition: { type: 'number', context: this }
                }
            },

            getInitialState() {
                return {

                    anchorHeight: 50,
                    panelHeight: 200,
                    uniqOpen: true,
                    showMargin: true,
                    transition: 0.35
                };
            },

            componentWillMount () {
                this.initUnits();
            },

            initUnits(){
                this.background = core.theme('backgrounds.secondary');
                this.primary = core.theme('backgrounds.primary');
                this.gray = core.theme('backgrounds.light_gray');
                this.text = core.theme('colors.white');
            },

            styles(s){

                const styles = {

                }

                return(styles[s]);
            },

            renderAnchor(){
                return(
                    <Row color={this.primary} height={'100%'}>
                        <Label color={this.text} label={"I'm An Row Anchor renderer"}/>
                    </Row>
                )
            },

            renderPanel(){
                let data = ['first','second','last']
                let rows = data.map(this.renderRow);

                return(
                    <Column width={'100%'} style={{overflow:'hidden'}}>
                        { rows }
                    </Column>
                )

            },

            renderRow(item,key){
                return(
                    <Row boxShadow={true} color={this.background} key={key}>{item}</Row>
                ) 
            },

            getCode(){
                let { anchorHeight, panelHeight, showMargin, transition, uniqOpen } = this.state;                

                return (`
<Column boxShadow={true} width={'40%'} style={this.styles('column')}>
    <SimpleExpandingPanel anchor={ this.renderAnchor() } panel={ this.renderPanel() } anchorHeight={${anchorHeight}}
                          panelHeight={${panelHeight}} uniqOpen={${uniqOpen}} showMargin={${showMargin}} transition={${transition}}   />
</Column>
                `)
            },

            renderExPanel(id,key){
                let { anchorHeight, panelHeight, showMargin, transition, uniqOpen } = this.state;
                panelHeight = Number(panelHeight);
                anchorHeight = Number(anchorHeight);

                return(
                    <SimpleExpandingPanel id={id} key={key} anchor={ this.renderAnchor() } panel={ this.renderPanel() }
                    anchorHeight={anchorHeight} panelHeight={panelHeight} uniqGroup={'exampleGroup'} uniqOpen={uniqOpen}
                    showMargin={showMargin} transition={transition}   />
                )
            },

            render() {
                let mockArray = [1,2,3,4];

                return (
                    <ExampleWrapper CodeSnippet={ this.getCode() } componentName={ core.translate('Loader') }>
                        <ControlWrapper  scheme={ this.propScheme() } />
                        <ComponentWrapper>
                            <Column boxShadow={true} width={'40%'} color={this.gray} >
                                { mockArray.map(this.renderExPanel) }
                            </Column>
                        </ComponentWrapper>
                    </ExampleWrapper>

                )
            }

        }
    }
}
