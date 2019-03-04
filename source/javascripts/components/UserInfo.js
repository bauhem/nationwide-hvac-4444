import React from "react";
import QuoteCtx from './QuoteCtx';
import {getZone} from './UnitHelpers';

const zipData = require('../../../data/zip_codes.json');

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.name = React.createRef();
    this.email = React.createRef();
    this.phone = React.createRef();
    this.zip = React.createRef();

    this.handleClick = this.handleClick.bind(this);
  }

  static sendUserInfo(state) {
    fetch("/", {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: encode({
              "form-name": "wf-form-price-form",
              "name": state.user_name,
              "email-address": state.user_email,
              "phone-number": state.user_phone,
              "zip-code": state.zip_code
            })
          })
            .then(() => console.log("Netlify: Lead added!"))
            .catch(error => alert(error));
  }

  handleClick() {
    if (!this.props.validateForm()) {
      return false;
    }

    let zip_code = this.zip.current.value;

    // If in no zones, redirect to call us
    if (this.zip.current.validity.valid) {
      let state = {
        user_name: this.name.current.value,
        user_email: this.email.current.value,
        user_phone: this.phone.current.value,
        zip_code: zip_code
      };

      let zone = getZone(zip_code);
      state['zone_num'] = zone;

      if (zone === null) {
        // TODO - Add message why we got to contact us
        return this.props.transition({type: 'INVALID_ZIP'});
      }

      // Do not send the info more than once
      if (this.context.user_email !== state.user_email) {
        UserInfo.sendUserInfo(state);
      }
      
      return this.props.saveAndContinue(state);
    }

    this.zip.current.reportValidity();
  }

  render() {
    return (
      <>
        <div className="div-heading-slide">
          <h3 className="titre-big">
            Send us your name, email address, phone number and zip code to get
            your quotes
          </h3>
        </div>
        <div className="div-flex-h">
          <input type="text" className="zipcode w-input" maxLength="256"
                 name="name" placeholder="Your name"
                 id="name" required={true}
                 ref={this.name} defaultValue={this.context.user_name || ''}/>
          <input type="email" className="zipcode w-input" maxLength="256"
                 name="email-address" placeholder="Your email address"
                 id="email" required={true}
                 ref={this.email} defaultValue={this.context.user_email || ''}/>
          <input type="phone" className="zipcode w-input" maxLength="256"
                 name="phone-number" placeholder="Your phone number"
                 id="name" required={true}
                 ref={this.phone} defaultValue={this.context.user_phone || ''}/>
          <input type="text" pattern="\d{5}" className="zipcode w-input"
                 maxLength="5"
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
