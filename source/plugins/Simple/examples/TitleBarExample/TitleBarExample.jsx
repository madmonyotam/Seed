import { TextField } from "@material-ui/core";

module.exports = {
    name: "TitleBarExample",
    description: '',
    dependencies: [
        'SimpleSwitch.Mixin',
        'Simple.TitleBar',
        'Examples.ExampleWrapper', 
        'Examples.ControlWrapper', 
        'Examples.ComponentWrapper'
    ],
    get(Mixin,TitleBar,ExampleWrapper,ControlWrapper,ComponentWrapper) {

        var core = this;

        var { React, PropTypes } = core.imports;

        return {
            mixins: [ Mixin ],

            componentWillUnmount() {
            },


            propsTypes: {
            },

            getDefaultProps(){
                return {
                };
            },

            propScheme(){ // TODO:  
                return {
                    title: { type: 'simple', context: this },
                    bgColor: { type: 'colorPicker', context: this },
                    fgColor: { type: 'colorPicker', context: this },
                    height: { type: 'simpleNumber', context: this }
                }
            },

            getInitialState() {
                return {
                    title: 'My Title',
                    bgColor: core.theme('backgrounds.primary'),
                    fgColor: core.theme('colors.white'),
                    height: core.dim("appBar.height"),
                };
            },

            componentWillMount () {
                this.initUnits();
            },

            componentDidMount() {
            },

            componentWillReceiveProps (nextProps) {
            },

            componentWillUnmount () {

            },

            initUnits(){

            },

            styles(s){

                let styles = {
                    imgLogo: {
                        width: 44,
                    },
                }

                return(styles[s]);
            },

            getCode(){
                return (`
<TitleBar 
title={'${this.state.title}'}
titlePosition={ 'left' }
logo={ <img src='/resources/images/simpleSwitch.png' style={ this.styles('imgLogo') } /> }
icon={ { title: 'Home Icon', 
            value:'nav.home',
            action: ()=>{console.log( 'go home');},
            size: 20
        } }
badge={ {
    counter: 35,
    style: {color: 'red'}
} }
leftButton={ ['L1'] }
buttons={ ['R1','R2','R3','R4'] }
bgColor={ core.theme('backgrounds.primary') }
fgColor={ core.theme('colors.white') }
padding={ 2 }
// middle={ <img src='/resources/images/simpleSwitch.png' style={ this.styles('imgLogo') } /> }
height={ ${this.state.height} }
width={ '100%' }
zIndex={ 1 }
/>
                `)
            },

            handleTitleChange(event){
                console.log(event.target.value)
                this.setState({
                    title: event.target.value
                })
            },

            handleHeightChange(event){
                console.log(event.target.value)
                this.setState({
                    height: event.target.value
                })
            },

            render() {
                let {title,bgColor,fgColor,height} = this.state;
                
                return (
                    <ExampleWrapper CodeSnippet={ this.getCode() } componentName={ core.translate('Title Bar') }>

                        <ControlWrapper scheme={ this.propScheme() }/>

                        <ComponentWrapper>
                            <TitleBar 
                                title={title}
                                titlePosition={ 'left' }
                                logo={ <img src='/resources/images/simpleSwitch.png' style={ this.styles('imgLogo') } /> }
                                icon={ { title: 'Home Icon', 
                                            value:'nav.home',
                                            action: ()=>{console.log( 'go home');},
                                            size: 20
                                        } }
                                badge={ {
                                    counter: 35,
                                    style: {color: 'red'}
                                } }
                                leftButton={ ['L1'] }
                                buttons={ ['R1','R2','R3','R4'] }
                                bgColor={ bgColor }
                                fgColor={ fgColor }
                                padding={ 2 }
                                // middle={ <img src='/resources/images/simpleSwitch.png' style={ this.styles('imgLogo') } /> }
                                height={ height }
                                width={ '100%' }
                                zIndex={ 1 }
                            />
                        </ComponentWrapper>

                    </ExampleWrapper>
                )
            }

        }
    }
}
