import React from "react";
import SlideHeader from "../Layout/SlideHeader";
import OptionsGroup from "../Layout/OptionsGroup";
import Option from "../Layout/Option";
import {SlideWithOptions} from "../HOC/SlideWithOptions";


class AirHandlerLocation extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <>
        <SlideHeader title={"Where is the air handler located?"}/>

        <OptionsGroup value={this.props.value} onChange={this.props.onChange}>
          <Option key={'closet'} value={"closet"} title={"Closet"} image={'/images/door.png'} />
          <Option key={'garage'} value={"garage"} title={"Garage"} image={'/images/garage.png'} />
          <Option key={'attic'} value={'attic'} title={'Attic'} image={'/images/roof.png'} />
          <Option key={'other'} value={"other"} title={"Other"} />
        </OptionsGroup>
      </>
    )
  }
}

export default SlideWithOptions(AirHandlerLocation);
