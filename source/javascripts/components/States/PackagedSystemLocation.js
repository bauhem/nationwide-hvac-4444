import React from "react";
import {SlideWithOptions} from "../HOC/SlideWithOptions";
import SlideHeader from "../Layout/SlideHeader";
import OptionsGroup from "../Layout/OptionsGroup";
import QuoteCtx from "../QuoteCtx";
import Option from "../Layout/Option";

class PackagedSystemLocation extends React.Component {
  render() {
    return (
      <>
        <SlideHeader title={"Package System Location"}
                     description={"Where is the Packaged System located?"}/>

        <OptionsGroup value={this.props.value} onChange={this.props.onChange}>
          <Option key={'side-of-home'} value={"side_of_home"} title={"Ground"}
                  description={"Is your condensing unit somewhere on the side or the rear of your home sitting on the ground or on a concrete pad?"}
                  image={"/images/side-of-home.png"}
          />
          <Option key={'ground'} value={"ground"} title={"Gable Stand"}
                  description={"Some homes will have their condensing units on a raised-stand on the side of their home, elevated way above the ground."}
                  image={"/images/stand.png"}
          />
          <Option key={'roof'} value={"roof"} title={"Roof"}
                  description={"Your condensing unit could be sitting on top of the roof of your home, apartment, or condominium?"}
                  image={"/images/roof-2.png"}
          />
        </OptionsGroup>
      </>
    );
  }

}

PackagedSystemLocation.contextType = QuoteCtx;
export default SlideWithOptions(PackagedSystemLocation);
