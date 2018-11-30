import React from "react";

class SystemType extends React.Component {
  render() {
    return (
      <div data-ix="appear-next"
           className="options different-color-font pale-border">
        <div className="radio-button-field grey-border w-radio"
             onClick={() => this.props.saveValues({system_type: this.props.type})}>
          <div data-ix="appear-next" className="div-hover"></div>
          <input type="radio" name="system"
                 value={this.props.type} data-name="system"
                 className="radio-button w-radio-input"/>
          <label htmlFor={this.props.type} className="w-form-label">
            <strong>{this.props.name}</strong>
          </label>
          <p className="smaller-explanation">{this.props.description}</p>
        </div>
      </div>
    )
  }
}

export default SystemType;