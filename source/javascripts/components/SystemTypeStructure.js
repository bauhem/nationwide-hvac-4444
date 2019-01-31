import React from "react";
import config from "react-global-configuration";

class SystemTypeStructure extends React.Component {
  constructor(props) {
    super(props);

  }

  systemType(title, description, type) {
    return (
        <div className="options different-color-font pale-border">
          <div className="radio-button-field grey-border w-radio"
               onClick={() => this.props.saveAndContinue({system_type_structure: type, system_types: config.get(type)})}>
            <div className="div-hover"></div>
            <input type="radio" name="type"
                   value={type} data-name="type"
                   className="radio-button w-radio-input"/>
            <label htmlFor={type} className="w-form-label">
              <strong>{title}</strong>
            </label>
            <p className="smaller-explanation">{description}</p>
          </div>
        </div>
    )
  }

  render() {
    return (
      <>
        <div className="div-heading-slide">
          <h3 className="titre-big">Split, packaged or water sourced system?</h3>
        </div>

        <div className="div-flex-h">
          {this.systemType('Split System', "A split system air conditioner consists of two main parts:the outdoor unit (Condenser) and the indoor unit (Air Handler)", 'split_system')}
          {this.systemType('Packaged System', "A Packaged Air Conditioner is a type of self-contained air conditioning system with just one unit outside and no air handler inside", 'packaged_system')}
          {this.systemType('Water Sourced System', "Mostly used in high rise buildings, a water source heat pump operates much like a traditional air source heat pump except that it extracts and dissipates heat by way of water instead of air.", 'water_system')}
        </div>
      </>
    )
  }
}

export default SystemTypeStructure;
