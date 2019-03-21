import React from "react";
import SlideHeader from "../Layout/SlideHeader";
import OptionsGroup from "../Layout/OptionsGroup";
import Option from "../Layout/Option";
import {SlideWithOptions} from "../HOC/SlideWithOptions";


class CondenserUnitLocation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <SlideHeader title={"Condenser Unit location"} description={"Is the Condenser Unit Located on the ground or on the roof of the building?"} />

        <OptionsGroup value={this.props.value} onChange={this.props.onChange}>
          <Option key={'roof'} value={"roof"} title={"Roof"} image={'/images/roof.png'} />
          <Option key={'ground'} value={"ground"} title={"Ground"} image={'/images/ground.png'} />
        </OptionsGroup>
      </>
    );
  }
}

export default SlideWithOptions(CondenserUnitLocation);
