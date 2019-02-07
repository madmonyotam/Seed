var Countries = require('country-data').countries.all;
var PhoneNumber = require( 'awesome-phonenumber' );
import { Button, ClickAwayListener, Icon, Input, Popper, Paper, IconButton } from '@material-ui/core/';
module.exports = {
  name: "CountrySelect",
  description: '',
  propTypes: {},
  dependencies: ['SimpleSwitch.Helper'],

  get(Helper) {

      var core = this;

      var { React, PropTypes } = core.imports;

      return {
          propsTypes: {

          },

          getDefaultProps(){
              return {
                countryCode: 'us',
              };
          },

          getInitialState(){
              return {
                countryStr: '',
                countryCode: '',
                numberValue: 123456,
                open: false,
                anchorEl: null,
                Countries: [],
                filtered: []

              }
          },

          setCountries(){
            let countries = _.map(Countries, (cntry, idx)=>{
              var code = cntry.alpha2.toLowerCase() ;
              return {
                ...cntry,
                flag: <span className={ `flag-icon flag-icon-${ code }` } style={{ marginRight: 15 }}></span>
              }
            })
            this.setState({ Countries: countries, filtered: countries })

          },

          componentDidMount() {
            this.setState({ countryCode: this.props.countryCode })
            this.setCountries()
          },

          componentWillReceiveProps(nextProps) {
            if (nextProps.countryCode != this.props.countryCode) {
              this.setState({ countryCode: nextProps.countryCode })
            }
          },

          renderCountryItem(country, idx){

            var code = country.alpha2.toLowerCase() ;

            return (
              <div onClick={ e => {  this.handleChangeCountry(country, e) } } key={idx} style={{ fontSize: 13, cursor: 'pointer', padding:' 5px 10px', height: '30px',display: 'flex', justifyContent: 'space-between' }} >
                <div>
                  {/* { country.flag } */}
                  { country.name }
                </div>
                <span>{ this.getPrefix(code) }</span>
              </div>
            )
          },

          getPrefix(code){
            var num = PhoneNumber.getCountryCodeForRegionCode(code.toUpperCase())
            return '+'+num
          },

          renderSelectedCountry(value){
            return (
              <div style={{ paddingLeft: 10, display: 'flex' }}>
                <span className={ `flag-icon flag-icon-${ value }` } style={{ fontSize: 13 }} />
                <Icon> { core.icons('dropDown') }</Icon>
              </div>
            )
          },

          handleClose(){
            this.setState({ anchorEl: null, open: false });
            core.emit('clickAway:allow');
          },

          openCountryPopup(event){
            let { currentTarget } = event;
            core.emit('clickAway:prevent');
            this.setState({ anchorEl: currentTarget, open: !this.state.open })
          },

          handleChangeCountry(country, e){
            this.setState({ countryCode: country.alpha2.toLowerCase() })
            if (this.props.handleChangeCountry) this.props.handleChangeCountry(country, e)
            this.handleClose();
            this.handleClearSearch();
          },

          handleSearchCountry(e){
            let { Countries } = this.state;
            let countryStr =  e.target.value;
            var filtered = _.filter(Countries, country => {
                              return country.name.toLowerCase().indexOf(countryStr.toLowerCase()) > -1
                            });

            this.setState({ filtered, countryStr });
          },

          handleClearSearch(){
            this.setState({ filtered: this.state.Countries, countryStr: '' })
          },

          render() {
              let { countryCode, open, anchorEl, countryStr, filtered } = this.state;
              const id = open ? 'simple-popper' : null;

              return (
                <div style={{ display: 'flex', alignItems: 'center', background: core.theme('colors.white')  }} >

                  <Button size={ 'small' } style={{ padding: 0, minWidth: 40 }} onClick={ this.openCountryPopup }>
                    { this.renderSelectedCountry(countryCode) }
                  </Button>
                  <Popper   onClose={ this.handleClose }
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            placement={ 'right-end' }
                            disablePortal={ true }
                            popperOptions={{ positionFixed: true }}
                            style={{ zIndex: 1300, background: core.theme('colors.white') }}
                            modifiers={{ flip: { enabled: true } }} >

                    <ClickAwayListener onClickAway={ this.handleClose }>
                      <Paper>
                        <div style={{ height: 40, padding: '5px 10px', display: 'flex', alignItems: 'center' }}>
                          <IconButton style={{ width: 20, height: 20 }} title={ core.translate('Close search') }>
                            <Icon style={{ fontSize: 16, cursor: 'pointer' }} onClick={ e=>{
                                this.handleClose()
                                this.handleClearSearch()
                            }}>{ core.icons('close') }</Icon>
                          </IconButton>

                          <Input onChange={ this.handleSearchCountry }
                                value={ countryStr }
                                style={{ marginLeft: 15, width: '100%' }}
                                inputProps={{ style: { fontSize: 13 } }}
                                placeholder={ core.translate('Search a country') }/>
                        </div>

                        <div style={{ maxHeight: 320, minHeight: 200, width: 320, overflowY: 'auto' }}>
                          { _.map(filtered, this.renderCountryItem) }
                        </div>
                      </Paper>
                    </ClickAwayListener>
                  </Popper>


                </div>

              )


          }
      }
  }
}

let styles = {
  button: {
      minWidth: 32,
      borderRadius: '50%',
      cursor: 'pointer'
  }
}
