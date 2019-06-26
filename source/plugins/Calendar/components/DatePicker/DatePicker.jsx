import moment from 'moment';
import { Fragment, Children } from 'react';
import { isEmpty as _isEmpty } from 'lodash';

module.exports = {
    dependencies: ['Decorators.Popover','Calendar.Calendar'],    
    get(Popover,Calendar) {
        
        var core = this;
        var { React, PropTypes, ComponentMixin } = core.imports;

        return {
            mixins: [ ComponentMixin ],

            propsTypes: {
                isRange: PropTypes.bool,
            },

            getDefaultProps(){
                return {
                    isRange: false,
                };
            },
            
            getInitialState() {
                return {
                    anchorEl: undefined,
                    startDate: '',
                    hoverDate: '',
                    endDate: '',
                };
            }, 
 
            styles(s){

                const styles = {

                }
                
                return(styles[s]);
            },

            handleOpen(e){
                this.setState({ anchorEl: e.currentTarget })
            },

            handleClose(){
                this.setState({ 
                    anchorEl: undefined,
                    startDate: '',
                    hoverDate: '',
                    endDate: '',
                })
            },

            handleSelectDate(date){
                let {onDatesSelect,isRange} = this.props;
                let {startDate} = this.state;

                
                if(!isRange) {
                    onDatesSelect(date)
                    this.setState({ anchorEl: undefined })

                } else {
                    if(startDate===''){
                        this.setState({ startDate: date })
                    } else {
                        if( moment(date).isBefore(startDate) ) {
                            this.setState({ startDate: date, endDate: startDate},()=>{
                                if(onDatesSelect && this.state.endDate && this.state.startDate) {
                                    onDatesSelect({ startDate: this.state.startDate, endDate: this.state.endDate })
                                    // this.handleClose()
                                }
                            })
                        } else {
                            this.setState({ endDate: date },()=>{
                                if(onDatesSelect && this.state.endDate && this.state.startDate) {
                                    onDatesSelect({ startDate: this.state.startDate, endDate: this.state.endDate })
                                    // this.handleClose()
                                }
                            })

                        }
                    }
                }
            },

            handleOnHoverDate(hoverDate){
                let {startDate} = this.state;
                if(startDate!=='') this.setState({hoverDate})
            },

            renderButtons(){
                return(
                    <div>
                        <span>ok</span>
                        <span>cancel</span>
                    </div>
                )
            },

            renderContent(){
                let {startDate,hoverDate} = this.state;
                return(
                    <div>
                        <Calendar 
                            onDaySelect={this.handleSelectDate} 
                            dayCellRender={ this.renderDayCell } 
                        
                            ignoreYearChange={true}
                            ignoreMonthChange={true}

                            startDate={startDate}
                            hoverDate={hoverDate}
                            onHoverDate={this.handleOnHoverDate}

                            defaultDate={moment().subtract(7, 'days')} 
                            
                            
                            />
                            { this.renderButtons() }
                    </div>

                )
            },

            render() {
                let { children } = this.props;
                let { anchorEl } = this.state;

                return (
                    <div>

                        <Popover  anchorEl={ anchorEl }
                                position={ 'bottom' }
                                center={true}
                                theme={ 'light' }
                                animation={ 'pop' }
                                backdrop={ true }
                                elevation={ 0 }
                                padding={ 0 }
                                offsetX={ 0 }
                                offsetY={ 0 }
                                delay={ 250 }
                                width={'fit-content'}
                                interactive={ false }
                                onClose={ this.handleClose } >
                            { this.renderContent() }
                        </Popover>
                        
                        { React.cloneElement(children, { onClick: this.handleOpen }) }

                    </div>
                )
            } 
        }
    }
}
