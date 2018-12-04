import React from "react";


class AirSystemFilterLocation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="div-heading-slide">
          <h3 className="titre-big">Which side of the system is the air filter located?</h3>
        </div>
        <div className="div-flex-h">
          <div data-ix="appear-next"
               className="options different-color-font pale-border">
            <div className="radio-button-field grey-border w-radio"
                 onClick={() => this.props.saveAndContinue({air_filter_side: 'left'})}>
              <div data-ix="appear-next" className="div-hover"></div>
              <input type="radio" id="left" name="air-filter-side"
                     value="left" data-name="air-filter-side"
                     className="radio-button w-radio-input"/>
              <label htmlFor="left"
                     className="w-form-label"><strong>Left</strong></label>
            </div>
          </div>
          <div data-ix="appear-next"
               className="options different-color-font pale-border">
            <div className="radio-button-field grey-border w-radio"
                 onClick={() => this.props.saveAndContinue({air_filter_side: 'right'})}>
              <div data-ix="appear-next" className="div-hover"></div>
              <input type="radio" id="right" name="air-filter-side"
                     value="right" data-name="air-filter-side"
                     className="radio-button w-radio-input"/>
              <label htmlFor="right"
                     className="w-form-label"><strong>Right</strong></label>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default AirSystemFilterLocation;