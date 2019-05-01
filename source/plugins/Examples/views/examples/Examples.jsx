module.exports = {
    name: "Examples",
    description: '',

    dependencies: [
        'SimpleSwitch.Helper',
        'Simple.Label',
        'Layouts.Column',
        'Layouts.Row',
        'Layouts.ExpandingPanel',
        'Examples.ExampleMenuItem'
    ],

    get(
        Helper,
        Label,
        Column,
        Row,
        ExpandingPanel,
        ExampleMenuItem
    ) {

        var core = this;
        var { React, PropTypes, Branch, ComponentMixin } = core.imports;

        const mainBackground = core.theme('examples.mainBackground');

        return {
            mixins: [ ComponentMixin, Branch ],

            cursors: {
                currentExample: ['plugins','Examples','currentExample'],
            },

            getInitialState() {
                return {
                    currentDisplay: null,
                    selectedMenuItem: null,
                };
            },

            componentWillUnmount() {
              this.cursor.currentExample.set(null);
            },

            styles(s) {
                let styles = {
                    root: {
                       width: '100%',
                       height: '100%',
                       display: 'flex',
                       flexDirection: 'row',
                    },
                    exampleView:{
                      padding: 15,
                    },
                }

                return(styles[s]);
            },

            handleClick(item){

              var Component = item.component;
              this.cursor.currentExample.set(item.info);

              this.setState({
                selectedMenuItem: item.info.name,
                currentDisplay: <Component/>
              });
            },

            renderInnerList(list){
                var innerList = Object.values(list.innerList);

                return (
                    innerList.map((item,i)=>{
                        
                        let {selectedMenuItem} = this.state;
                        let selected = selectedMenuItem === item.info.name;

                        return (
                            <ExampleMenuItem key={i} selected={selected} item={item} handleClick={this.handleClick}/>
                        );
                    })
                
                )
            },

            renderAnchor(name){
                return(
                    <Row>
                        <Label label={name} size={15} weight={500} />
                    </Row>
                )
            },

            renderPanel(menuItem,idx){
                var name = Helper.openCamelCase(menuItem.name);

                return(

                    <ExpandingPanel id={idx} key={idx}
                        anchor={ this.renderAnchor(name) } 
                        panel={ this.renderInnerList(menuItem) }
                        anchorHeight={40} 
                        autoHeight={true} 
                        uniqOpen={true} 
                        uniqGroup={'menu'}
                        showMargin={false} 
                        transition={0.3}   />
                )
            },

            renderMenuBar(){
                let menuList = [];
                let plugins = core.getExamples();

                for (const key in plugins) {   
                    let examples = plugins[key];
                    menuList.push({ name: key, innerList: examples });
                }

                return(
                    <Column width={260} boxShadow={true}>
                        {
                            _.map(menuList, this.renderPanel)
                        }
                    </Column>
                )
            },

            render() {
                let {currentDisplay} = this.state;

                return (
                    <div style={this.styles('root')} >
                        { this.renderMenuBar() }

                        <Column width={'100%'} color={mainBackground} style={this.styles('exampleView')}>
                            {currentDisplay}
                        </Column>

                    </div>
                )


            }
        }
    }
}
