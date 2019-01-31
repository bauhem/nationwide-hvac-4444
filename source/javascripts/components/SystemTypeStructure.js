import React from "react";
import config from "react-global-configuration";

class SystemTypeStructure extends React.Component {
  constructor(props) {
    super(props);

  }

  systemType(title, description, type) {
    return (
        <div className="options different-color-font pale-border top">
          <div className="radio-button-field grey-border w-radio"
               onClick={() => this.props.saveAndContinue({system_type_structure: type, system_types: config.get(type)})}>
            <div className="div-hover"></div>
            <input type="radio" name="type"
                   value={type} data-name="type"
                   className="radio-button w-radio-input"/>
            <label htmlFor={type} className="form-label w-form-label">
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
          <h3 className="titre-big">Split or Packaged System?</h3>
        </div>

        <div className="div-flex-h">
          {this.systemType('Split System', "Split systems are made up of an inside unit (Air Handler) which is typically found inside the home in a closet, attic, garage, or sometimes drop ceiling. The outside unit (Condenser) will be on the ground in the back or side of your home, on the roof, or sometimes on a raised stand.", 'split_system')}
          {this.systemType('Packaged System', "Packaged Systems have both the condensing and air handling unit insideone system. The unit will usually be attached to the side of your home, on the roof, or sometimes on a raised stand.", 'packaged_system')}
          {this.systemType('Water Sourced System', "Water Sourced Systems are typically used in high-rise buildingsand are a type of packaged system (but don’t worry, we’ve separated these systems for your browsing convenience!). These systems will typically be found in your closet, or in a mechanical closet outside your condominium or apartment.", 'water_system')}
        </div>
      </>
    )
  }
}

export default SystemTypeStructure;
