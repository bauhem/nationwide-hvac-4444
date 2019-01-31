import React from "react";

class PackagedSystemLocation extends React.Component {
  render() {
    return (
      <>
        <div className="div-heading-slide">
          <h3 className="titre-big">Package System Location</h3>
          <p className="smaller-explanation">Where is the Packaged System located?</p>

        </div>
        <div className="div-flex-h">
          <div
               className="options different-color-font pale-border top">
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
                <strong>Ground</strong>
              </label>
            </div>
            <p className="smaller-explanation">Is your condensing unit somewhere on the side or the rear of your home sitting on the ground or on a concrete pad?</p>
          </div>
          <div
               className="options different-color-font pale-border top">
            <div className="radio-button-field grey-border w-radio"
                 onClick={() => this.props.saveAndContinue({packaged_system_location: 'ground'})}>
              <div className="div-hover"></div>
              <img src="/images/stand.png" alt=""/>
              <input type="radio"
                     id="ground"
                     name="packaged-system-location"
                     value="ground"
                     data-name="packaged-system-location"
                     className="radio-button w-radio-input"/>
              <label htmlFor="ground"
                     className="radio-button-label-top-margin w-form-label">
                <strong>Gable Stand</strong>
              </label>
            </div>
            <p className="smaller-explanation">Some homes will have their condensing units on a raised-stand on the side of their home, elevated way above the ground.</p>
          </div>
          <div
               className="options different-color-font pale-border top">
            <div className="radio-button-field grey-border w-radio"
                 onClick={() => this.props.saveAndContinue({packaged_system_location: 'roof'})}>
              <div className="div-hover"></div>
              <img src="/images/roof-2.png" alt=""/>
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
            <p className="smaller-explanation">Your condensing unit could be sitting on top of the roof of your home, apartment, or condominium?</p>
          </div>
        </div>
      </>
    );
  }

}

export default PackagedSystemLocation;
