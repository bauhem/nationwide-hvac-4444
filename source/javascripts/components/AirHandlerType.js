import React from "react";


class AirHandlerType extends React.Component {
  constructor(props) {
    super(props);
  }

  saveAndContinue(val) {
    // Get values via this.refs

    var data = {
      tonnage: val
    }

    this.props.saveValues(data);
  }


  render() {
    return (
      <div>AirHandlerType</div>
    )
  }
}

export default AirHandlerType;