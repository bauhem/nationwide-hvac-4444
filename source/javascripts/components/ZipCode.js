import React from "react";
import QuoteCtx from './QuoteCtx';

const zipData = require('../../../data/zip_codes.json');

class ZipCode extends React.Component {
  constructor(props) {
    super(props);
    this.zip = React.createRef();

    this.handleClick = this.handleClick.bind(this);
    this.getZone = this.getZone.bind(this);
  }

  getZone(zip_code) {
    // We take for granted that the zips will be sorted already
    if (/^\d+$/.test(zip_code)) {
      let idx = zipData.findIndex(obj => obj['Zip'] === parseInt(zip_code));

      if (idx === -1) return null;

      return zipData[idx]['Zone'];
    }

    return null;
  }

  handleClick() {
    let zip_code = this.zip.current.value;
    // TODO - Validate zip code in zones.
    // If in no zones, redirect to call us
    if (this.zip.current.validity.valid) {
      let zone = this.getZone(zip_code);

      if (zone === null) {
        return this.props.transition({type: 'INVALID_ZIP'});
      }

      return this.props.saveAndContinue({zip_code: zip_code, zone_num: zone});
    }

    this.zip.current.reportValidity();
  }

  render() {
    return (
      <>
        <div className="div-heading-slide">
          <h3 className="titre-big">
            Enter you Zip Code to get an accurate installations pricing
          </h3>
        </div>
        <div className="div-flex-h">
          <input type="text" pattern="[0-9]{5}" className="zipcode w-input" maxLength="5"
                 name="Zipcode" placeholder="You zip code"
                 id="Zipcode" required={true}
                 ref={this.zip} defaultValue={this.context.zip_code || ''}/>
        </div>
        <div className="next-button w-slider-arrow-right"
             onClick={this.handleClick}>
          Next step
        </div>
      </>
    );
  }
}

ZipCode.contextType = QuoteCtx;

export default ZipCode;
