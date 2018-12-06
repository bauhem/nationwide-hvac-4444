import React from "react";


class WaterHeaterUnderAirHandler extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="div-heading-slide">
          <h3 className="titre-big">Is the water heater under the air handler?</h3>
        </div>
        <div className="div-flex-h">
          <div
               className="options different-color-font pale-border">
            <div className="radio-button-field grey-border w-radio"
                 onClick={() => this.props.saveAndContinue({water_heater_under_air_handler: false})}>
              <div className="div-hover"></div>
              <input type="radio" id="no" name="water-heater-under-air-handler"
                     value="no" data-name="water-heater-under-air-handler"
                     className="radio-button w-radio-input"/>
              <label htmlFor="no"
                     className="w-form-label"><strong>No</strong></label>
            </div>
          </div>
          <div
               className="options different-color-font pale-border">
            <div className="radio-button-field grey-border w-radio"
                 onClick={() => this.props.saveAndContinue({water_heater_under_air_handler: true})}>
              <div className="div-hover"></div>
              <input type="radio" id="yes" name="water-heater-under-air-handler"
                     value="yes" data-name="water-heater-under-air-handler"
                     className="radio-button w-radio-input"/>
              <label htmlFor="yes"
                     className="w-form-label"><strong>Yes</strong></label>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default WaterHeaterUnderAirHandler;