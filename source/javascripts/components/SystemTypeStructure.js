import React from "react";
import config from "react-global-configuration";

class SystemTypeStructure extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div
          className="div-heading-slide absolute w-hidden-medium w-hidden-small w-hidden-tiny">
          <h3 className="titre-big bigger">Split or packaged system?</h3>
        </div>
        <div className="div-flex-h full-height">
          <div className="div-forfaits">
            <div><img src="/images/split-system.png" alt=""/>
              <div className="div-heading-slide">
                <h3 className="titre-big">Split System</h3>
              </div>
              <p>A split system air conditioner consists of two main parts: the
                outdoor unit (Condenser) and the indoor unit (Air Handler)</p>
            </div>
            <div className="radio-button-field w-radio" onClick={() => this.props.saveValues({system_type_structure: config.get('split_system')})}>
              <div data-ix="appear-next" className="div-hover"></div>
              <input type="radio" id="split-system" name="type"
                     value="split-system" data-name="type"
                     className="radio-button w-radio-input"/>
              <label htmlFor="split-system" className="w-form-label">
                <strong>I currently have a Split System</strong>
              </label>
            </div>
          </div>
          <div className="div-forfaits no-margin-right">
            <div><img src="images/packaged-system.png" alt=""/>
              <div className="div-heading-slide">
                <h3 className="titre-big">Packaged System</h3>
              </div>
              <p>A Packaged Air Conditioner is a type of self-contained air
                conditioning system with just one unit outside and no air
                handler inside</p>
            </div>
            <div className="radio-button-field w-radio" onClick={() => this.props.saveValues({system_type_structure: config.get('packaged_system')})}>
              <div data-ix="appear-next" className="div-hover"></div>
              <input type="radio" id="packaged-system" name="type"
                     value="packaged-system" data-name="type"
                     className="radio-button w-radio-input"/>
              <label htmlFor="packaged-system" className="w-form-label">
                <strong>I currently have a Packaged System</strong>
              </label>
            </div>
          </div>
          <div className="div-forfaits no-margin-left">
            <div><img src="images/water-source-system.png" alt=""/>
              <div className="div-heading-slide">
                <h3 className="titre-big">Water Sourced System</h3>
              </div>
              <p>A water sourced system is a </p>
            </div>
            <div className="radio-button-field w-radio" onClick={() => this.props.saveValues({system_type_structure: config.get('water_system')})}>
              <div data-ix="appear-next" className="div-hover"></div>
              <input type="radio" id="water-sourced-system" name="type"
                     value="water-sourced-system" data-name="type"
                     className="radio-button w-radio-input"/>
              <label htmlFor="water-sourced-system" className="w-form-label">
                <strong>I currently have a Water Sourced System</strong>
              </label>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default SystemTypeStructure;