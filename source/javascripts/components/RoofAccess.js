import React from "react";


class RoofAccess extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="div-heading-slide">
          <h3 className="titre-big">How do you access the roof?</h3>
        </div>
        <div className="div-flex-h">
          <div
            className="options different-color-font pale-border"
            onClick={() => this.props.saveAndContinue({roof_access: 'stair'})}>
            <div className="radio-button-field grey-border w-radio">
              <div className="div-hover"></div>
              <input type="radio" id="stair" name="roof-access" value="stair"
                     data-name="roof-access"
                     className="radio-button w-radio-input"/>
              <img src="/images/stairs.png" alt=""/>
              <label htmlFor="stair"
                     className="radio-button-label-top-margin w-form-label">
                <strong>Stair access</strong>
              </label>
            </div>
          </div>
          <div
            className="options different-color-font pale-border"
            onClick={() => this.props.saveAndContinue({roof_access: 'crane'})}>
            <div className="radio-button-field grey-border w-radio">
              <div className="div-hover"></div>
              <input type="radio" id="crane" name="roof-access" value="crane"
                     data-name="roof-access"
                     className="radio-button w-radio-input"/>
              <img src="/images/crane-icon.png" alt=""/>
              <label htmlFor="crane"
                     className="radio-button-label-top-margin w-form-label">
                <strong>Crane required</strong>
              </label>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default RoofAccess;
