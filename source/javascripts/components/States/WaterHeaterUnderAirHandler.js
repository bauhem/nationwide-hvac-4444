import React from "react";
import {SlideWithOptions} from "../HOC/SlideWithOptions";
import SlideHeader from "../Layout/SlideHeader";
import OptionsGroup from "../Layout/OptionsGroup";
import Option from "../Layout/Option";


class WaterHeaterUnderAirHandler extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <SlideHeader title={"Is the water heater under the air handler?"}/>

        <OptionsGroup value={this.props.value} onChange={this.props.onChange}>
          <Option key={'no'} value={'no'} title={'No'} />
          <Option key={'yes'} value={'yes'} title={'Yes'} />
        </OptionsGroup>
      </>
    )
  }
}

export default SlideWithOptions(WaterHeaterUnderAirHandler);
