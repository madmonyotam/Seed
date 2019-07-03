import moment from 'moment';
import { Fragment, Children } from 'react';
import { isEmpty as _isEmpty } from 'lodash';

module.exports = {
    dependencies: ['Decorators.Popover','Calendar.Calendar','Buttons.Button'],    
    get(Popover,Calendar,Button) {
        
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
                    buttonsCont: {
                        display: 'flex',
                        justifyContent: 'flex-end',
                        padding: 10,
                    },
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

            handleSelectDate(date,isOnClick){
                if(!isOnClick) return
                let {onDatesSelect,isRange} = this.props;
                let {startDate,endDate} = this.state;


                if(!isRange) {
                    onDatesSelect(date)
                    this.setState({ anchorEl: undefined })

                } else {
                    if(startDate===''){
                        this.setState({ startDate: date })
                    } else if(startDate!=='' && endDate!==''){
                        this.setState({ startDate: date, endDate: '', hoverDate: ''})
                    } else if(startDate!=='' && endDate===''){
                        this.setState({endDate:date})
                    }
                }
            },

            handleOnHoverDate(hoverDate){
                let {startDate} = this.state;
                if(startDate!=='') this.setState({hoverDate})
            },

            handleClear(){
                this.setState({ 
                    startDate: '',
                    hoverDate: '',
                    endDate: '',
                })
            },

            handleSave(){
                let {onDatesSelect} = this.props;
                let {startDate,endDate} = this.state;
                let start, end;
                if(moment(startDate).isSameOrBefore(endDate)){
                    start = startDate;
                    end = endDate;
                } else {
                    start = endDate;
                    end = startDate;
                }

                if(onDatesSelect) onDatesSelect({ startDate: start, endDate: end })
                this.handleClose()
            },

            renderButtons(){
                return(
                    <div style={this.styles('buttonsCont')}>
                        <Button style={{marginLeft:10}} onClick={ this.handleClear } >{core.translate('Clear')}</Button>
                        <Button style={{marginLeft:10}} onClick={ this.handleSave }  >{core.translate('Save')}</Button>
                        <Button style={{marginLeft:10}} onClick={ this.handleClose }  >{core.translate('Cancel')}</Button>
                    </div>
                )
            },

            renderContent(){
                let {isRange} = this.props;
                let {startDate,hoverDate,endDate} = this.state;
                return(
                    <div>
                        <Calendar 
                            onDaySelect={this.handleSelectDate} 
                            datePickerProps={{
                                isRange,
                                startDate,
                                endDate,
                                hoverDate,
                                onHoverDate: this.handleOnHoverDate,
                            }}
                            />

                            { isRange ? this.renderButtons() : null }

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
