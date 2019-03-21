import React from "react";
import {SlideWithOptions} from "../HOC/SlideWithOptions";
import SlideHeader from "../Layout/SlideHeader";
import OptionsGroup from "../Layout/OptionsGroup";
import Option from "../Layout/Option";


class RoofAccess extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <SlideHeader title={"How do you access the roof?"}/>

        <OptionsGroup value={this.props.value} onChange={this.props.onChange}>
          <Option key={'stair'} value={"stair"} title={"Stair access"} image={'/images/stairs.png'}/>
          <Option key={'crane'} value={"crane"} title={"Crane required"} image={'/images/crane-icon.png'}/>
        </OptionsGroup>
      </>
    )
  }
}

export default SlideWithOptions(RoofAccess);
