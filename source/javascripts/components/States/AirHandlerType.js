import React from "react";
import SlideHeader from "../Layout/SlideHeader";
import OptionsGroup from "../Layout/OptionsGroup";
import {SlideWithOptions} from "../HOC/SlideWithOptions";
import Option from "../Layout/Option";


class AirHandlerType extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <SlideHeader title={"Please select the air handler type"}/>

        <OptionsGroup value={this.props.value} onChange={this.props.onChange}>
          <Option key={'horizontal'} value={"horizontal"} title={"Horizontal"} />
          <Option key={'vertical'} value={"vertical"} title={"Vertical"} />
        </OptionsGroup>
      </>
    )
  }
}

export default SlideWithOptions(AirHandlerType);
