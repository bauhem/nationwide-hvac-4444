import React from "react";


class SystemType extends React.Component {
  constructor(props) {
    super(props);

    // Load proper system type based on this.props.fieldValues.system_type_structure
    this.state = {
      system_types: this.loadSystemTypes(this.props.fieldValues.system_type_structure)
    }
  }

  loadSystemTypes(structure) {

  }

  saveAndContinue(val) {
    // Get values via this.refs

    var data = {
      system_type: val
    }

    this.props.saveValues(data);
  }

  render() {
    // Generate list of options from system types
    return <div>{this.props.fieldValues.system_type_structure}</div>
  }
}

export default SystemType;