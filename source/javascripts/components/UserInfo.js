import React from "react";
import QuoteCtx from './QuoteCtx';
import {getZone} from './UnitHelpers';

const zipData = require('../../../data/zip_codes.json');

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.name = React.createRef();
    this.zip = React.createRef();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (!this.props.validateForm()) {
      return false;
    }

    let zip_code = this.zip.current.value;

    // If in no zones, redirect to call us
    if (this.zip.current.validity.valid) {
      let zone = getZone(zip_code);

      if (zone === null) {
        // TODO - Add message why we got to contact us
        return this.props.transition({type: 'INVALID_ZIP'});
      }

      // TODO - Send data to netlify
      return this.props.saveAndContinue({zip_code: zip_code, zone_num: zone});
    }

    this.zip.current.reportValidity();
  }

  render() {
    return (
      <>
        <div className="div-heading-slide">
          <h3 className="titre-big">
            Send us your name, email address, phone number and zip code to get your quotes
          </h3>
        </div>
        <div className="div-flex-h">
          <input type="text"className="zipcode w-input" maxLength="256"
                 name="name" placeholder="Your name"
                 id="name" required={true}/>
          <input type="email"className="zipcode w-input" maxLength="256"
                 name="email" placeholder="Your email address"
                 id="email" required={true}/>
          <input type="phone"className="zipcode w-input" maxLength="256"
                 name="phone" placeholder="Your phone number"
                 id="name" required={true}/>
          <input type="text" pattern="\d{5}" className="zipcode w-input" maxLength="5"
                 name="Zipcode" placeholder="Your zip code"
                 id="Zipcode" required={true}
                 ref={this.zip} defaultValue={this.context.zip_code || ''}/>
        </div>
        <div className="next-button w-slider-arrow-right"
             onClick={this.handleClick}>
          Get my quotes
        </div>
      </>
    );
  }
}

UserInfo.contextType = QuoteCtx;

export default UserInfo;
