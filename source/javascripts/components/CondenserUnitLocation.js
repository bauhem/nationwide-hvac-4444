import React from "react";


class CondenserUnitLocation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="div-heading-slide">
          <h3 className="titre-big">Condenser Unit location</h3>
        </div>
        <p className="smaller-explanation">Is the Condenser Unit Located on the
          ground or on the roof of the building?</p>
        <div className="div-flex-h">
          <div data-ix="appear-next"
               className="options different-color-font pale-border">
            <div className="radio-button-field grey-border w-radio"
                 onClick={() => this.props.saveAndContinue({condenser_unit_location: 'roof'}, {type: 'LOAD_ROOF_ACCESS'})}>
              <div data-ix="appear-next" className="div-hover"></div>
              <img src="/images/roof.png" alt=""/>
              <input type="radio"
                     id="roof"
                     name="condenser-unit-location"
                     value="roof"
                     data-name="condenser-unit-location"
                     className="radio-button w-radio-input"/>
              <label htmlFor="roof"
                     className="radio-button-label-top-margin w-form-label">
                <strong>Roof</strong>
              </label>
            </div>
          </div>
          <div data-ix="appear-next"
               className="options different-color-font pale-border">
            <div className="radio-button-field grey-border w-radio"
                 onClick={() => this.props.saveAndContinue({condenser_unit_location: 'ground'})}>
              <div data-ix="appear-next" className="div-hover"></div>
              <img src="/images/ground.png" alt=""/>
              <input type="radio"
                     id="ground"
                     name="condenser-unit-location"
                     value="ground"
                     data-name="condenser-unit-location"
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

export default CondenserUnitLocation;