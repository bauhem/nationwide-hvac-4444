import React from "react";
import SystemType from "./SystemType";


class SystemTypes extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const system_types = this.props.fieldValues.system_type_structure.map((type) => {
      return <SystemType {...type} saveValues={this.props.saveValues} />
    });

    return (
      <>
        <div className="div-heading-slide">
          <h3 className="titre-big">System Type</h3>
        </div>
        <p className="smaller-explanation">What kind of system do you want?</p>
        <div className="div-flex-h">
          { system_types }
        </div>
      </>
    )
  }
}

export default SystemTypes;