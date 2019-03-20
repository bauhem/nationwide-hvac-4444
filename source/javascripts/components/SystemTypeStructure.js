import React from "react";
import SlideOption from "./SlideOption";

class SystemTypeStructure extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <>
        <div className="div-heading-slide">
          <h3 className="titre-big">Split, Packaged or Water System?</h3>
        </div>

        <div className="div-flex-h">
          <SlideOption type={'split_system'} title={'Split System'} description={"Split systems are made up of an inside unit (Air Handler) which is typically found inside the home in a closet, attic, garage, or sometimes drop ceiling. The outside unit (Condenser) will be on the ground in the back or side of your home, on the roof, or sometimes on a raised stand."}/>
          <SlideOption type={'packaged_system'} title={'Packaged System'} description={"Packaged Systems have both the condensing and air handling unit inside one system. The unit will usually be attached to the side of your home, on the roof, or sometimes on a raised stand."}/>
          <SlideOption type={'water_system'} title={'Water Sourced System'} description={"Water Sourced Systems are typically used in high-rise buildings and are a type of packaged system (but don’t worry, we’ve separated these systems for your browsing convenience!). These systems will typically be found in your closet, or in a mechanical closet outside your condominium or apartment."}/>
        </div>
      </>
    )
  }
}

export default SystemTypeStructure;
