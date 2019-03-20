import React from "react";
import Option from "./Layout/Option";
import SlideHeader from "./Layout/SlideHeader";
import OptionsGroup from "./Layout/OptionsGroup";
import {Slide} from "./HOC/Slide";

class SystemTypeStructure extends React.Component {
  constructor(props) {
    super(props);
  }

  // TODO - Add HOC here to handle the saveAndContinue
  render() {
    return (
      <>
        <SlideHeader title={"Split, Packaged or Water System?"}/>

        <OptionsGroup value={this.props.value} onChange={this.props.onChange}>
          <Option key='split-system' value={'split_system'} title={'Split System'} description={"Split systems are made up of an inside unit (Air Handler) which is typically found inside the home in a closet, attic, garage, or sometimes drop ceiling. The outside unit (Condenser) will be on the ground in the back or side of your home, on the roof, or sometimes on a raised stand."}/>
          <Option key='packaged-system' value={'packaged_system'} title={'Packaged System'} description={"Packaged Systems have both the condensing and air handling unit inside one system. The unit will usually be attached to the side of your home, on the roof, or sometimes on a raised stand."}/>
          <Option key='water-system' value={'water_system'} title={'Water Sourced System'} description={"Water Sourced Systems are typically used in high-rise buildings and are a type of packaged system (but don’t worry, we’ve separated these systems for your browsing convenience!). These systems will typically be found in your closet, or in a mechanical closet outside your condominium or apartment."}/>
        </OptionsGroup>
      </>
    )
  }
}

export default Slide(SystemTypeStructure);
