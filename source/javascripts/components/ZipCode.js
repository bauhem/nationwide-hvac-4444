import React from "react";

class ZipCode extends React.Component {
  render() {
    return (
      <>
        <div className="div-heading-slide">
          <h3 className="titre-big">
            Enter you Zip Code to get an accurate installations pricing
          </h3>
        </div>
        <div className="div-flex-h">
          <input type="text" className="zipcode w-input" maxLength="256"
                 name="Zipcode" placeholder="You zip code"
                 id="Zipcode" required=""
                 ref={(zip) => {this.zip = zip}}/>
        </div>
        <div className="next w-slider-arrow-right"
             onClick={() => this.props.saveAndContinue({zip_code: this.zip.value})}>
          <div className="next-button">Next step</div>
        </div>
      </>
    );
  }
}

export default ZipCode;
