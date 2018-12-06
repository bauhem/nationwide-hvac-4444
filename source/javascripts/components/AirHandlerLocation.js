import React from "react";


class AirHandlerLocation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="div-heading-slide">
          <h3 className="titre-big">Where is the air handler located?</h3>
        </div>
        <div className="div-flex-h">
          <div
               className="options different-color-font pale-border">
            <div className="radio-button-field grey-border w-radio"
                 onClick={() => this.props.saveAndContinue({air_handler_location: 'closet'}, {type: 'LOAD_WATER_HEATER'})}>
              <div className="div-hover"></div>
              <img src="/images/door.png" alt=""/><input type="radio"
                                                         id="straight-cool"
                                                         name="system"
                                                         value="straight-cool"
                                                         data-name="system"
                                                         className="radio-button w-radio-input"/>
              <label htmlFor="straight-cool-2"
                     className="radio-button-label-top-margin w-form-label">
                <strong>Closet</strong>
              </label>
            </div>
          </div>
          <div
               className="options different-color-font pale-border">
            <div className="radio-button-field grey-border w-radio"
                 onClick={() => this.props.saveAndContinue({air_handler_location: 'garage'}, {type: 'LOAD_AIR_HANDLER_TYPE'})}>
              <div className="div-hover"></div>
              <img src="/images/garage.png" alt=""/><input type="radio"
                                                           id="water-sourced"
                                                           name="system"
                                                           value="water-sourced"
                                                           data-name="system"
                                                           className="radio-button w-radio-input"/>
              <label htmlFor="water-sourced-2"
                     className="radio-button-label-top-margin w-form-label">
                <strong>Garage</strong>
              </label>
            </div>
          </div>
          <div
               className="options different-color-font pale-border">
            <div className="radio-button-field grey-border w-radio"
                 onClick={() => this.props.saveAndContinue({air_handler_location: 'attic'})}>
              <div className="div-hover"></div>
              <img src="/images/roof.png" alt=""/><input type="radio"
                                                         id="heat-pump"
                                                         name="system"
                                                         value="heat-pump"
                                                         data-name="system"
                                                         className="radio-button w-radio-input"/>
              <label htmlFor="heat-pump-2"
                     className="radio-button-label-top-margin w-form-label">
                <strong>Attic</strong>
              </label>
            </div>
          </div>
          <div
               className="options different-color-font pale-border">
            <div className="radio-button-field grey-border w-radio"
                 onClick={() => this.props.saveAndContinue({air_handler_location: 'other'}, {type: 'LOAD_AIR_HANDLER_TYPE'})}>
              <div className="div-hover"></div>
              <input type="radio" id="not-sure" name="system" value="not-sure"
                     data-name="system" className="radio-button w-radio-input"/>
              <label htmlFor="not-sure-2" className="w-form-label">
                <strong>Other</strong>
              </label>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default AirHandlerLocation;