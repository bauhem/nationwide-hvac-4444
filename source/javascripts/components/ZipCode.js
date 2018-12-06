import React from "react";

class ZipCode extends React.Component {
  constructor(props) {
    super(props);
    this.zip = React.createRef();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.zip.current.validity.valid) {
      this.props.saveAndContinue({zip_code: this.zip.value});
    } else {
      this.zip.current.reportValidity();
    }
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
          <input type="text" className="zipcode w-input" maxLength="256"
                 name="Zipcode" placeholder="You zip code"
                 id="Zipcode" required={true}
                 ref={this.zip}/>
        </div>
        <div className="next w-slider-arrow-right"
             onClick={this.handleClick}>
          <div className="next-button">Next step</div>
        </div>
      </>
    );
  }
}

export default ZipCode;
