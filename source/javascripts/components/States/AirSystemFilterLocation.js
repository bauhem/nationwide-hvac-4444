import React from "react";
import {SlideWithOptions} from "../HOC/SlideWithOptions";
import SlideHeader from "../Layout/SlideHeader";
import OptionsGroup from "../Layout/OptionsGroup";
import Option from "../Layout/Option";


class AirSystemFilterLocation extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <SlideHeader title={"Which side of the system is the air filter located?"}/>

        <OptionsGroup value={this.props.value} onChange={this.props.onChange}>
          <Option key={'left'} value={"left"} title={"Left"}/>
          <Option key={'right'} value={"right"} title={"Right"}/>
        </OptionsGroup>
      </>
    )
  }
}

export default SlideWithOptions(AirSystemFilterLocation);
