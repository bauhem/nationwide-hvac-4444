import React from "react";

class PackagedSystemLocation extends React.Component {
  render() {
    return (
      <>
        <div className="div-heading-slide">
          <h3 className="titre-big">Packaged System location</h3>
        </div>
        <p className="smaller-explanation">Where is the Packaged System located?</p>
        <div className="div-flex-h">
          <div
               className="options different-color-font pale-border">
            <div className="radio-button-field grey-border w-radio"
                 onClick={() => this.props.saveAndContinue({packaged_system_location: 'side_of_home'})}>
              <div className="div-hover"></div>
              <img src="/images/side-of-home.png" alt=""/>
              <input type="radio"
                     id="side-of-home"
                     name="packaged-system-location"
                     value="side-of-home"
                     data-name="packaged-system-location"
                     className="radio-button w-radio-input"/>
              <label htmlFor="side-of-home"
                     className="radio-button-label-top-margin w-form-label">
                <strong>Stand On Side of Home</strong>
              </label>
            </div>
          </div>
          <div
               className="options different-color-font pale-border">
            <div className="radio-button-field grey-border w-radio"
                 onClick={() => this.props.saveAndContinue({packaged_system_location: 'roof'})}>
              <div className="div-hover"></div>
              <img src="/images/roof.png" alt=""/>
              <input type="radio"
                     id="roof"
                     name="packaged-system-location"
                     value="roof"
                     data-name="packaged-system-location"
                     className="radio-button w-radio-input"/>
              <label htmlFor="roof"
                     className="radio-button-label-top-margin w-form-label">
                <strong>Roof</strong>
              </label>
            </div>
          </div>
          <div
               className="options different-color-font pale-border">
            <div className="radio-button-field grey-border w-radio"
                 onClick={() => this.props.saveAndContinue({packaged_system_location: 'ground'})}>
              <div className="div-hover"></div>
              <img src="/images/ground.png" alt=""/>
              <input type="radio"
                     id="ground"
                     name="packaged-system-location"
                     value="ground"
                     data-name="packaged-system-location"
                     className="radio-button w-radio-input"/>
              <label htmlFor="ground"
                     className="radio-button-label-top-margin w-form-label">
                <strong>Ground</strong>
              </label>
            </div>
          </div>
        </div>
      </>
    );
  }
  
}

export default PackagedSystemLocation;