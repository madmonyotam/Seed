import { MenuItem,Button  } from '@material-ui/core/';


module.exports = {
    name: "Examples",
    description: '',

    dependencies: [
        'SimpleSwitch.Helper',
        'Simple.Label',
        'Layouts.Column',
        'Layouts.Row',
        'Layouts.ExpandingPanel',
    ],

    get(
        Helper,
        Label,
        Column,
        Row,
        ExpandingPanel
    ) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            propsTypes: {

            },

            getDefaultProps(){
                return {
                };
            },

            getInitialState() {
                return {
                    currentDisplay: null,
                    selectedMenuItem: null,
                };
            },

            componentWillMount() {
                this.initialUnits();
            },

            componentDidMount() {
            },

            componentWillUnmount() {
            },

            initialUnits() {
                this.backgrounds = {
                    menu: core.theme('backgrounds.menu'),
                    default: core.theme('backgrounds.default'),
                    light_gray: core.theme('backgrounds.light_gray'),
                }
                this.colors = {
                    gray: core.theme('colors.gray'),
                    dark: core.theme('colors.dark')
                }
            },

            styles(s) {
                let styles = {
                    root: {
                       width: '100%',
                       height: 'calc( 100vh - 48px )',
                       display: 'flex',
                       flexDirection: 'row',
                    },
                    menuItem:{
                        margin: 0,
                    },
                    innerListItem:{
                        padding: "5px 15px",
                        margin: 0,
                        fontSize: 13,
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        display: "block",
                        overflow: "hidden",
                    },
                    exampleView:{
                        padding: 15
                    },
                }

                return(styles[s]);
            },

            handleClick(item){

              var Component = item.component;

              this.setState({
                selectedMenuItem: item.info.name,
                currentDisplay: <Component/>
              });
            },

            renderInnerList(list){
                var innerList = Object.values(list.innerList);

                return (
                            innerList.map((item,i)=>{
                                let name = Helper.openCamelCase(item.info.name);

                                let {selectedMenuItem} = this.state;
                                let selected = selectedMenuItem === item.info.name;
                                // if(selectedMenuItem===item.info.name ){
                                //     selected = true
                                // }
                                return (
                                    <MenuItem key={i} title={item.info.name} id={i} selected={selected} style={this.styles('innerListItem')} onClick={(e)=>{this.handleClick(item)}}>{name}</MenuItem>
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

                        <Column width={'100%'} color={this.backgrounds.light_gray} style={this.styles('exampleView')}>
                            {currentDisplay}
                        </Column>

                    </div>
                )


            }
        }
    }
}
