import React from "react";

class SystemType extends React.Component {
  render() {
    return (
      <div
           className="options different-color-font pale-border top"
           onClick={() => this.props.saveAndContinue({system_type: this.props.type})}>
        <div className="radio-button-field grey-border w-radio">
          <div className="div-hover"></div>
          <input type="radio" name="system"
                 value={this.props.type} data-name="system"
                 className="radio-button w-radio-input"/>
          <label htmlFor={this.props.type} className="form-label w-form-label">
            <strong>{this.props.name}</strong>
          </label>
          <p className="smaller-explanation">{this.props.description}</p>
        </div>
      </div>
    )
  }
}

export default SystemType;
