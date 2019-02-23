
module.exports = {
    dependencies: ['SimpleSwitch.Mixin','Layouts.Column','Layouts.Row','Layouts.ExpandingPanel',
     'Examples.SimpleExample','Simple.Label','Examples.ExampleHelper'],
    get(Mixin, Column, Row, ExpandingPanel,SimpleExample, Label, ExampleHelper) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ],

            propScheme(){ // TODO:  
                return {
                    uniqOpen:  { type: 'boolean' },
                    showMargin: { type: 'boolean' },
                    autoHeight: { type: 'boolean', group: 'initial' },
                    startOpen:  { type: 'boolean', group: 'initial' },
                    anchorHeight: { type: 'number' },
                    panelHeight:  { type: 'number' },
                    transition: { type: 'number' },
                }
            },

            getInitialState() {
                return {

                    anchorHeight: 50,
                    panelHeight: 200,
                    uniqOpen: true,
                    showMargin: true,
                    transition: 0.50,
                    autoHeight: true,
                    startOpen: false
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
                return data.map(this.renderRow);
            },

            renderRow(item,key){
                return(
                    <Row boxShadow={true} color={this.background} key={key}>{item}</Row>
                ) 
            },

            getCode(){
                let { anchorHeight, panelHeight, showMargin, transition, uniqOpen, autoHeight, startOpen } = this.state;                

                return (`
<Column boxShadow={true} width={'40%'} style={this.styles('column')}>
    <ExpandingPanel anchor={ this.renderAnchor() } panel={ this.renderPanel() } anchorHeight={${anchorHeight}}
     autoHeight={${autoHeight}} startOpen={${startOpen}} panelHeight={${panelHeight}} uniqOpen={${uniqOpen}}
     showMargin={${showMargin}} transition={${transition}}   />
</Column>
                `)
            },

            renderExPanel(id,key){
                let { anchorHeight, panelHeight, showMargin, transition, uniqOpen, autoHeight, startOpen } = this.state;
                panelHeight = Number(panelHeight);
                anchorHeight = Number(anchorHeight);

                return(
                    <ExpandingPanel id={id} key={key} anchor={ this.renderAnchor() } panel={ this.renderPanel() }
                    anchorHeight={anchorHeight} panelHeight={panelHeight} uniqGroup={'exampleGroup'} uniqOpen={uniqOpen}
                    showMargin={showMargin} transition={transition} autoHeight={autoHeight} startOpen={startOpen}  />
                )
            },

            render() {
                let mockArray = [1,2,3,4];

                return (
                    <SimpleExample context={this} code={ this.getCode() } scheme={ this.propScheme() } >

                            <Column boxShadow={true} width={'40%'} color={this.gray} >
                                { mockArray.map(this.renderExPanel) }
                            </Column>
            
                    </SimpleExample>
                )
            }

        }
    }
}
